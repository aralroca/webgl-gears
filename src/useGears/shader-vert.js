export default `#version 300 es
precision mediump float;
in vec2 position;
uniform mat3 u_rotation;
uniform mat3 u_translation;
uniform mat3 u_moveOrigin;

void main () {
  vec2 movedPosition = (u_translation * u_rotation * u_moveOrigin * vec3(position, 1)).xy;
  gl_Position = vec4(movedPosition, 0.0, 1.0);
  gl_PointSize = 1.0;
}
`;
