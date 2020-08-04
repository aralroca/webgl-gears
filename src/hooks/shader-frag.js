export default `#version 300 es
precision mediump float;
out vec4 color;
uniform vec3 inputColor;

void main () {
   color = vec4(inputColor, 1.0);
}
`