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
      {/* Pocket-watch case: crown and bow on top, outer case, inner bezel
          with quarter-hour ticks. */}
      <circle cx={50} cy={5} r={3} stroke="url(#emblem-gradient)" strokeWidth={2} />
      <path d="M46 10 L54 10 M50 8 L50 12" stroke="url(#emblem-gradient)" strokeLinecap="round" />
      <circle cx={50} cy={52} r={40} stroke="url(#emblem-gradient)" />
      <circle cx={50} cy={52} r={33} stroke="url(#emblem-gradient)" strokeWidth={1.25} opacity={0.5} />
      <path
        d="M50 19 L50 23 M83 52 L79 52 M50 85 L50 81 M17 52 L21 52"
        stroke="url(#emblem-gradient)"
        strokeWidth={1.5}
        strokeLinecap="round"
        opacity={0.7}
      />
      {/* Outer group recenters the hourglass on the watch face; the inner
          group's CSS rotation would override a transform set on it. */}
      <g transform="translate(0 2)">
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
      </g>
    </svg>
  );
}
