export default `#version 300 es
precision mediump float;
in vec2 position;

void main () {
  gl_Position = vec4(position, 0.0, 1.0);
  gl_PointSize = 1.0;
}
`