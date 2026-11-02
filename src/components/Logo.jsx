import { useId } from 'react';
import '../styles/logo.css';

const letter = 'M14 10H29C45 10 53 19 53 32S45 54 29 54H14Z M25 20V44H29C37 44 42 40 42 32S37 20 29 20Z';

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
      <path d={letter} fillRule="evenodd" transform="translate(1.5 2)" fill={`url(#${id}-depth)`} />
      <path d={letter} fillRule="evenodd" fill={`url(#${id}-face)`} className="dhrubo-mark-face" />
      <path className="dhrubo-mark-bevel" d="M15 52V11H29C43 11 51 20 51 30 M26 43H29C36 43 40 39 41 34" />
    </svg>
  </span>;
}
