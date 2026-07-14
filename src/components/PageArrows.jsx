import heroArrow from "../assets/media/hero_arrow.svg";

function ArrowButton({ direction, onClick, disabled }) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous page" : "Next page"}
      className={`group flex h-14 w-14 items-center justify-center transition-opacity duration-300 ${
        disabled ? "opacity-30" : "hover:opacity-80"
      }`}
    >
      <img
        src={heroArrow}
        alt=""
        className={`h-9 w-auto transition-transform duration-300 ${
          direction === "prev" ? "rotate-180" : ""
        } ${disabled ? "" : "group-hover:translate-x-1"}`}
      />
    </button>
  );
}

export default function PageArrows({ onPrev, onNext, disablePrev, disableNext }) {
  return (
    <div className="pointer-events-auto absolute inset-x-0 bottom-0 z-20 flex justify-center gap-4 pb-[max(14px,env(safe-area-inset-bottom))]">
      <ArrowButton direction="prev" onClick={onPrev} disabled={disablePrev} />
      <ArrowButton direction="next" onClick={onNext} disabled={disableNext} />
    </div>
  );
}
