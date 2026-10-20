import React from 'react';

export default function Logo({ size = 36, className = '', showGlow = true }) {
  const uniqueId = React.useId().replace(/:/g, '');

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 100 100"
      width={size}
      height={size}
      className={`brand-logo-svg ${className}`}
      style={{ display: 'inline-block', verticalAlign: 'middle', flexShrink: 0 }}
      role="img"
      aria-label="Dhrubo Logo"
    >
      <defs>
        {/* Background Gradient */}
        <linearGradient id={`bgGrad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#0f172a" />
          <stop offset="100%" stopColor="#020617" />
        </linearGradient>

        {/* Outer Border Glow Gradient */}
        <linearGradient id={`borderGrad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.85" />
          <stop offset="50%" stopColor="#06b6d4" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#3b82f6" stopOpacity="0.25" />
        </linearGradient>

        {/* Core D Monogram Gradient */}
        <linearGradient id={`dGrad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#34d399" />
          <stop offset="45%" stopColor="#10b981" />
          <stop offset="85%" stopColor="#06b6d4" />
          <stop offset="100%" stopColor="#3b82f6" />
        </linearGradient>

        {/* Terminal Prompt Gradient */}
        <linearGradient id={`promptGrad-${uniqueId}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#6ee7b7" />
          <stop offset="100%" stopColor="#38bdf8" />
        </linearGradient>

        {/* Glow Filter */}
        {showGlow && (
          <filter id={`softGlow-${uniqueId}`} x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="3.2" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>
        )}

        {/* Center Radial Glow */}
        <radialGradient id={`centerGlow-${uniqueId}`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
          <stop offset="65%" stopColor="#06b6d4" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#0f172a" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Squircle Base Canvas */}
      <rect width="100" height="100" rx="26" fill={`url(#bgGrad-${uniqueId})`} />
      <rect width="100" height="100" rx="26" fill={`url(#centerGlow-${uniqueId})`} />
      <rect
        x="1.5"
        y="1.5"
        width="97"
        height="97"
        rx="24.5"
        fill="none"
        stroke={`url(#borderGrad-${uniqueId})`}
        strokeWidth="2.5"
      />

      {/* Quantum Orbital Ring (Computational Modeling & Chemistry) */}
      <ellipse
        cx="53"
        cy="50"
        rx="26"
        ry="11"
        fill="none"
        stroke="#06b6d4"
        strokeOpacity="0.4"
        strokeWidth="1.8"
        strokeDasharray="4 3"
        transform="rotate(-28 53 50)"
      />
      <circle cx="73" cy="38" r="2.4" fill="#38bdf8" />

      {/* Monogram D Letterform */}
      <path
        d="M 31 23 L 31 77"
        stroke={`url(#dGrad-${uniqueId})`}
        strokeWidth="9.5"
        strokeLinecap="round"
        filter={showGlow ? `url(#softGlow-${uniqueId})` : undefined}
      />
      <path
        d="M 31 24.5 L 53 24.5 C 68.5 24.5 78.5 35 78.5 50 C 78.5 65 68.5 75.5 53 75.5 L 31 75.5"
        fill="none"
        stroke={`url(#dGrad-${uniqueId})`}
        strokeWidth="9.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        filter={showGlow ? `url(#softGlow-${uniqueId})` : undefined}
      />

      {/* Terminal Code Prompt '> _' inside the D loop */}
      <path
        d="M 43 43 L 50.5 50 L 43 57"
        fill="none"
        stroke={`url(#promptGrad-${uniqueId})`}
        strokeWidth="3.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <line
        x1="55"
        y1="57"
        x2="63"
        y2="57"
        stroke="#38bdf8"
        strokeWidth="3.8"
        strokeLinecap="round"
      />
    </svg>
  );
}
