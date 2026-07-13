import { useState } from "react";

const FIGURE_WIDTH = 180;
const FIGURE_HEIGHT = 224;
// For n evenly-spaced panels in a drum, this radius keeps adjacent edges
// just touching: R = width / (2 * tan(pi / n)).
const RADIUS = FIGURE_WIDTH / 2;

export default function PhotoCarousel3D({ photos }) {
  const [paused, setPaused] = useState(false);
  const angleStep = 360 / photos.length;

  return (
    <div
      className="relative mx-auto"
      style={{ width: FIGURE_WIDTH, height: FIGURE_HEIGHT, perspective: 900 }}
    >
      <div
        role="button"
        tabIndex={0}
        aria-label={paused ? "Resume photo carousel" : "Pause photo carousel"}
        onClick={() => setPaused((p) => !p)}
        onKeyDown={(e) => e.key === "Enter" && setPaused((p) => !p)}
        className="absolute inset-0 cursor-pointer"
        style={{
          transformStyle: "preserve-3d",
          animation: "carousel-spin 18s linear infinite",
          animationPlayState: paused ? "paused" : "running",
        }}
      >
        {photos.map((photo, i) => (
          <figure
            key={photo.year}
            className="absolute left-0 top-0 overflow-hidden border-[3px] border-white bg-white shadow-[0_12px_24px_-10px_rgba(58,38,32,0.55)]"
            style={{
              width: FIGURE_WIDTH,
              height: FIGURE_HEIGHT,
              transform: `rotateY(${i * angleStep}deg) translateZ(${RADIUS}px)`,
              backfaceVisibility: "hidden",
            }}
          >
            <img src={photo.src} alt="" className="h-full w-full object-cover" />
            <span className="absolute bottom-1.5 right-2 rotate-[-3deg] font-hand text-lg text-maroon/90 drop-shadow-[0_1px_1px_rgba(255,255,255,0.85)]">
              {photo.year}
            </span>
          </figure>
        ))}
      </div>
    </div>
  );
}
