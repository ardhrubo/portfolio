import React from 'react';

export default function StatusIndicator({ label = 'Available', title, compact = false }) {
  return (
    <span
      title={title}
      className={`inline-flex items-center gap-1.5 rounded-full border border-primary/25 bg-primary/10 font-medium text-primary whitespace-nowrap ${
        compact ? 'px-2 py-0.5 text-[0.6875rem]' : 'px-2.5 py-1 text-xs'
      }`}
    >
      <span className="relative flex size-1.5" aria-hidden="true">
        <span className="absolute inline-flex size-full rounded-full bg-primary opacity-70 motion-safe:animate-ping" />
        <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
      </span>
      {label}
    </span>
  );
}
