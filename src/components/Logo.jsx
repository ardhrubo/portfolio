import React from 'react';

/**
 * Authentic Typographic Monogram Logo for Dhrubo.
 * Clean, human-crafted design: bold letter 'D' on a translucent light-forest-green crystal glass badge.
 */
export default function Logo({ size = 40, className = '' }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center rounded-2xl bg-[#22c55e]/85 backdrop-blur-md shadow-[0_6px_18px_-4px_rgba(34,197,94,0.35),inset_0_1px_0_0_rgba(255,255,255,0.45)] border border-white/30 select-none shrink-0 ${className}`}
      aria-label="Dhrubo Logo"
    >
      {/* Crisp White Typographic D */}
      <span
        className="font-heading font-black text-white leading-none tracking-tighter"
        style={{ fontSize: Math.round(size * 0.56), transform: 'translateY(-0.5px)' }}
      >
        D
      </span>

      {/* Online indicator dot */}
      <span
        className="absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-background bg-emerald-400"
        style={{ width: Math.max(8, Math.round(size * 0.22)), height: Math.max(8, Math.round(size * 0.22)) }}
        title="Online"
      />
    </div>
  );
}
