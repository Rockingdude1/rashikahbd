// Builds a scalloped "postage stamp" mask as an SVG data URI for a fixed
// pixel size. Used as a CSS mask-image so photo cards read like stamps.
export function scallopMask(width, height, radius = 9) {
  const bumpsX = Math.round(width / (radius * 2));
  const bumpsY = Math.round(height / (radius * 2));
  const stepX = width / bumpsX;
  const stepY = height / bumpsY;

  let d = `M0,0 `;
  for (let i = 0; i < bumpsX; i++) d += `a ${stepX / 2},${radius} 0 0 1 ${stepX},0 `;
  for (let i = 0; i < bumpsY; i++) d += `a ${radius},${stepY / 2} 0 0 1 0,${stepY} `;
  for (let i = 0; i < bumpsX; i++) d += `a ${stepX / 2},${radius} 0 0 1 ${-stepX},0 `;
  for (let i = 0; i < bumpsY; i++) d += `a ${radius},${stepY / 2} 0 0 1 0,${-stepY} `;
  d += "Z";

  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='${width}' height='${height}' viewBox='0 0 ${width} ${height}'><path d="${d}" fill="white"/></svg>`;
  return `url("data:image/svg+xml,${encodeURIComponent(svg)}")`;
}
