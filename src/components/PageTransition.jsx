import { AnimatePresence, motion } from "framer-motion";

// The outgoing page zooms out and fades away; the incoming page starts
// zoomed out, zooms past its resting size, then settles back to scale 1.
const variants = {
  enter: { opacity: 0, scale: 0.5 },
  center: {
    opacity: 1,
    scale: [0.5, 1.18, 1],
    transition: {
      scale: { duration: 1.6, times: [0, 0.6, 1], ease: [0.22, 1, 0.36, 1] },
      opacity: { duration: 0.5, ease: "easeOut" },
    },
  },
  exit: {
    opacity: 0,
    scale: 0.5,
    transition: {
      scale: { duration: 0.9, ease: [0.4, 0, 1, 1] },
      opacity: { duration: 0.5, ease: "easeIn" },
    },
  },
};

export default function PageTransition({ pageKey, children }) {
  return (
    <div className="relative h-full w-full overflow-hidden">
      <AnimatePresence initial={false} mode="wait">
        <motion.div
          key={pageKey}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          className="absolute inset-0"
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
