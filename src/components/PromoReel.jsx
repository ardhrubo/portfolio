import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, ArrowUpRight, ChevronLeft, ChevronRight, Pause, Play, RotateCcw } from 'lucide-react';
import { personalInfo, projectsData, promoReelData } from '../data/portfolioData';
import '../styles/promo.css';

const projects = promoReelData.projectIds.map(id => projectsData.find(p => p.id === id)).filter(Boolean);
const chapters = [{ label: 'Opening', duration: 5 }, ...projects.map(project => ({ label: project.title, duration: 6, project })), { label: 'Let’s build', duration: 5 }];
const duration = chapters.reduce((sum, chapter) => sum + chapter.duration, 0);
const starts = chapters.map((_, index) => chapters.slice(0, index).reduce((sum, chapter) => sum + chapter.duration, 0));
const timecode = value => `00:${Math.floor(value).toString().padStart(2, '0')}`;

function ProjectScreen({ project, decorative = false }) {
  return <div className="reel-browser" aria-hidden={decorative || undefined}>
    <div className="reel-browser-bar"><span className="reel-window-dots"><i /><i /><i /></span><span>{project.title}</span><ArrowUpRight size={12} /></div>
    <div className="reel-browser-image"><img src={project.image} alt={decorative ? '' : `${project.title} website preview`} /></div>
  </div>;
}

export default function PromoReel({ onExit, onNavigateToHome }) {
  const [elapsed, setElapsed] = useState(0);
  const [playing, setPlaying] = useState(() => !window.matchMedia('(prefers-reduced-motion: reduce)').matches);
  const heading = useRef(null);
  const index = Math.max(0, starts.findLastIndex(start => elapsed >= start));
  const chapter = chapters[index];
  const progress = Math.min(1, (elapsed - starts[index]) / chapter.duration);
  const exit = useCallback(() => {
    if (onExit) onExit(); else onNavigateToHome?.('#hero');
    requestAnimationFrame(() => document.getElementById('hero-watch-promo')?.focus());
  }, [onExit, onNavigateToHome]);
  const jump = useCallback(next => setElapsed(starts[Math.max(0, Math.min(chapters.length - 1, next))]), []);
  const toggle = useCallback(() => { if (elapsed >= duration) setElapsed(0); setPlaying(value => !value); }, [elapsed]);

  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, []);
  useEffect(() => {
    if (!playing) return;
    let previous = performance.now();
    const timer = setInterval(() => {
      const now = performance.now();
      const delta = (now - previous) / 1000;
      previous = now;
      setElapsed(value => Math.min(duration, value + delta));
    }, 100);
    return () => clearInterval(timer);
  }, [playing]);
  useEffect(() => { if (elapsed >= duration) setPlaying(false); }, [elapsed]);
  useEffect(() => {
    const motion = matchMedia('(prefers-reduced-motion: reduce)');
    const visibility = () => { if (document.hidden) setPlaying(false); };
    const preference = () => { if (motion.matches) setPlaying(false); };
    const keydown = event => {
      if (event.key === 'Escape') { exit(); return; }
      if (event.target instanceof Element && event.target.closest('input, textarea, select, button, a, [contenteditable="true"]')) return;
      if (event.code === 'Space') { event.preventDefault(); toggle(); }
      if (event.key === 'ArrowRight') { event.preventDefault(); jump(index + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); jump(index - 1); }
    };
    document.addEventListener('visibilitychange', visibility);
    window.addEventListener('keydown', keydown);
    motion.addEventListener('change', preference);
    return () => { document.removeEventListener('visibilitychange', visibility); window.removeEventListener('keydown', keydown); motion.removeEventListener('change', preference); };
  }, [exit, index, jump, toggle]);

  return <section className="reel-page" aria-label="Portfolio showreel">
    <header className="reel-header"><button className="reel-back" onClick={exit}><ArrowLeft size={16} /> Portfolio</button><span className="reel-eyebrow">Selected work / {timecode(duration)}</span></header>
    <div className="reel-player" data-playing={playing}>
      <div className="reel-stage" onFocusCapture={event => { if (event.target.closest('a, button')) setPlaying(false); }}>
        <div className="reel-stage-top"><span>{personalInfo.name}</span><span>Independent builder</span></div>
        <h1 ref={heading} tabIndex={-1} className="sr-only">{personalInfo.name} — portfolio showreel</h1>
        <div key={index} className={`reel-scene ${chapter.project ? 'reel-scene--project' : index === 0 ? 'reel-scene--intro' : 'reel-scene--outro'}`}>
          {index === 0 ? <>
            <div className="reel-copy"><span className="reel-eyebrow">Design. Code. Curiosity.</span><h2>{promoReelData.title}</h2><p>{promoReelData.intro}</p></div>
            <div className="reel-montage">{projects.map(project => <ProjectScreen key={project.id} project={project} decorative />)}</div>
          </> : chapter.project ? <>
            <div className="reel-copy"><span className="reel-eyebrow">0{index} / Selected project</span><h2>{chapter.project.title}</h2><p>{chapter.project.subtitle}</p><div className="reel-stack">{chapter.project.tech.slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}</div><a className="reel-project-link" href={chapter.project.url} target="_blank" rel="noreferrer">Explore project <ArrowUpRight size={16} /></a></div>
            <ProjectScreen project={chapter.project} />
          </> : <>
            <div className="reel-copy"><span className="reel-eyebrow">Good things start with a conversation.</span><h2>{promoReelData.closing}</h2><a className="reel-contact" href={`mailto:${personalInfo.email}`}>{personalInfo.email}<ArrowUpRight size={22} /></a><span className="reel-outro-location">{personalInfo.availabilityLocation}</span></div>
            <div className="reel-signature" aria-hidden="true">Let’s<br /><em>make it.</em></div>
          </>}
        </div>
        <div className="reel-stage-bottom"><span>Software / Systems / Experiences</span><span>0{index + 1} <span className="reel-muted">/ 0{chapters.length}</span></span></div>
      </div>
      <div className="reel-controls">
        <div className="reel-chapters" aria-label="Reel chapters">{chapters.map((item, i) => <button key={item.label} aria-label={`Jump to ${item.label}`} aria-current={i === index ? 'step' : undefined} onClick={() => jump(i)}><span className="reel-chapter-track"><i style={{ transform: `scaleX(${i < index ? 1 : i === index ? progress : 0})` }} /></span><span>{item.label}</span></button>)}</div>
        <div className="reel-controls-row"><div className="reel-transport">
          <button onClick={toggle} className="reel-play" aria-label={playing ? 'Pause reel' : elapsed >= duration ? 'Replay reel' : 'Play reel'}>{playing ? <Pause size={18} /> : <Play size={18} />}</button>
          <button onClick={() => jump(index - 1)} disabled={index === 0} aria-label="Previous chapter"><ChevronLeft size={18} /></button><button onClick={() => jump(index + 1)} disabled={index === chapters.length - 1} aria-label="Next chapter"><ChevronRight size={18} /></button>
          <button onClick={() => { setElapsed(0); setPlaying(false); }} aria-label="Reset reel"><RotateCcw size={16} /></button><span className="reel-time">{timecode(elapsed)} <span>/ {timecode(duration)}</span></span>
        </div><label className="reel-scrub"><span className="sr-only">Reel position in seconds</span><input type="range" min="0" max={duration} step=".1" value={elapsed} onChange={event => { setElapsed(Number(event.target.value)); setPlaying(false); }} /></label></div>
      </div>
    </div>
    <p className="reel-caption">A quick look at the work. Explore each project for the full story.</p>
  </section>;
}
