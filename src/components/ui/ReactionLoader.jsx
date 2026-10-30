import { useId } from 'react';
import './reaction-loader.css';

/** Decorative reaction, shown only while a real lazy module is loading. */
export default function ReactionLoader({ label = 'Preparing the experiments…', className = '' }) {
  const id = useId();
  return (
    <div className={`reaction-loader ${className}`} role="status">
      <svg viewBox="0 0 160 160" width="112" height="112" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id={id}><path d="M65 25v39l-35 62q-6 13 10 13h80q16 0 10-13L95 64V25Z" /></clipPath>
        </defs>
        <ellipse cx="80" cy="147" rx="42" ry="4" fill="currentColor" opacity=".08" />
        <g clipPath={`url(#${id})`}>
          <path d="M20 88H140V143H20Z" fill="currentColor" opacity=".12" />
          <path className="reaction-liquid" d="M-40 97Q-10 81 20 97T80 97T140 97T200 97V145H-40Z" fill="currentColor" opacity=".65" />
          <path className="reaction-liquid reaction-liquid--back" d="M-40 107Q-10 91 20 107T80 107T140 107T200 107V145H-40Z" fill="currentColor" opacity=".3" />
          {[58, 80, 102].map((cx, i) => <circle key={cx} className="reaction-bubble" cx={cx} cy="124" r={3 + i} style={{ animationDelay: `${i * -.7}s` }} fill="var(--background)" opacity=".7" />)}
        </g>
        <path d="M65 25v39l-35 62q-6 13 10 13h80q16 0 10-13L95 64V25M60 25h40M63 19h34" fill="none" stroke="var(--foreground)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M58 85l-20 38M102 97h9m-4 12h10m-4 12h10" fill="none" stroke="var(--foreground)" strokeWidth="2" strokeLinecap="round" opacity=".3" />
      </svg>
      <span>{label}</span>
      <small>Code meets chemistry</small>
    </div>
  );
}
