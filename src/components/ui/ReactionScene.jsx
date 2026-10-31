import { useEffect, useId, useRef, useState } from 'react';
import { Pause, Play, RotateCcw } from 'lucide-react';
import '../../styles/reaction-scene.css';

/** An illustrative mixing animation, not a chemical simulation. */
export default function ReactionScene({ phase = 0, compact = false }) {
  const id = useId().replace(/:/g, '');
  const root = useRef(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const [reduced, setReduced] = useState(() => matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [paused, setPaused] = useState(false);
  const [cycle, setCycle] = useState(0);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(root.current);
    const media = matchMedia('(prefers-reduced-motion: reduce)');
    const preference = () => setReduced(media.matches);
    const visibility = () => setPageVisible(!document.hidden);
    media.addEventListener('change', preference);
    document.addEventListener('visibilitychange', visibility);
    return () => { observer.disconnect(); media.removeEventListener('change', preference); document.removeEventListener('visibilitychange', visibility); };
  }, []);
  const tone = ['var(--primary)', 'var(--color-social)', 'var(--color-assistant)', 'var(--color-contact)'][(phase + cycle) % 4];
  return <figure ref={root} className={`reaction-scene${compact ? ' reaction-scene--compact' : ''}`} data-running={visible && pageVisible && !paused && !reduced} style={{ '--reaction-color': tone }}>
    <div className="reaction-scene-label"><span>IDEAS IN REACTION</span><span className="reaction-scene-dot" /></div>
    <svg key={`${phase}-${cycle}`} className="reaction-scene-art" viewBox="0 0 520 290" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-glass`} x1="0" x2="1"><stop stopColor="var(--liquid-reflection)" /><stop offset=".25" stopColor="var(--glass-bg)" stopOpacity=".15" /><stop offset=".75" stopColor="var(--glass-bg)" stopOpacity=".25" /><stop offset="1" stopColor="var(--liquid-reflection)" /></linearGradient>
        <linearGradient id={`${id}-liquid`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--reaction-color)" stopOpacity=".7" /><stop offset="1" stopColor="var(--reaction-color)" stopOpacity=".12" /></linearGradient>
        <linearGradient id={`${id}-blue`} x1="0" x2="1"><stop stopColor="var(--color-social)" stopOpacity=".55" /><stop offset="1" stopColor="var(--color-assistant)" stopOpacity=".15" /></linearGradient>
        <clipPath id={`${id}-vessel`}><path d="M229 69v41l-62 112q-12 22 14 22h158q26 0 14-22l-62-112V69Z" /></clipPath>
      </defs>
      <g className="reaction-grid" stroke="var(--ambient-line)" strokeWidth="1"><path d="M35 80h450M35 130h450M35 180h450M35 230h450M110 35v220M185 35v220M260 35v220M335 35v220M410 35v220" /></g>
      <ellipse cx="260" cy="256" rx="122" ry="13" className="reaction-shadow" />
      <g className="reaction-sideware" stroke="var(--border-medium)" fill={`url(#${id}-glass)`} strokeWidth="1.5">
        <path d="M91 119h38v107q0 20-19 20t-19-20Z" /><path d="M395 148h35v80q0 18-17 18t-18-18Z" />
        <path d="M95 187h30v39q0 16-15 16t-15-16Z" fill={`url(#${id}-blue)`} stroke="none" />
        <path d="M399 207h27v20q0 15-13 15t-14-15Z" fill={`url(#${id}-liquid)`} stroke="none" />
        <path d="M88 119h44M392 148h41M97 139h8m-8 15h8m-8 15h8M400 169h8m-8 15h8" fill="none" />
      </g>
      <g clipPath={`url(#${id}-vessel)`}>
        <path d="M150 167Q205 154 260 171T370 164V252H150Z" fill={`url(#${id}-blue)`} className="reaction-wave reaction-wave--back" />
        <path d="M145 181Q205 196 265 178T375 183V253H145Z" fill={`url(#${id}-liquid)`} className="reaction-wave" />
        <ellipse cx="260" cy="183" rx="81" ry="6" className="reaction-ripple" />
        {[0,1,2,3,4,5,6].map(i => <circle key={i} cx={204+i*18} cy={224+(i%3)*4} r={2+i%3} className="reaction-bubble" style={{ '--bubble-delay': `${-i*.8}s`, '--bubble-duration': `${2.7+i*.3}s` }} />)}
        <path d="M198 216q60-27 123 0M212 231q48-18 96-3" className="reaction-swirl" />
      </g>
      <path d="M229 69v41l-62 112q-12 22 14 22h158q26 0 14-22l-62-112V69" fill={`url(#${id}-glass)`} stroke="var(--liquid-rim)" strokeWidth="2" />
      <path d="M237 83v30l-49 91m-5 11-4 8M283 91v23l48 88" className="reaction-reflection" />
      <rect x="222" y="65" width="76" height="8" rx="4" fill={`url(#${id}-glass)`} stroke="var(--border-medium)" />
      <path d="M293 155h12m-3 18h12m-3 18h12m-3 18h12" stroke="var(--liquid-rim)" strokeWidth="1.5" />
      <g className="reaction-pipette"><rect x="252" y="16" width="16" height="28" rx="7" fill="var(--reaction-color)" fillOpacity=".6" /><path d="M256 42v13l4 7 4-7V42" fill={`url(#${id}-glass)`} stroke="var(--border-medium)" /></g>
      <path d="M260 67q-8 12 0 14 8-2 0-14" className="reaction-drop" />
      <g className="reaction-molecule" stroke="var(--color-assistant)" strokeWidth="1.5" fill="var(--background)"><path d="m362 63 24 15 25-14m-25 14v27" /><circle cx="362" cy="63" r="5" /><circle cx="386" cy="78" r="7" /><circle cx="411" cy="64" r="4" /><circle cx="386" cy="105" r="4" /></g>
      <path d="M67 255h386" stroke="var(--border-medium)" />
    </svg>
    <figcaption><span>Illustrative reaction</span><div>
      <button type="button" onClick={() => { setCycle(n => n+1); setPaused(false); }} aria-label="Mix a new color"><RotateCcw size={14} aria-hidden="true" />Mix</button>
      {!reduced && <button type="button" onClick={() => setPaused(v => !v)} aria-label={paused ? 'Play reaction animation' : 'Pause reaction animation'}>{paused ? <Play size={15} /> : <Pause size={15} />}</button>}
    </div></figcaption>
  </figure>;
}
