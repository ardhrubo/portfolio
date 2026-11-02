import { useId } from 'react';
import '../styles/logo.css';

const letter = 'M14 10H29C45 10 53 19 53 32S45 54 29 54H14V27L22 19V46H29C39 46 45 41 45 32S39 18 29 18H14Z';

export default function Logo({ size = 40, className = '' }) {
  const id = useId();
  return <span className={`dhrubo-mark ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 64 64" role="img" aria-label="AR DHRUBO — D monogram">
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
      <path className="dhrubo-mark-bevel" d="M15 17V11H29C43 11 51 20 51 30 M23 45H29C38 45 44 40 44 33" />
    </svg>
  </span>;
}
