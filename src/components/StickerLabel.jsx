export default function StickerLabel({ children, rotate = -3, className = "" }) {
  return (
    <span
      className={`inline-block rounded-full border-2 border-maroon/70 bg-blush px-4 py-1 font-display text-sm font-semibold uppercase tracking-wide text-maroon shadow-[0_2px_0_rgba(122,35,32,0.4)] ${className}`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      {children}
    </span>
  );
}
