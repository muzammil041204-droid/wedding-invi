type MonogramProps = React.SVGProps<SVGSVGElement> & {
  size?: number;
  letters?: string;
};

export function Monogram({ className = "", size = 88, letters = "S M", ...rest }: MonogramProps) {
  const [a, b] = letters.split(" ");
  return (
    <svg
      className={className}
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="none"
      role="img"
      aria-label={`Monogram ${a} ${b}`}
      {...rest}
    >
      <circle cx="50" cy="50" r="47" stroke="currentColor" strokeWidth="0.6" opacity="0.45" />
      <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="0.4" opacity="0.25" />
      <text
        x="34"
        y="60"
        fontFamily="var(--font-serif)"
        fontSize="30"
        fill="currentColor"
        textAnchor="middle"
      >
        {a}
      </text>
      <line x1="50" y1="30" x2="50" y2="70" stroke="currentColor" strokeWidth="0.5" opacity="0.5" />
      <text
        x="66"
        y="60"
        fontFamily="var(--font-serif)"
        fontSize="30"
        fill="currentColor"
        textAnchor="middle"
      >
        {b}
      </text>
    </svg>
  );
}

export function WaxSealMonogram({
  className = "",
  size = 120,
}: {
  className?: string;
  size?: number;
}) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center rounded-full shadow-2xl transition-transform duration-500 hover:scale-105 ${className}`}
    >
      {/* Outer organic wax seal border */}
      <svg
        width={size}
        height={size}
        viewBox="0 0 120 120"
        fill="none"
        className="absolute inset-0 drop-shadow-xl"
      >
        <defs>
          <linearGradient id="waxGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#d4af37" />
            <stop offset="35%" stopColor="#b8860b" />
            <stop offset="70%" stopColor="#8b6508" />
            <stop offset="100%" stopColor="#5c4000" />
          </linearGradient>
          <radialGradient id="waxHighlight" cx="35%" cy="30%" r="65%">
            <stop offset="0%" stopColor="#ffe680" stopOpacity="0.6" />
            <stop offset="40%" stopColor="#d4af37" stopOpacity="0.2" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.4" />
          </radialGradient>
        </defs>
        {/* Wax stamp seal body */}
        <circle cx="60" cy="60" r="56" fill="url(#waxGrad)" />
        <circle cx="60" cy="60" r="56" fill="url(#waxHighlight)" />
        {/* Embossed inner gold rings */}
        <circle cx="60" cy="60" r="48" stroke="#ffe082" strokeWidth="1.2" opacity="0.75" />
        <circle cx="60" cy="60" r="45" stroke="#7a5200" strokeWidth="1.5" opacity="0.6" />
        <circle cx="60" cy="60" r="44" stroke="#ffe680" strokeWidth="0.8" opacity="0.8" />
      </svg>

      {/* S & M monogram text */}
      <div className="relative z-10 flex items-center justify-center text-center font-serif font-medium tracking-wider text-[#fff5cc] drop-shadow-[0_2px_3px_rgba(0,0,0,0.7)] select-none">
        <span className="text-3xl sm:text-4xl">S</span>
        <span className="mx-1 font-serif text-xl sm:text-2xl text-[#ffe680] italic">&amp;</span>
        <span className="text-3xl sm:text-4xl">M</span>
      </div>
    </div>
  );
}

export function Divider({ className = "" }: { className?: string }) {
  return (
    <div
      className={`flex items-center justify-center gap-4 text-champagne ${className}`}
      aria-hidden="true"
    >
      <span className="h-px w-16 bg-gradient-to-r from-transparent to-hairline sm:w-24" />
      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
        <path d="M5 0L6 4L10 5L6 6L5 10L4 6L0 5L4 4L5 0Z" fill="currentColor" opacity="0.7" />
      </svg>
      <span className="h-px w-16 bg-gradient-to-l from-transparent to-hairline sm:w-24" />
    </div>
  );
}