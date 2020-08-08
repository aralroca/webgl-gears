export default function getCoords(gl, center, radiusX, teeth = 0) {
  const toothSize = teeth ? 0.05 : 0;
  const step = teeth ? 360 / (teeth * 3) : 1;
  const [centerX, centerY] = center;
  const positions = [];
  const radiusY = (radiusX / gl.canvas.height) * gl.canvas.width;

  for (let i = 0; i <= 360; i += step) {
    positions.push(
      centerX,
      centerY,
      centerX + (radiusX + toothSize) * Math.cos(2 * Math.PI * (i / 360)),
      centerY + (radiusY + toothSize) * Math.sin(2 * Math.PI * (i / 360)),
    );
  }

  return positions;
}
