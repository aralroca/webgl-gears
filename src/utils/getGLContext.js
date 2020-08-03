export default function getGLContext(canvas, bgColor) {
  const gl = canvas.getContext("webgl2");
  const defaultBgColor = [1, 1, 1, 1];

  gl.clearColor(...(bgColor || defaultBgColor));
  gl.clear(gl.DEPTH_BUFFER_BIT | gl.COLOR_BUFFER_BIT);

  return gl;
}
