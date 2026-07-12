import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "../components/PageShell";
import { traditions } from "../data/content";

const POINTS = [
  { top: 6, left: 22, icon: "🎁" },
  { top: 25, left: 76 },
  { top: 46, left: 22 },
  { top: 67, left: 76 },
  { top: 88, left: 22 },
];
const ICONS = ["🎁", "🎨", "🎤", "🎓", "🕺"];

const PATH_D =
  "M22,6 C55,10 60,20 76,25 C95,29 45,41 22,46 C-2,51 55,62 76,67 C95,71 45,83 22,88";

export default function OurTraditions({ onNext }) {
  const [openId, setOpenId] = useState(null);
  const active = traditions.find((t) => t.id === openId) ?? null;

  return (
    <PageShell eyebrow="the things we never skip" title="Our Traditions">
      <p className="mx-auto mb-4 max-w-xs text-center font-body text-sm text-ink/70">
        Tap a checkpoint on the road for its highlight.
      </p>

      <div className="relative mx-auto h-[480px] w-full max-w-xs sm:h-[520px]">
        <svg
          viewBox="0 0 100 100"
          preserveAspectRatio="none"
          className="absolute inset-0 h-full w-full"
          aria-hidden="true"
        >
          <path
            d={PATH_D}
            fill="none"
            stroke="#c67b74"
            strokeWidth="1.4"
            strokeLinecap="round"
            strokeDasharray="0.5 4"
            opacity="0.8"
          />
        </svg>

        {traditions.map((tradition, i) => {
          const point = POINTS[i];
          return (
            <div
              key={tradition.id}
              className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              style={{ top: `${point.top}%`, left: `${point.left}%` }}
            >
              <motion.button
                type="button"
                onClick={() => setOpenId(tradition.id)}
                whileTap={{ scale: 0.9 }}
                whileHover={{ scale: 1.08 }}
                className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-maroon bg-blush text-2xl shadow-[0_8px_16px_-6px_rgba(58,38,32,0.5)] sm:h-16 sm:w-16"
              >
                <span aria-hidden="true">{ICONS[i]}</span>
              </motion.button>
              <span className="whitespace-nowrap rounded-full bg-maroon/90 px-2.5 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide text-paper">
                {tradition.name}
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-6 flex justify-center">
        <button
          type="button"
          onClick={onNext}
          className="rounded-full bg-maroon px-6 py-2.5 font-display text-sm font-semibold text-paper shadow-md"
        >
          Next: who do you think →
        </button>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key="tradition-overlay"
            className="fixed inset-0 z-40 flex items-center justify-center bg-maroon-deep/80 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenId(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.85, y: 20 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm bg-paper p-4 pb-5 shadow-2xl"
            >
              <p className="mb-3 text-center font-script text-3xl text-maroon">
                {active.name}
              </p>
              <p className="mb-4 text-center font-hand text-lg text-ink/80">
                {active.highlight}
              </p>
              <div
                className={`grid gap-2 ${
                  active.media.length > 1 ? "grid-cols-2" : "grid-cols-1"
                }`}
              >
                {active.media.map((m, i) => (
                  <div
                    key={i}
                    className="aspect-[4/5] overflow-hidden rounded-lg bg-paper-deep"
                  >
                    {m.type === "video" ? (
                      <video
                        src={m.src}
                        className="h-full w-full object-cover"
                        autoPlay
                        muted
                        loop
                        playsInline
                      />
                    ) : (
                      <img src={m.src} alt="" className="h-full w-full object-cover" />
                    )}
                  </div>
                ))}
              </div>
              <button
                type="button"
                onClick={() => setOpenId(null)}
                className="mx-auto mt-4 block rounded-full border border-maroon/40 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-maroon"
              >
                close →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
