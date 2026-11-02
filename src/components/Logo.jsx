import { useId } from 'react';
import '../styles/logo.css';

const letter = 'M16 12H32L48 24V38L34 50H16Z M25 21V41H31L39 34V28L30 21Z';

export default function Logo({ size = 40, className = '' }) {
  const id = useId();
  return <span className={`dhrubo-mark ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 64 64" role="img" aria-label="AR Dhrubo — D monogram">
      <defs>
        <linearGradient id={`${id}-face`} x1="17" y1="12" x2="46" y2="48" gradientUnits="userSpaceOnUse">
          <stop className="dhrubo-mark-light" />
          <stop offset=".45" className="dhrubo-mark-mid" />
          <stop offset="1" className="dhrubo-mark-color" />
        </linearGradient>
        <linearGradient id={`${id}-depth`} x1="19" y1="20" x2="50" y2="52" gradientUnits="userSpaceOnUse">
          <stop className="dhrubo-mark-color" />
          <stop offset="1" className="dhrubo-mark-shade" />
        </linearGradient>
      </defs>
      <path d={letter} fillRule="evenodd" transform="translate(3 4)" fill={`url(#${id}-depth)`} />
      <path d={letter} fillRule="evenodd" fill={`url(#${id}-face)`} className="dhrubo-mark-face" />
      <path className="dhrubo-mark-bevel" d="M17 49V13H32L47 24 M25 41H31L39 34" />
    </svg>
  </span>;
}
