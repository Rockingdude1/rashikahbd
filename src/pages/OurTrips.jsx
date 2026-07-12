import { useRef, useState } from "react";
import PageShell from "../components/PageShell";
import StickerLabel from "../components/StickerLabel";
import { trips } from "../data/content";

export default function OurTrips({ onNext }) {
  const scrollerRef = useRef(null);
  const [activeIdx, setActiveIdx] = useState(0);

  const handleScroll = () => {
    const el = scrollerRef.current;
    if (!el) return;
    const idx = Math.round(el.scrollLeft / el.clientWidth);
    setActiveIdx(idx);
  };

  const scrollTo = (i) => {
    const el = scrollerRef.current;
    if (!el) return;
    el.scrollTo({ left: i * el.clientWidth, behavior: "smooth" });
  };

  return (
    <PageShell eyebrow="five roads, one friendship" title="Our Trips">
      <div
        ref={scrollerRef}
        onScroll={handleScroll}
        className="scrollbar-none -mx-6 flex snap-x snap-mandatory overflow-x-auto sm:-mx-10"
      >
        {trips.map((trip) => (
          <article
            key={trip.id}
            className="w-full shrink-0 snap-center px-6 sm:px-10"
          >
            <div className="mb-3 flex items-center justify-between">
              <StickerLabel rotate={-2}>{trip.name}</StickerLabel>
              <span className="font-hand text-lg text-ink/60">{trip.year}</span>
            </div>

            <div className="overflow-hidden rounded-2xl border-2 border-maroon/20 bg-paper-deep shadow-[0_14px_28px_-12px_rgba(58,38,32,0.5)]">
              <div className="aspect-video w-full bg-black/80">
                <video
                  src={trip.video}
                  className="h-full w-full object-cover"
                  controls
                  playsInline
                  preload="metadata"
                />
              </div>
            </div>

            <p className="mt-3 text-center font-display italic text-ink/80">
              {trip.tagline}
            </p>
            <p className="mt-1 text-center font-body text-sm text-ink/60">
              {trip.note}
            </p>

            <div className="mt-4 grid grid-cols-3 gap-2">
              {trip.photos.map((src, i) => (
                <div
                  key={src + i}
                  className="aspect-square overflow-hidden rounded-lg border border-maroon/15"
                  style={{ transform: `rotate(${i === 1 ? 0 : i === 0 ? -3 : 3}deg)` }}
                >
                  <img src={src} alt="" loading="lazy" className="h-full w-full object-cover" />
                </div>
              ))}
            </div>
          </article>
        ))}
      </div>

      <div className="mt-6 flex justify-center gap-2">
        {trips.map((t, i) => (
          <button
            key={t.id}
            type="button"
            aria-label={`Go to ${t.name}`}
            onClick={() => scrollTo(i)}
            className={`h-2 rounded-full transition-all duration-300 ${
              i === activeIdx ? "w-6 bg-maroon" : "w-2 bg-maroon/25"
            }`}
          />
        ))}
      </div>

      <div className="mt-8 flex justify-center">
        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-maroon px-6 py-2.5 font-display text-sm font-semibold text-paper shadow-md"
        >
          Next: our traditions →
        </button>
      </div>
    </PageShell>
  );
}
