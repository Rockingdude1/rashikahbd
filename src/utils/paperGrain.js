// Fine fibrous paper-grain texture built from layered tileable value noise
// (coarse mottling + medium + fine specks) — no crack lines, just soft grain
// like watercolor/cardstock paper.
function hash2(ix, iy, seed) {
  const s = Math.sin(ix * 127.1 + iy * 311.7 + seed * 74.7) * 43758.5453;
  return s - Math.floor(s);
}

function fade(t) {
  return t * t * t * (t * (t * 6 - 15) + 10);
}

function valueNoise(x, y, cell, gridSize, seed) {
  const gx = x / cell;
  const gy = y / cell;
  const ix = Math.floor(gx);
  const iy = Math.floor(gy);
  const fx = fade(gx - ix);
  const fy = fade(gy - iy);

  const wrap = (v) => ((v % gridSize) + gridSize) % gridSize;
  const n00 = hash2(wrap(ix), wrap(iy), seed);
  const n10 = hash2(wrap(ix + 1), wrap(iy), seed);
  const n01 = hash2(wrap(ix), wrap(iy + 1), seed);
  const n11 = hash2(wrap(ix + 1), wrap(iy + 1), seed);

  const nx0 = n00 + (n10 - n00) * fx;
  const nx1 = n01 + (n11 - n01) * fx;
  return nx0 + (nx1 - nx0) * fy; // 0..1
}

export function generatePaperGrainDataUrl({
  tile = 192,
  base = [236, 231, 220],
  octaves = [
    { cell: 48, amp: 4, seed: 1 },
    { cell: 12, amp: 4, seed: 2 },
    { cell: 4, amp: 6, seed: 3 },
  ],
} = {}) {
  if (typeof document === "undefined") return { url: "", tile: 0 };

  const canvas = document.createElement("canvas");
  canvas.width = tile;
  canvas.height = tile;
  const ctx = canvas.getContext("2d");
  const img = ctx.createImageData(tile, tile);

  for (let y = 0; y < tile; y++) {
    for (let x = 0; x < tile; x++) {
      let delta = 0;
      for (const { cell, amp, seed } of octaves) {
        const n = valueNoise(x, y, cell, tile / cell, seed) * 2 - 1; // -1..1
        delta += n * amp;
      }

      const idx = (y * tile + x) * 4;
      img.data[idx] = Math.max(0, Math.min(255, base[0] + delta));
      img.data[idx + 1] = Math.max(0, Math.min(255, base[1] + delta));
      img.data[idx + 2] = Math.max(0, Math.min(255, base[2] + delta));
      img.data[idx + 3] = 255;
    }
  }
  ctx.putImageData(img, 0, 0);
  return { url: canvas.toDataURL("image/png"), tile };
}
