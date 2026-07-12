import { AnimatePresence, motion } from "framer-motion";

const variants = {
  enter: (direction) => ({
    opacity: 0,
    scale: 0.78,
    rotateY: direction > 0 ? 42 : -42,
    filter: "blur(3px)",
  }),
  center: {
    opacity: 1,
    scale: 1,
    rotateY: 0,
    filter: "blur(0px)",
  },
  exit: (direction) => ({
    opacity: 0,
    scale: 0.78,
    rotateY: direction > 0 ? -42 : 42,
    filter: "blur(3px)",
  }),
};

export default function PageTransition({ pageKey, direction, children }) {
  return (
    <div
      className="relative h-full w-full"
      style={{ perspective: 1400, perspectiveOrigin: "50% 40%" }}
    >
      <AnimatePresence custom={direction} mode="popLayout" initial={false}>
        <motion.div
          key={pageKey}
          custom={direction}
          variants={variants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0"
          style={{ transformStyle: "preserve-3d" }}
        >
          {children}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
