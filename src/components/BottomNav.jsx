const ICONS = ["🎀", "💌", "🧳", "🎗️", "🔮"];

export default function BottomNav({ pages, activeIndex, onSelect }) {
  return (
    <nav className="pointer-events-auto absolute inset-x-0 bottom-0 z-20 flex justify-center pb-[max(14px,env(safe-area-inset-bottom))]">
      <ul className="flex items-center gap-1.5 rounded-full border border-white/10 bg-maroon-deep/90 px-2.5 py-2 shadow-[0_10px_30px_-8px_rgba(0,0,0,0.6)] backdrop-blur">
        {pages.map((page, i) => {
          const active = i === activeIndex;
          return (
            <li key={page.id}>
              <button
                type="button"
                onClick={() => onSelect(i)}
                aria-label={page.label}
                aria-current={active}
                className={`flex h-11 w-11 items-center justify-center rounded-full text-lg transition-all duration-300 ${
                  active
                    ? "scale-110 bg-rose text-paper shadow-[0_0_0_3px_rgba(230,179,171,0.35)]"
                    : "text-paper/60 hover:text-paper/90"
                }`}
              >
                <span aria-hidden="true">{ICONS[i]}</span>
              </button>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
