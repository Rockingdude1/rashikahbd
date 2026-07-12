import Tape from "./Tape";

export default function PageShell({ children, title, eyebrow, className = "" }) {
  return (
    <div
      className={`paper-texture relative flex h-full w-full flex-col overflow-hidden rounded-[22px] bg-paper shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] ${className}`}
    >
      <Tape className="-top-2 left-6" rotate={-8} tone="rose" />
      <Tape className="-top-2 right-6" rotate={6} tone="gold" />

      <div className="scrollbar-none flex-1 overflow-y-auto px-6 pb-28 pt-8 sm:px-10">
        {(eyebrow || title) && (
          <header className="mb-6 text-center">
            {eyebrow && (
              <p className="mb-1 font-hand text-xl text-rose">{eyebrow}</p>
            )}
            {title && (
              <h1 className="font-display text-3xl font-semibold text-maroon sm:text-4xl">
                {title}
              </h1>
            )}
          </header>
        )}
        {children}
      </div>
    </div>
  );
}
