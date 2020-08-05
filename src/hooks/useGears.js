import { useRef, useEffect } from 'preact/hooks';

// Utils
import createAndBindBuffer from '../utils/createAndBindBuffer';
import getCircleCoords from '../utils/getCircleCoords';
import getGLContext from '../utils/getGLContext';
import getGearTeeth from '../utils/getGearTeeth';
import getProgram from '../utils/getProgram';
import getShader from '../utils/getShader';
import linkGPUAndCPU from '../utils/linkGPUAndCPU';
import rotation from '../utils/rotation';
import translation from '../utils/translation';

// Shaders
import vertexShader from './shader-vert';
import fragmentShader from './shader-frag';

const firstGear = [
  {
    center: [-0.3, -0.3],
    radius: 0.45,
    fillColor: [0.878, 0.878, 0.878],
    teeth: 20,
  },
  {
    center: [-0.3, -0.3],
    radius: 0.4,
    strokeColor: [0.682, 0.682, 0.682],
  },
  {
    center: [-0.3, -0.3],
    radius: 0.07,
    fillColor: [0.741, 0.741, 0.741],
    strokeColor: [0.682, 0.682, 0.682],
  },
  {
    center: [-0.53, -0.3],
    radius: 0.12,
    fillColor: [1, 1, 1],
    strokeColor: [0.682, 0.682, 0.682],
  },
  {
    center: [-0.3, -0.53],
    radius: 0.12,
    fillColor: [1, 1, 1],
    strokeColor: [0.682, 0.682, 0.682],
  },
  {
    center: [-0.07, -0.3],
    radius: 0.12,
    fillColor: [1, 1, 1],
    strokeColor: [0.682, 0.682, 0.682],
  },
  {
    center: [-0.3, -0.07],
    radius: 0.12,
    fillColor: [1, 1, 1],
    strokeColor: [0.682, 0.682, 0.682],
  },
];

const secondGear = [
  {
    center: [0.23, 0.31],
    radius: 0.3,
    fillColor: [0.741, 0.741, 0.741],
    teeth: 12,
  },
  {
    center: [0.23, 0.31],
    radius: 0.25,
    strokeColor: [0.682, 0.682, 0.682],
  },
  {
    center: [0.23, 0.31],
    radius: 0.1,
    fillColor: [0.682, 0.682, 0.682],
    strokeColor: [0.6, 0.6, 0.6],
  },
];

export default function useGears() {
  const canvasRef = useRef();
  const webglVars = useRef({ angleGear1: 0, angleGear2: 0 });

  // Initialize Canvas
  useEffect(initializeCanvas, []);
  function initializeCanvas() {
    let interval;
    const gl = getGLContext(canvasRef.current);
    const vs = getShader(gl, vertexShader, gl.VERTEX_SHADER);
    const fs = getShader(gl, fragmentShader, gl.FRAGMENT_SHADER);
    const program = getProgram(gl, vs, fs);
    const rotationLocation = gl.getUniformLocation(program, 'u_rotation');
    const translationLocation = gl.getUniformLocation(program, 'u_translation');
    const moveOriginLocation = gl.getUniformLocation(program, 'u_moveOrigin');

    webglVars.current = {
      ...webglVars.current,
      gl,
      program,
      rotationLocation,
      translationLocation,
      moveOriginLocation,
    };
    drawGears();
    interval = setInterval(rotateGears, 60);

    return () => clearInterval(interval);
  }

  function renderCircle({ center, radius, fillColor, strokeColor, teeth }) {
    const { gl } = webglVars.current;
    const { TRIANGLE_STRIP, POINTS, TRIANGLES } = gl;
    const coords = getCircleCoords(gl, center[0], center[1], radius);

    if (fillColor) drawShape(coords, fillColor, TRIANGLE_STRIP);
    if (strokeColor) drawShape(coords, strokeColor, POINTS);
    if (teeth) {
      drawShape(getGearTeeth(gl, center, radius, teeth), fillColor, TRIANGLES);
    }
  }

  // Draw all shapes
  function drawGears() {
    const {
      gl,
      angleGear1,
      angleGear2,
      moveOriginLocation,
      rotationLocation,
      translationLocation,
    } = webglVars.current;

    // First gear
    gl.uniformMatrix3fv(translationLocation, false, translation(-0.3, -0.3));
    gl.uniformMatrix3fv(rotationLocation, false, rotation(angleGear1));
    gl.uniformMatrix3fv(moveOriginLocation, false, translation(0.3, 0.3));
    firstGear.forEach(renderCircle);

    // Second gear
    gl.uniformMatrix3fv(translationLocation, false, translation(0.23, 0.31));
    gl.uniformMatrix3fv(rotationLocation, false, rotation(angleGear2));
    gl.uniformMatrix3fv(moveOriginLocation, false, translation(-0.23, -0.31));
    secondGear.forEach(renderCircle);
  }

  // Draw an individual shape
  function drawShape(coords, color, drawingMode) {
    const { gl, program } = webglVars.current;
    const data = new Float32Array(coords);
    const buffer = createAndBindBuffer(
      gl,
      gl.ARRAY_BUFFER,
      gl.STATIC_DRAW,
      data,
    );

    gl.useProgram(program);
    linkGPUAndCPU(gl, { program, buffer, gpuVariable: 'position' });

    const inputColor = gl.getUniformLocation(program, 'inputColor');
    gl.uniform3fv(inputColor, color);
    gl.drawArrays(drawingMode, 0, coords.length / 2);
  }

  function rotateGears() {
    const { angleGear1, angleGear2 } = webglVars.current;
    webglVars.current.angleGear1 = (angleGear1 + 0.1) % 360;
    webglVars.current.angleGear2 = (angleGear2 - 0.1) % 360;
    drawGears();
  }

  return canvasRef;
}
