import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import PageShell from "../components/PageShell";
import { firsts } from "../data/content";

const ROTATIONS = [-7, 5, -4, 8, -9, 6];

export default function OurFirsts() {
  const [remaining, setRemaining] = useState(firsts);
  const [active, setActive] = useState(null);

  const openTop = () => {
    if (!remaining.length) return;
    setActive(remaining[0]);
  };

  const closeActive = () => {
    setRemaining((r) => r.slice(1));
    setActive(null);
  };

  const allOpened = remaining.length === 0;

  return (
    <PageShell eyebrow="a little bundle of" title="Our Firsts">
      <p className="mx-auto mb-8 max-w-xs font-body text-sm text-ink/70">
        Every stack has a top envelope. Tap it to open, tap again to tuck it
        away and reveal the next.
      </p>

      <div className="relative mx-auto flex h-80 w-56 items-center justify-center sm:h-96 sm:w-64">
        <AnimatePresence>
          {allOpened && (
            <motion.div
              key="done"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center gap-4 text-center"
            >
              <span className="text-4xl">💐</span>
              <p className="font-display text-lg font-semibold text-maroon">
                That's all our firsts... for now.
              </p>
            </motion.div>
          )}

          {!allOpened &&
            remaining
              .slice(0, 4)
              .map((item, i) => {
                const isTop = i === 0;
                return (
                  <motion.button
                    type="button"
                    key={item.id}
                    layout
                    onClick={isTop ? openTop : undefined}
                    initial={false}
                    animate={{
                      rotate: ROTATIONS[i % ROTATIONS.length],
                      y: i * 6,
                      scale: 1 - i * 0.035,
                    }}
                    exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.2 } }}
                    transition={{ type: "spring", stiffness: 300, damping: 26 }}
                    whileHover={isTop ? { y: i * 6 - 6 } : undefined}
                    whileTap={isTop ? { scale: 0.96 } : undefined}
                    style={{ zIndex: 10 - i }}
                    className={`absolute flex h-72 w-52 flex-col items-center justify-between border-2 border-maroon/30 bg-blush px-4 py-6 shadow-[0_14px_24px_-10px_rgba(58,38,32,0.5)] sm:h-80 sm:w-56 ${
                      isTop ? "cursor-pointer" : "pointer-events-none"
                    }`}
                  >
                    <span className="self-end rounded-full border border-maroon/50 px-2 py-0.5 font-hand text-sm text-maroon">
                      {item.stamp}
                    </span>
                    <span className="font-script text-2xl text-maroon">
                      {item.label}
                    </span>
                    <span className="font-hand text-sm text-ink/60">
                      {isTop ? "tap to open" : ""}
                    </span>
                  </motion.button>
                );
              })}
        </AnimatePresence>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-40 flex items-center justify-center bg-maroon-deep/80 px-6 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={closeActive}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xs bg-paper p-3 pb-5 shadow-2xl"
            >
              <div
                className="max-h-[70vh] w-full overflow-hidden bg-paper-deep"
                style={{ aspectRatio: active.media.aspect ?? 4 / 5 }}
              >
                {active.media.type === "video" ? (
                  <video
                    src={active.media.src}
                    className="h-full w-full object-cover"
                    autoPlay
                    loop
                    playsInline
                  />
                ) : (
                  <img
                    src={active.media.src}
                    alt=""
                    className="h-full w-full object-cover"
                  />
                )}
              </div>
              <p className="mt-3 text-center font-hand text-lg text-ink/80">
                {active.caption}
              </p>
              <button
                type="button"
                onClick={closeActive}
                className="mx-auto mt-3 block rounded-full border border-maroon/40 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-maroon"
              >
                tuck away →
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </PageShell>
  );
}
