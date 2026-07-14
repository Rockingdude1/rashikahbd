import { motion } from "framer-motion";

export const STAMP_WIDTH = 184;
export const STAMP_HEIGHT = 226;
const PEEK_OFFSET = -(STAMP_HEIGHT * 0.75);

// Each photo just appends to the end of the list and plays its own
// peek -> settle entrance. The page itself auto-scrolls to follow new
// content (see Home.jsx), so there's no need for siblings to reflow —
// only `transform`/`opacity` animate here, keeping it GPU-composited.
export default function StampPhoto({ src, caption, transition }) {
  return (
    <motion.div
      initial={{ y: PEEK_OFFSET }}
      animate={{ y: 0 }}
      transition={transition}
      className="relative"
      style={{ width: STAMP_WIDTH, willChange: "transform" }}
    >
      <div
        className="rounded-xl bg-white p-1.5"
        style={{ height: STAMP_HEIGHT }}
      >
        <img
          src={src}
          alt=""
          loading="eager"
          decoding="sync"
          className="h-full w-full rounded-lg object-cover"
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
