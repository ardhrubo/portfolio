import React from 'react';

/**
 * Premium Geometric Monogram Logo for Dhrubo (A. R. Dhrubo)
 * High-precision vector architecture:
 * - Dynamic dual-theme support using CSS variables (--bg-card, --accent-primary, etc.)
 * - Seamlessly transitions from crisp porcelain in light mode to deep obsidian in dark mode
 * - Scalable from 24px up to 128px with razor-sharp geometric alignment
 */
export default function Logo({ size = 36, className = '', showGlow = true }) {
  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`brand-logo-svg select-none ${className}`}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      role="img"
      aria-label="Dhrubo — Full-Stack & Computational Researcher Logo"
    >
      <defs>
        {/* Signature Emerald Gradient */}
        <linearGradient id={`emeraldGrad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="50%" stopColor="#10b981" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>

        {/* Electric Cyan Accent Gradient for code chevron */}
        <linearGradient id={`cyanGrad-${uniqueId}`} x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        {/* Ambient Glow */}
        {showGlow && (
          <filter id={`logoGlow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feDropShadow dx="0" dy="2" stdDeviation="3.5" floodColor="#10b981" floodOpacity="0.3" />
          </filter>
        )}
      </defs>

      {/* Outer Squircle Container with Theme-Aware Fill & Border */}
      <rect
        x="2.5"
        y="2.5"
        width="95"
        height="95"
        rx="24"
        style={{
          fill: 'var(--bg-card, #ffffff)',
          stroke: 'var(--border-subtle, rgba(16, 185, 129, 0.2))',
          strokeWidth: '2.5px',
          transition: 'fill 300ms ease, stroke 300ms ease',
        }}
        filter={showGlow ? `url(#logoGlow-${uniqueId})` : undefined}
      />

      {/* Subtle Specular Top Reflection Rim */}
      <path
        d="M 27 5.5 H 73 C 86 5.5 94.5 14 94.5 27"
        fill="none"
        stroke="rgba(255, 255, 255, 0.35)"
        strokeWidth="1.5"
        strokeLinecap="round"
      />

      {/* Precision Geometric Grid Underlay */}
      <path
        d="M 32 20 V 80 M 52 20 V 80 M 20 50 H 80"
        stroke="var(--accent-primary, #10b981)"
        strokeOpacity="0.08"
        strokeWidth="1"
        strokeDasharray="2 3"
      />

      {/* --- MONOGRAM D LETTERFORM --- */}
      {/* Vertical Spine */}
      <line
        x1="32"
        y1="25"
        x2="32"
        y2="75"
        stroke={`url(#emeraldGrad-${uniqueId})`}
        strokeWidth="9"
        strokeLinecap="round"
      />

      {/* Bold Geometric D Arc */}
      <path
        d="M 32 26.5 H 51.5 C 66.5 26.5 76.5 36.5 76.5 50 C 76.5 63.5 66.5 73.5 51.5 73.5 H 32"
        fill="none"
        stroke={`url(#emeraldGrad-${uniqueId})`}
        strokeWidth="9"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Embedded Terminal Code Chevron '>' */}
      <path
        d="M 43 43 L 51 50 L 43 57"
        fill="none"
        stroke={`url(#cyanGrad-${uniqueId})`}
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />

      {/* Quantum Pulse Node (Scientific Computing) */}
      <circle
        cx="59"
        cy="57"
        r="3.2"
        fill="#10b981"
      />
    </svg>
  );
}
