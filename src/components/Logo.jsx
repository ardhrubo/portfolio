import React from 'react';

/**
 * Authentic Typographic Monogram Logo for Dhrubo.
 * Green monogram on a neutral glass surface shared by both themes.
 */
export default function Logo({ size = 40, className = '' }) {
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: Math.round(size * 0.28),
        background: 'var(--glass-item)',
        border: '1px solid var(--border-medium)',
        boxShadow: 'var(--glass-highlight)',
      }}
      className={`relative flex items-center justify-center backdrop-blur-md select-none shrink-0 ${className}`}
      aria-label="Dhrubo Logo"
    >
      {/* Theme-matched green monogram */}
      <span
        className="font-heading font-black text-primary leading-none tracking-tighter"
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
