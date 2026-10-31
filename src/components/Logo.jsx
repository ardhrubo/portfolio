import '../styles/logo.css';
export default function Logo({ size = 40, className = '' }) {
  return <span className={`dhrubo-mark ${className}`} style={{ width: size, height: size }}>
    <svg viewBox="0 0 64 64" role="img" aria-label="AR Dhrubo monogram">
      <path className="dhrubo-mark-stroke" d="M18 14h17l14 12v12L35 50H18V31" />
      <path className="dhrubo-mark-core" d="M18 39 34 23v18" />
      <circle className="dhrubo-mark-node" cx="18" cy="20" r="4" />
    </svg>
  </span>;
}
