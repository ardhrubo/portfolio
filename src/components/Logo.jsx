import React from 'react';

/**
 * Authentic Typographic Monogram Logo for Dhrubo.
 * Clean, human-crafted design: bold letter 'D' on a solid/gradient royal cobalt background.
 * No AI-generated decorative mesh or complex polygons.
 */
export default function Logo({ size = 40, className = '' }) {
  return (
    <div
      style={{ width: size, height: size }}
      className={`relative flex items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 shadow-md shadow-blue-500/20 border border-blue-400/30 select-none shrink-0 ${className}`}
      aria-label="Dhrubo Logo"
    >
      {/* Crisp White Typographic D */}
      <span
        className="font-heading font-black text-white leading-none tracking-tighter"
        style={{ fontSize: Math.round(size * 0.58), transform: 'translateY(-0.5px)' }}
      >
        D
      </span>

      {/* Online indicator dot */}
      <span
        className="absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-background bg-orange-500 shadow-xs"
        style={{ width: Math.max(8, Math.round(size * 0.22)), height: Math.max(8, Math.round(size * 0.22)) }}
        title="Online"
      />
    </div>
  );
}
