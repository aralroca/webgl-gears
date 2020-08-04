export default function linkGPUAndCPU(
  gl,
  {
    program,
    gpuVariable,
    channel = gl.ARRAY_BUFFER,
    buffer,
    dims = 2,
    dataType = gl.FLOAT,
    normalize = gl.FALSE,
    stride = 0,
    offset = 0,
  },
) {
  const position = gl.getAttribLocation(program, gpuVariable);
  gl.enableVertexAttribArray(position);
  gl.bindBuffer(channel, buffer);
  gl.vertexAttribPointer(position, dims, dataType, normalize, stride, offset);
}
