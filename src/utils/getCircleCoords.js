export default function getCircleCoords(gl, centerX, centerY, radiusX) {
  const positions = [];
  const radiusY = (radiusX / gl.canvas.height) * gl.canvas.width;

  for (let i = 0; i <= 360; i += 1) {
    positions.push(
      centerX,
      centerY,
      centerX + radiusX * Math.cos(2 * Math.PI * (i / 360)),
      centerY + radiusY * Math.sin(2 * Math.PI * (i / 360)),
    )
  }

  return positions
}
