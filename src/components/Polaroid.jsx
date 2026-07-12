import { motion } from "framer-motion";

export default function Polaroid({ media, caption, rotate = 0, className = "" }) {
  return (
    <motion.figure
      className={`relative w-full shrink-0 bg-paper p-2.5 pb-4 shadow-[0_10px_20px_-8px_rgba(58,38,32,0.45)] ${className}`}
      style={{ rotate }}
      whileHover={{ rotate: 0, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
    >
      <div className="aspect-[4/5] w-full overflow-hidden bg-paper-deep">
        {media.type === "video" ? (
          <video
            src={media.src}
            className="h-full w-full object-cover"
            muted
            loop
            playsInline
            autoPlay
          />
        ) : (
          <img
            src={media.src}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover"
          />
        )}
      </div>
      {caption && (
        <figcaption className="pt-2 text-center font-hand text-lg leading-tight text-ink/80">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
