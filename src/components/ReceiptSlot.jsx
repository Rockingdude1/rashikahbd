import { motion } from "framer-motion";

export default function ReceiptSlot() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.15, duration: 0.5 }}
      className="relative z-30 mx-auto w-[208px]"
    >
      <p className="mb-1.5 text-center font-display text-[11px] font-semibold uppercase tracking-[0.18em] text-maroon/70">
        get your memories here
      </p>
      <div className="rounded-2xl border-2 border-maroon/70 bg-white px-4 py-3 shadow-[0_6px_0_-1px_rgba(122,35,32,0.2)]">
        <div className="mx-auto h-2.5 w-24 rounded-full bg-maroon/80 shadow-[inset_0_1.5px_2px_rgba(0,0,0,0.5)]" />
      </div>
    </motion.div>
  );
}
