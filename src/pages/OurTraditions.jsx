import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "../components/PageShell";
import { traditions } from "../data/content";

const POINTS = [
  { top: 6, left: 22 },
  { top: 25, left: 76 },
  { top: 46, left: 22 },
  { top: 67, left: 76 },
  { top: 88, left: 22 },
];

const PATH_D =
  "M22,6 C55,10 60,20 76,25 C95,29 45,41 22,46 C-2,51 55,62 76,67 C95,71 45,83 22,88";

export default function OurTraditions() {
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
                whileHover={{ scale: 1.15 }}
                aria-label={tradition.name}
                className="h-4 w-4 rounded-full bg-maroon shadow-[0_4px_10px_-2px_rgba(58,38,32,0.6)] sm:h-5 sm:w-5"
              />
              <span className="whitespace-nowrap rounded-full bg-maroon/90 px-2.5 py-0.5 font-display text-[11px] font-semibold uppercase tracking-wide text-paper">
                {tradition.name}
              </span>
            </div>
          );
        })}
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
              className="flex max-h-[80vh] w-full max-w-sm flex-col bg-paper p-4 pb-5 shadow-2xl"
            >
              <p className="mb-3 text-center font-script text-3xl text-maroon">
                {active.name}
              </p>
              <p className="mb-1 max-h-[55vh] overflow-y-auto whitespace-pre-line text-left font-body text-sm leading-relaxed text-ink/80">
                {active.highlight}
              </p>
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
