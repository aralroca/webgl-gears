export default function getGearTeeth(gl, center, radiusX, teeth) {
  const toothSize = 0.05
  const [centerX, centerY] = center
  const positions = [];
  const radiusY = (radiusX / gl.canvas.height) * gl.canvas.width;

  for (let i = 0; i <= 360; i += 360 / (teeth * 3)) {
    positions.push(
      centerX,
      centerY,
      centerX + (radiusX + toothSize) * Math.cos(2 * Math.PI * (i / 360)),
      centerY + (radiusY + toothSize) * Math.sin(2 * Math.PI * (i / 360)),
    )
  }

  return positions
}