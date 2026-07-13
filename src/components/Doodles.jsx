const stroke = "#7a2320";

export function CatDoodle({ className = "" }) {
  return (
    <svg
      viewBox="0 0 40 32"
      className={className}
      fill="none"
      stroke={stroke}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M8 14 L11 5 L15 12" />
      <path d="M32 14 L29 5 L25 12" />
      <ellipse cx="20" cy="18" rx="13" ry="10" />
      <circle cx="15" cy="17" r="0.8" fill={stroke} />
      <circle cx="25" cy="17" r="0.8" fill={stroke} />
      <path d="M17 21 Q20 23 23 21" />
      <path d="M2 19 L9 19" />
      <path d="M2 23 L9 22" />
      <path d="M31 19 L38 19" />
      <path d="M31 22 L38 23" />
    </svg>
  );
}

export function BunnyDoodle({ className = "" }) {
  return (
    <svg
      viewBox="0 0 32 40"
      className={className}
      fill="none"
      stroke={stroke}
      strokeWidth="1.4"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M11 16 C8 10 8 2 11 1 C13 0.5 14 8 14.5 15" />
      <path d="M21 16 C24 10 24 2 21 1 C19 0.5 18 8 17.5 15" />
      <ellipse cx="16" cy="26" rx="11" ry="12" />
      <circle cx="12" cy="24" r="0.8" fill={stroke} />
      <circle cx="20" cy="24" r="0.8" fill={stroke} />
      <path d="M13.5 28 Q16 30.5 18.5 28" />
    </svg>
  );
}

export function ScribbleHeart({ className = "" }) {
  return (
    <svg
      viewBox="0 0 30 26"
      className={className}
      fill="none"
      stroke={stroke}
      strokeWidth="1.4"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M15 24 C2 15 2 4 10 3 C13 2.5 15 6 15 8 C15 6 17 2.5 20 3 C28 4 28 15 15 24 Z" />
    </svg>
  );
}
