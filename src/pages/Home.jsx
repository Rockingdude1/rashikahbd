import { useEffect, useMemo, useRef, useState } from "react";
import { motion, animate } from "framer-motion";
import StampPhoto, { STAMP_WIDTH } from "../components/StampPhoto";
import { CatDoodle, BunnyDoodle, ScribbleHeart } from "../components/Doodles";
import { homePhotos } from "../data/content";
import { generatePaperGrainDataUrl } from "../utils/paperGrain";

const GAP = 14;
const START_DELAY = 300; // ms before the first print begins
const SHIFT_DURATION = 0.7; // seconds — how long each photo's own entrance takes
const PRINT_INTERVAL = SHIFT_DURATION * 1000 + 320; // ms between one print starting and the next
const SHIFT_TRANSITION = { type: "tween", duration: SHIFT_DURATION, ease: [0.45, 0, 0.2, 1] };

export default function Home() {
  const [printed, setPrinted] = useState([]);
  const [settled, setSettled] = useState(false);
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
        setPrinted((prev) => [...prev, photo]);
      }, START_DELAY + i * PRINT_INTERVAL)
    );
    timers.push(
      setTimeout(
        () => setSettled(true),
        START_DELAY + homePhotos.length * PRINT_INTERVAL + 300
      )
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  // The whole page auto-scrolls to follow each new photo as it prints — the
  // slot scrolls out of view just like a real scroll gesture would, rather
  // than staying pinned while content slides underneath it.
  useEffect(() => {
    const el = scrollRef.current;
    if (!el || printed.length === 0) return;
    const target = el.scrollHeight - el.clientHeight;
    const controls = animate(el.scrollTop, target, {
      duration: SHIFT_DURATION,
      ease: [0.45, 0, 0.2, 1],
      onUpdate: (v) => {
        el.scrollTop = v;
      },
    });
    return () => controls.stop();
  }, [printed.length]);

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

        <div
          className="relative z-0 mx-auto mt-2 flex flex-col"
          style={{ width: STAMP_WIDTH, gap: GAP }}
        >
          {printed.map((photo) => (
            <StampPhoto
              key={photo.year}
              src={photo.src}
              caption={photo.year}
              transition={SHIFT_TRANSITION}
            />
          ))}
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: settled ? 1 : 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 mx-auto mb-4 mt-6 max-w-xs rounded-3xl border-2 border-maroon/70 bg-blush px-2.5 py-1.5 font-hand text-base text-maroon/70"
        >
          Even though we're a thousand miles away, we couldn't refrain from
          sending the best gift we could. Here's to making you smile a little
          wider, cry a little harder, and miss us a little more this
          birthday.
        </motion.p>
      </div>
    </div>
  );
}
