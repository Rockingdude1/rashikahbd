export default function Tape({ className = "", rotate = -4, tone = "rose" }) {
  const tones = {
    rose: "bg-rose-soft/70",
    gold: "bg-gold/50",
    blush: "bg-blush/80",
  };

  return (
    <span
      aria-hidden="true"
      className={`pointer-events-none absolute h-6 w-16 ${tones[tone]} shadow-sm backdrop-blur-[1px] ${className}`}
      style={{
        transform: `rotate(${rotate}deg)`,
        clipPath:
          "polygon(3% 0%, 97% 0%, 100% 30%, 98% 100%, 2% 100%, 0% 30%)",
        mixBlendMode: "multiply",
      }}
    />
  );
}
