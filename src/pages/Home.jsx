import { motion } from "framer-motion";
import StickerLabel from "../components/StickerLabel";

const BIRTHDAY = new Date("2026-07-15T00:00:00");

function useDaysLeft() {
  const now = new Date();
  const diff = Math.ceil((BIRTHDAY - now) / (1000 * 60 * 60 * 24));
  return diff;
}

const stickers = ["📼", "🍓", "🎧", "🧸", "💌", "✨"];

export default function Home({ onNext }) {
  const daysLeft = useDaysLeft();

  return (
    <div className="paper-texture relative flex h-full w-full flex-col items-center justify-center overflow-hidden rounded-[22px] bg-paper px-6 text-center shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]">
      <div className="pointer-events-none absolute inset-0">
        {stickers.map((s, i) => (
          <span
            key={s + i}
            className="absolute text-2xl opacity-70 sm:text-3xl"
            style={{
              top: `${[8, 18, 78, 85, 14, 68][i]}%`,
              left: `${[10, 82, 12, 80, 48, 88][i]}%`,
              transform: `rotate(${[-12, 10, 8, -10, -6, 14][i]}deg)`,
            }}
            aria-hidden="true"
          >
            {s}
          </span>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.6 }}
        className="mb-2 font-hand text-2xl text-rose sm:text-3xl"
      >
        a very special scrapbook for
      </motion.p>

      <motion.h1
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        className="font-script text-5xl leading-[1.15] text-maroon drop-shadow-sm sm:text-7xl"
      >
        Happy Birthday
        <br />
        Rashika
      </motion.h1>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.6 }}
        className="mt-5"
      >
        <StickerLabel rotate={-3}>Turning 21 · July 15, 2026</StickerLabel>
      </motion.div>

      {daysLeft > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.75, duration: 0.6 }}
          className="mt-4 font-hand text-xl text-ink/70"
        >
          {daysLeft} {daysLeft === 1 ? "day" : "days"} to go ⋆
        </motion.p>
      )}

      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9, duration: 0.6 }}
        className="mt-8 max-w-xs font-display text-lg italic text-ink/80 sm:text-xl"
      >
        A throwback to 3 years of friendship
      </motion.p>

      <motion.button
        type="button"
        onClick={onNext}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 1.15, duration: 0.6 }}
        whileTap={{ scale: 0.95 }}
        className="mt-10 rounded-full bg-maroon px-7 py-3 font-display text-base font-semibold text-paper shadow-[0_10px_20px_-8px_rgba(122,35,32,0.6)]"
      >
        Open the scrapbook →
      </motion.button>
    </div>
  );
}
