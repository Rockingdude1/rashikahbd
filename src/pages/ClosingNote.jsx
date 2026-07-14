import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PageShell from "../components/PageShell";
import { closingNote } from "../data/content";

// All 3 envelopes sit at the exact same center point (a genuine loose
// pile, not separate grid cells with a small offset) — each only nudged
// by a few px/degrees so they read as messily stacked. Tapping the pile
// spreads them apart into a row via the same `x` transform, matching the
// Codrops polaroid-stack-to-grid trick (transform-only movement, no
// reflow), just horizontal instead of a multi-row grid since there are
// only 3.
const CARD_W = 200;
const CARD_H = 140;
const GRID_GAP = 16;
const FLAP_TIP_Y = CARD_H * 0.48;

const PILE = [
  { x: -40, y: 14, rotate: -14, scale: 0.94 },
  { x: 6, y: -18, rotate: 5, scale: 1 },
  { x: 44, y: 20, rotate: 12, scale: 0.96 },
];

const gridY = (i) => (i - 1) * (CARD_H + GRID_GAP);

const EASE = [0.16, 1, 0.3, 1];

export default function ClosingNote() {
  const [scattered, setScattered] = useState(false);
  const [opened, setOpened] = useState([]);
  const [active, setActive] = useState(null);

  const allOpened = opened.length === closingNote.length;

  return (
    <PageShell eyebrow="before you go" title="One Last Thing">
      <div className="flex h-full flex-col">
        <p className="mx-auto mb-10 max-w-xs font-body text-sm text-ink/70">
          {scattered
            ? "Tap each envelope to read it."
            : "Tap the stack to open it up."}
        </p>

        <div className="flex flex-1 items-center justify-center">
          <div
            onClick={() => !scattered && setScattered(true)}
            className={`relative mx-auto ${scattered ? "" : "cursor-pointer"}`}
            style={{ width: CARD_W + 100, height: CARD_H * 3 + GRID_GAP * 2 }}
          >
            {closingNote.map((note, i) => {
              const isOpened = opened.includes(note.id);
              const pile = PILE[i % PILE.length];
              return (
                <motion.button
                  type="button"
                  key={note.id}
                  initial={false}
                  animate={
                    scattered
                      ? { x: 0, y: gridY(i), rotate: 0, scale: 1 }
                      : { x: pile.x, y: pile.y, rotate: pile.rotate, scale: pile.scale }
                  }
                  transition={{
                    duration: 0.6,
                    ease: EASE,
                    delay: scattered ? i * 0.12 : 0,
                  }}
                  onClick={(e) => {
                    if (!scattered) return;
                    e.stopPropagation();
                    setActive(note);
                    setOpened((prev) =>
                      prev.includes(note.id) ? prev : [...prev, note.id]
                    );
                  }}
                  style={{
                    position: "absolute",
                    left: "50%",
                    top: "50%",
                    marginLeft: -CARD_W / 2,
                    marginTop: -CARD_H / 2,
                    width: CARD_W,
                    height: CARD_H,
                    zIndex: scattered ? 1 : closingNote.length - i,
                  }}
                className={`relative overflow-hidden rounded-[3px] shadow-[0_10px_18px_-10px_rgba(58,38,32,0.6)] ${
                  scattered ? "cursor-pointer" : "pointer-events-none"
                } ${isOpened ? "opacity-50" : ""}`}
              >
                <svg
                  viewBox={`0 0 ${CARD_W} ${CARD_H}`}
                  preserveAspectRatio="none"
                  className="absolute inset-0 h-full w-full"
                >
                  <rect width={CARD_W} height={CARD_H} fill="#7a2320" />
                  <path
                    d={`M0,0 L${CARD_W},0 L${CARD_W / 2},${FLAP_TIP_Y} Z`}
                    fill="#4f1614"
                    opacity="0.6"
                  />
                  <path
                    d={`M0,0 L${CARD_W / 2},${FLAP_TIP_Y} L0,${CARD_H} Z`}
                    fill="#000000"
                    opacity="0.08"
                  />
                  <path
                    d={`M${CARD_W},0 L${CARD_W / 2},${FLAP_TIP_Y} L${CARD_W},${CARD_H} Z`}
                    fill="#000000"
                    opacity="0.08"
                  />
                  <path
                    d={`M0,0 L${CARD_W / 2},${FLAP_TIP_Y} L${CARD_W},0`}
                    fill="none"
                    stroke="#f4ecdc"
                    strokeOpacity="0.3"
                    strokeWidth="1.2"
                  />
                </svg>

                <span className="absolute left-1.5 top-1.5 z-10 rounded-full border border-paper/40 px-1.5 py-0.5 font-hand text-[10px] text-paper/80">
                  {note.stamp}
                </span>

                <span
                  className="absolute left-1/2 z-10 flex h-8 w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-paper text-base shadow-[0_2px_5px_rgba(0,0,0,0.35)]"
                  style={{ top: FLAP_TIP_Y }}
                >
                  💌
                </span>
              </motion.button>
            );
          })}
          </div>
        </div>

        <AnimatePresence>
          {allOpened && (
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="mx-auto mb-2 max-w-xs text-center font-hand text-xl text-maroon/80"
            >
              and that's everything. here's to twenty-one. 🎀
            </motion.p>
          )}
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
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.85, rotate: -3 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              exit={{ opacity: 0, scale: 0.85 }}
              transition={{ type: "spring", stiffness: 260, damping: 22 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-xs bg-paper p-6 shadow-2xl"
            >
              <span className="mx-auto mb-3 block w-fit rounded-full border border-maroon/50 px-2 py-0.5 text-center font-hand text-sm text-maroon">
                {active.stamp}
              </span>
              <p className="text-center font-script text-lg text-maroon">
                {active.label}
              </p>
              <p className="mt-4 text-center font-hand text-xl leading-relaxed text-ink/80">
                {active.message}
              </p>
              <button
                type="button"
                onClick={() => setActive(null)}
                className="mx-auto mt-5 block rounded-full border border-maroon/40 px-4 py-1.5 font-display text-xs font-semibold uppercase tracking-wide text-maroon"
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
