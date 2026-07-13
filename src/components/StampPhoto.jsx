import { motion } from "framer-motion";
import { scallopMask } from "../utils/scallop";

export const STAMP_WIDTH = 208;
export const STAMP_HEIGHT = 256;
const mask = scallopMask(STAMP_WIDTH, STAMP_HEIGHT, 8);
const PEEK_OFFSET = -(STAMP_HEIGHT * 0.75);

// `layout` measures this element's position before/after every render and
// animates the delta as a single transform (FLIP) — that's what keeps every
// photo already in the stack moving in the same synchronized motion as a new
// one enters, all on one shared clock instead of independent timers. The
// photos move; the page itself never actually scrolls.
// Only `transform`/`opacity` are ever animated here (never height/top), so
// the browser can composite the move on the GPU instead of re-laying-out
// every frame.
export default function StampPhoto({ src, caption, transition, zIndex }) {
  return (
    <motion.div
      layout
      initial={{ y: PEEK_OFFSET }}
      animate={{ y: 0 }}
      transition={transition}
      className="relative"
      style={{ width: STAMP_WIDTH, zIndex, willChange: "transform" }}
    >
      <div
        className="bg-white p-2.5"
        style={{
          height: STAMP_HEIGHT,
          WebkitMaskImage: mask,
          maskImage: mask,
          WebkitMaskSize: "100% 100%",
          maskSize: "100% 100%",
        }}
      >
        <img
          src={src}
          alt=""
          loading="eager"
          decoding="sync"
          className="h-full w-full object-cover"
        />
      </div>
      {caption && (
        <span className="absolute bottom-3 right-4 rotate-[-3deg] font-hand text-lg text-maroon/80">
          {caption}
        </span>
      )}
    </motion.div>
  );
}
