export default function createAndBindBuffer(gl, bufferType, typeOfDrawing, data) {
  const buffer = gl.createBuffer();

  gl.bindBuffer(bufferType, buffer);
  gl.bufferData(bufferType, data, typeOfDrawing);
  gl.bindBuffer(bufferType, null);

  return buffer;
}
