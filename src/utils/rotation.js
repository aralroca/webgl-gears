export default function rotation(angleInRadians = 0) {
  const c = Math.cos(angleInRadians);
  const s = Math.sin(angleInRadians);

  return [c, -s, 0, s, c, 0, 0, 0, 1];
}
