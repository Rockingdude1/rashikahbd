import { useMemo } from "react";
import { motion } from "framer-motion";
import StickerLabel from "../components/StickerLabel";
import PhotoCarousel3D from "../components/PhotoCarousel3D";
import { CatDoodle, BunnyDoodle, ScribbleHeart } from "../components/Doodles";
import { homePhotos } from "../data/content";
import { generatePaperGrainDataUrl } from "../utils/paperGrain";

const BIRTHDAY = new Date("2026-07-15T00:00:00");

function useDaysLeft() {
  const now = new Date();
  return Math.ceil((BIRTHDAY - now) / (1000 * 60 * 60 * 24));
}

export default function Home({ onNext }) {
  const daysLeft = useDaysLeft();

  const paperBg = useMemo(() => {
    const { url, tile } = generatePaperGrainDataUrl();
    return {
      backgroundImage: `url("${url}")`,
      backgroundSize: `${tile}px ${tile}px`,
      backgroundRepeat: "repeat",
    };
  }, []);

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[22px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]"
      style={paperBg}
    >
      <div className="scrollbar-none relative h-full overflow-y-auto px-5 pb-10 pt-8 text-center">
        <CatDoodle className="pointer-events-none absolute left-1 top-40 h-8 w-10 opacity-70" />
        <ScribbleHeart className="pointer-events-none absolute right-3 top-52 h-6 w-7 rotate-12 opacity-70" />
        <BunnyDoodle className="pointer-events-none absolute left-2 top-[27rem] h-9 w-8 -rotate-6 opacity-70" />
        <span className="pointer-events-none absolute right-2 top-[22rem] font-hand text-xl text-maroon/60">
          xo
        </span>

        <motion.div
          initial={{ opacity: 0, y: -14, rotate: -3 }}
          animate={{ opacity: 1, y: 0, rotate: -2 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-20 mx-auto mb-6 inline-block"
        >
          <p className="font-hand text-4xl leading-none text-maroon sm:text-5xl">
            Happy 21st Rashika
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.85 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="relative z-10"
        >
          <PhotoCarousel3D photos={homePhotos} />
          <p className="mt-3 font-hand text-base text-maroon/60">
            tap to pause
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          className="relative z-10 mt-5"
        >
          <StickerLabel rotate={-3}>Turning 21 · July 15, 2026</StickerLabel>
        </motion.div>

        {daysLeft > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="relative z-10 mt-3 font-hand text-xl text-maroon/70"
          >
            {daysLeft} {daysLeft === 1 ? "day" : "days"} to go ⋆
          </motion.p>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="relative z-10 mx-auto mt-3 max-w-xs font-display text-lg italic text-ink/80"
        >
          A throwback to 3 years of friendship
        </motion.p>

        <motion.button
          type="button"
          onClick={onNext}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.45 }}
          whileTap={{ scale: 0.95 }}
          className="relative z-10 mb-2 mt-5 rounded-full bg-maroon px-7 py-3 font-display text-base font-semibold text-paper shadow-[0_10px_20px_-8px_rgba(122,35,32,0.6)]"
        >
          Open the scrapbook →
        </motion.button>
      </div>
    </div>
  );
}
