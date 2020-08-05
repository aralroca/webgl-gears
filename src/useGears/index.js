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

// Gears constants data
import { gears, rotationStep } from './constants';

/**
 * This hook is responsible for rasterizing with webGL all the vectors
 * needed to draw on the canvas.
 */
export default function useGears() {
  const canvasRef = useRef();

  // Initialize program with shaders + draw gears
  useEffect(init, []);
  function init() {
    const gl = getGLContext(canvasRef.current);
    const vs = getShader(gl, vertexShader, gl.VERTEX_SHADER);
    const fs = getShader(gl, fragmentShader, gl.FRAGMENT_SHADER);
    const program = getProgram(gl, vs, fs);
    const rotationLocation = gl.getUniformLocation(program, 'u_rotation');
    const translationLocation = gl.getUniformLocation(program, 'u_translation');
    const moveOriginLocation = gl.getUniformLocation(program, 'u_moveOrigin');
    const angles = Array.from({ length: gears.length }).map((v) => 0);

    /**
     * Each piece of the gear has a similar structure: It is a circle,
     * filled with color or only with the border.  So we'll use the same
     * function for each piece.
     *
     * The only slightly different piece is the larger circle of the gear,
     * as we will have to draw the teeth.
     */
    function renderGearPiece({
      center,
      radius,
      fillColor,
      strokeColor,
      numberOfTeeth,
    }) {
      const { TRIANGLE_STRIP, POINTS, TRIANGLES } = gl;
      const coords = getCircleCoords(gl, center[0], center[1], radius);

      if (fillColor) drawShape(coords, fillColor, TRIANGLE_STRIP);
      if (strokeColor) drawShape(coords, strokeColor, POINTS);
      if (numberOfTeeth) {
        drawShape(
          getGearTeeth(gl, center, radius, numberOfTeeth),
          fillColor,
          TRIANGLES,
        );
      }
    }

    /**
     * This function is in charge of drawing all the gears, giving it the
     * rotation on itself that it touches according to the angle calculated
     * in each interval.
     */
    function drawGears() {
      gears.forEach((gear, index) => {
        const [centerX, centerY] = gear.center;

        gl.uniformMatrix3fv(
          translationLocation,
          false,
          translation(centerX, centerY),
        );
        gl.uniformMatrix3fv(rotationLocation, false, rotation(angles[index]));
        gl.uniformMatrix3fv(
          moveOriginLocation,
          false,
          translation(-centerX, -centerY),
        );
        renderGearPiece(gear);
        if (gear.children) gear.children.forEach(renderGearPiece);
      });
    }

    /**
     * Each piece of the gear, whether it is a toothed wheel, a painted
     * circle, or a rimmed circle, has a different shape. So this function
     * takes care of drawing each shape. Either a painted circle, which we
     * will do with triangles, or an unpainted circle that we will do
     * with points.
     */
    function drawShape(coords, color, drawingMode) {
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

    /**
     * This function is in charge of rendering each frame. When it is finished,
     * it calls itself again.
     */
    function run() {
      gears.forEach((gear, index) => {
        const direction = gear.direction === 'clockwise' ? 1 : -1;
        const step = direction * (rotationStep / gear.numberOfTeeth);

        angles[index] = (angles[index] + step) % 360;
      });
      drawGears();

      // Render next frame
      window.requestAnimationFrame(run);
    }

    // Start rendering
    run();
  }

  // As output of the hook we return the reference to the canvas,
  // because it will be mandatory to link it to the HTML canvas.
  return canvasRef;
}
