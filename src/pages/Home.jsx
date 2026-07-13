import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import StickerLabel from "../components/StickerLabel";
import StampPhoto, { STAMP_HEIGHT, STAMP_WIDTH } from "../components/StampPhoto";
import ReceiptSlot from "../components/ReceiptSlot";
import { CatDoodle, BunnyDoodle, ScribbleHeart } from "../components/Doodles";
import { homePhotos } from "../data/content";
import { generatePaperGrainDataUrl } from "../utils/paperGrain";

const BIRTHDAY = new Date("2026-07-15T00:00:00");
const GAP = 14;
const START_DELAY = 300; // ms before the first print begins
const SHIFT_DURATION = 0.7; // seconds — every photo in motion moves at this same speed, in lockstep
const PRINT_INTERVAL = SHIFT_DURATION * 1000 + 260; // ms between one print starting and the next
const STACK_HEIGHT = homePhotos.length * STAMP_HEIGHT + (homePhotos.length - 1) * GAP;
const SHIFT_TRANSITION = { type: "tween", duration: SHIFT_DURATION, ease: [0.45, 0, 0.2, 1] };
const FIT_TRANSITION = { duration: 0.8, ease: [0.22, 1, 0.36, 1] };

function useDaysLeft() {
  const now = new Date();
  return Math.ceil((BIRTHDAY - now) / (1000 * 60 * 60 * 24));
}

export default function Home() {
  const daysLeft = useDaysLeft();
  const [printed, setPrinted] = useState([]);
  const [settled, setSettled] = useState(false);
  const [fit, setFit] = useState({ height: STACK_HEIGHT, scale: 1 });
  const scrollRef = useRef(null);

  const paperBg = useMemo(() => {
    const { url, tile } = generatePaperGrainDataUrl();
    const dotSpacing = 52;
    const dot = `radial-gradient(circle, rgba(122,35,32,0.4) 0 2.5px, transparent 2.5px)`;
    return {
      backgroundImage: `${dot}, ${dot}, url("${url}")`,
      backgroundSize: `${dotSpacing}px ${dotSpacing}px, ${dotSpacing}px ${dotSpacing}px, ${tile}px ${tile}px`,
      backgroundPosition: `0 0, ${dotSpacing / 2}px ${dotSpacing / 2}px, 0 0`,
      backgroundRepeat: "repeat, repeat, repeat",
    };
  }, []);

  useEffect(() => {
    const timers = homePhotos.map((photo, i) =>
      setTimeout(() => {
        setPrinted((prev) => [photo, ...prev]);
      }, START_DELAY + i * PRINT_INTERVAL)
    );
    timers.push(
      setTimeout(
        () => setSettled(true),
        START_DELAY + homePhotos.length * PRINT_INTERVAL + 200
      )
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  useEffect(() => {
    if (!settled || !scrollRef.current) return;
    const el = scrollRef.current;
    const overflow = el.scrollHeight - el.clientHeight;
    if (overflow > 0) {
      const target = Math.max(STACK_HEIGHT - overflow - 16, STACK_HEIGHT * 0.4);
      setFit({ height: target, scale: target / STACK_HEIGHT });
    }
  }, [settled]);

  return (
    <div
      className="relative h-full w-full overflow-hidden rounded-[22px] shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)]"
      style={paperBg}
    >
      <div
        ref={scrollRef}
        className="scrollbar-none relative h-full overflow-y-auto px-5 pb-10 pt-8 text-center"
      >
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

        <ReceiptSlot />

        <motion.div
          className="relative z-0 mx-auto mt-2 overflow-hidden"
          style={{ width: STAMP_WIDTH }}
          animate={{ height: fit.height }}
          transition={FIT_TRANSITION}
        >
          <motion.div
            animate={{ scale: fit.scale }}
            transition={FIT_TRANSITION}
            style={{ transformOrigin: "top center", height: STACK_HEIGHT, overflow: "hidden" }}
          >
            <div className="flex flex-col" style={{ gap: GAP }}>
              {printed.map((photo, idx) => (
                <StampPhoto
                  key={photo.year}
                  src={photo.src}
                  caption={photo.year}
                  transition={SHIFT_TRANSITION}
                  zIndex={printed.length - idx}
                />
              ))}
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: settled ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mt-6"
        >
          <StickerLabel rotate={-3}>Turning 21 · July 15, 2026</StickerLabel>
        </motion.div>

        {daysLeft > 0 && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: settled ? 1 : 0 }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="relative z-10 mt-3 font-hand text-xl text-maroon/70"
          >
            {daysLeft} {daysLeft === 1 ? "day" : "days"} to go ⋆
          </motion.p>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: settled ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="relative z-10 mx-auto mb-4 mt-3 max-w-xs font-display text-lg italic text-ink/80"
        >
          A throwback to 3 years of friendship
        </motion.p>
      </div>
    </div>
  );
}
