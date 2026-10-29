import React from 'react';

/**
 * Authentic Typographic Monogram Logo for Dhrubo.
 * White monogram on a green glass tile shared by both themes.
 */
export default function Logo({ size = 40, className = '' }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
      }}
      className={`brand-glass-logo relative flex items-center justify-center backdrop-blur-md select-none shrink-0 ${className}`}
      aria-label="Dhrubo Logo"
    >
      {/* High-contrast white monogram */}
      <span
        className="brand-glass-letter font-heading font-black leading-none tracking-tighter"
        style={{ fontSize: Math.round(size * 0.56), transform: 'translateY(-0.5px)' }}
      >
        D
      </span>

      {/* Online indicator dot */}
      <span
        className="absolute -bottom-0.5 -right-0.5 rounded-full border-2 border-background bg-primary"
        style={{ width: Math.max(8, Math.round(size * 0.22)), height: Math.max(8, Math.round(size * 0.22)) }}
        title="Online"
      />
    </div>
  );
}
