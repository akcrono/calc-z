export default function Emblem({
  className = 'mx-auto h-14 w-14 text-[var(--color-accent)]',
}: {
  className?: string;
}) {
  return (
    <svg
      viewBox="0 0 100 100"
      className={className}
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
    >
      <defs>
        <linearGradient id="emblem-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="var(--color-accent-100)" />
          <stop offset="50%" stopColor="var(--color-accent)" />
          <stop offset="100%" stopColor="var(--color-accent-800)" />
        </linearGradient>
      </defs>
      <polygon points="50,4 96,50 50,96 4,50" stroke="url(#emblem-gradient)" strokeLinejoin="round" />
      <polygon points="50,14 86,50 50,86 14,50" stroke="url(#emblem-gradient)" strokeWidth={1.25} opacity={0.5} />
      <g
        className="animate-hourglass"
        style={{ transformBox: 'fill-box', transformOrigin: 'center' }}
        strokeLinejoin="round"
        strokeLinecap="round"
      >
        <path d="M32 28 L68 28" />
        <path d="M32 72 L68 72" />
        <path d="M36 28 L64 28 L50 50 L64 72 L36 72 L50 50 Z" />
        <path
          d="M42 34 L58 34 L50 42 Z"
          className="fill-[var(--color-accent-100)] animate-sand-top"
          stroke="none"
        />
        <path
          d="M42 66 L58 66 L50 58 Z"
          className="fill-[var(--color-accent-100)] animate-sand-bottom"
          stroke="none"
        />
      </g>
    </svg>
  );
}
