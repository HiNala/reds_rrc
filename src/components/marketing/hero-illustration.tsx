/**
 * Original, brand-new generated artwork (no photography/stock assets) —
 * an abstract composition suggesting blueprints + a home roofline in the
 * brand's amber/brick palette. See start/design-kit/asset-generation-brief.md.
 */
export function HeroIllustration({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 560 560"
      className={className}
      role="img"
      aria-label="Abstract illustration of a home roofline over a blueprint grid"
    >
      <defs>
        <linearGradient id="hero-roof" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="var(--primary)" />
          <stop offset="100%" stopColor="var(--accent)" />
        </linearGradient>
        <linearGradient id="hero-card" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--card)" />
          <stop offset="100%" stopColor="var(--secondary)" />
        </linearGradient>
        <pattern id="hero-grid" width="28" height="28" patternUnits="userSpaceOnUse">
          <path d="M28 0H0V28" fill="none" stroke="var(--border)" strokeWidth="1" />
        </pattern>
      </defs>

      <circle cx="280" cy="280" r="260" fill="var(--secondary)" opacity="0.6" />
      <rect x="60" y="60" width="440" height="440" rx="36" fill="url(#hero-grid)" opacity="0.5" />

      {/* base card / foundation */}
      <rect x="110" y="300" width="340" height="180" rx="20" fill="url(#hero-card)" stroke="var(--border)" />

      {/* windows */}
      <rect x="150" y="340" width="70" height="70" rx="10" fill="var(--background)" stroke="var(--primary)" strokeWidth="3" />
      <rect x="345" y="340" width="70" height="70" rx="10" fill="var(--background)" stroke="var(--primary)" strokeWidth="3" />
      {/* door */}
      <rect x="248" y="360" width="64" height="120" rx="8" fill="var(--primary)" opacity="0.15" />
      <rect x="248" y="360" width="64" height="120" rx="8" fill="none" stroke="var(--accent)" strokeWidth="3" />

      {/* roofline */}
      <path d="M90 300 280 150 470 300 430 300 280 190 130 300Z" fill="url(#hero-roof)" />

      {/* chimney */}
      <rect x="370" y="170" width="30" height="70" rx="4" fill="var(--accent)" />

      {/* blueprint dimension lines */}
      <path d="M110 500 450 500" stroke="var(--muted-foreground)" strokeWidth="1.5" strokeDasharray="6 6" opacity="0.5" />
      <circle cx="110" cy="500" r="4" fill="var(--muted-foreground)" opacity="0.6" />
      <circle cx="450" cy="500" r="4" fill="var(--muted-foreground)" opacity="0.6" />

      {/* floating accent dots */}
      <circle cx="470" cy="120" r="10" fill="var(--primary)" opacity="0.8" />
      <circle cx="95" cy="180" r="7" fill="var(--accent)" opacity="0.7" />
    </svg>
  );
}
