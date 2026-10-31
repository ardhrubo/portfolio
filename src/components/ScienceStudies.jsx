import { useEffect, useRef, useState } from 'react';
import { Waves, Gem, Pause, Play, RotateCcw } from 'lucide-react';

const initial = { frequency: 2, phase: 0, spacing: 1, rotation: 30 };

export default function ScienceStudies({ initialMode = 'waves' }) {
  const root = useRef(null);
  const [mode, setMode] = useState(initialMode);
  const [settings, setSettings] = useState(initial);
  const [paused, setPaused] = useState(() => window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const [visible, setVisible] = useState(false);
  const [time, setTime] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));
    observer.observe(root.current);
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    const preference = window.matchMedia('(prefers-reduced-motion: reduce)');
    const change = () => { if (preference.matches) setPaused(true); };
    preference.addEventListener('change', change);
    return () => preference.removeEventListener('change', change);
  }, []);
  useEffect(() => {
    if (paused || !visible) return;
    let frame;
    let last;
    const tick = now => {
      if (last !== undefined) setTime(t => t + Math.min((now - last) / 1000, .05));
      last = now;
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused, visible]);

  const update = key => event => setSettings(s => ({ ...s, [key]: Number(event.target.value) }));
  const reset = () => { setSettings(initial); setTime(0); };
  const wavePath = (kind, center) => Array.from({ length: 241 }, (_, i) => {
    const x = i / 240 * 560;
    const angle = i / 240 * Math.PI * 2 * settings.frequency - time * 2;
    const a = Math.sin(angle);
    const b = Math.sin(angle + settings.phase);
    return `${i ? 'L' : 'M'}${x + 20},${center - (kind === 'a' ? a : kind === 'b' ? b : a + b) * 24}`;
  }).join(' ');
  const angle = settings.rotation * Math.PI / 180 + time * .15;
  const points = [];
  for (let x = -1; x <= 1; x++) for (let y = -1; y <= 1; y++) for (let z = -1; z <= 1; z++) {
    const rx = x * Math.cos(angle) - z * Math.sin(angle);
    const rz = x * Math.sin(angle) + z * Math.cos(angle);
    points.push({ x, y, z, px: 300 + rx * 65 * settings.spacing, py: 165 + (y * .9 + rz * .4) * 65 * settings.spacing, depth: rz - y * .4 });
  }
  const bonds = [];
  points.forEach((a, i) => points.slice(i + 1).forEach(b => {
    if (Math.abs(a.x - b.x) + Math.abs(a.y - b.y) + Math.abs(a.z - b.z) === 1) bonds.push([a, b]);
  }));

  return <div ref={root} className="science-studies">
    <div className="study-heading"><h3>{mode === 'waves' ? 'Wave interference' : 'Crystal lattice'}</h3><span className="study-caption">Illustrative model</span></div>
    <div className="study-tabs" role="group" aria-label="Choose an experiment">
      <button type="button" aria-pressed={mode === 'waves'} onClick={() => setMode('waves')}><Waves size={18} /> Wave interference</button>
      <button type="button" aria-pressed={mode === 'crystal'} onClick={() => setMode('crystal')}><Gem size={18} /> Crystal lattice</button>
    </div>
    <div className="study-layout">
      <div className="study-visual">
        <svg viewBox="0 0 600 330" role="img" aria-label={mode === 'waves' ? 'Two waves and their combined amplitude' : 'Rotating simple cubic lattice with 27 sites'}>
          {mode === 'waves' ? <>
            {[70, 160, 265].map(y => <line key={y} x1="20" x2="580" y1={y} y2={y} className="study-axis" />)}
            <text x="22" y="28">WAVE A</text><text x="22" y="118">WAVE B</text><text x="22" y="213">COMBINED</text>
            <path d={wavePath('a', 70)} className="study-wave wave-a" />
            <path d={wavePath('b', 160)} className="study-wave wave-b" />
            <path d={wavePath('sum', 265)} className="study-wave wave-sum" />
          </> : <>
            {bonds.map(([a, b], i) => <line key={i} x1={a.px} y1={a.py} x2={b.px} y2={b.py} className="study-bond" />)}
            {points.sort((a, b) => a.depth - b.depth).map(p => <circle key={`${p.x},${p.y},${p.z}`} cx={p.px} cy={p.py} r={7 + (p.depth + 1.4) * 1.2} className={(p.x + p.y + p.z) % 2 === 0 ? 'study-site site-mint' : 'study-site site-lilac'} />)}
          </>}
        </svg>
      </div>
      <div className="study-controls">
        <h4>{mode === 'waves' ? 'When waves meet' : 'Order, from every angle'}</h4>
        <p>{mode === 'waves' ? 'Adjust the waves and watch them combine.' : 'Turn the lattice and explore its structure.'}</p>
        {mode === 'waves' ? <>
          <label>Frequency <output>{settings.frequency.toFixed(1)} cycles</output><input type="range" min="1" max="5" step="0.1" value={settings.frequency} onChange={update('frequency')} /></label>
          <label>Phase difference <output>{Math.round(settings.phase * 180 / Math.PI)}°</output><input type="range" min="0" max={Math.PI * 2} step="0.01" value={settings.phase} onChange={update('phase')} /></label>
        </> : <>
          <label>Spacing <output>{settings.spacing.toFixed(1)}×</output><input type="range" min="0.6" max="1.4" step="0.1" value={settings.spacing} onChange={update('spacing')} /></label>
          <label>Rotation offset <output>{settings.rotation}°</output><input type="range" min="0" max="360" value={settings.rotation} onChange={update('rotation')} /></label>
        </>}
        <div className="study-actions"><button type="button" onClick={() => setPaused(p => !p)}>{paused ? <Play size={16} /> : <Pause size={16} />}{paused ? 'Play' : 'Pause'}</button><button type="button" onClick={reset}><RotateCcw size={16} />Reset</button></div>
      </div>
    </div>
  </div>;
}
