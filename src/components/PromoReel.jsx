import { useEffect, useRef, useState } from 'react';
import { ArrowLeft, Download, RotateCcw } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import { PromoStage } from './PromoStage';
import '../styles/promo.css';

export default function PromoReel({ onExit, onNavigateToHome }) {
  const [run, setRun] = useState(0);
  const video = useRef(null);
  const heading = useRef(null);
  const exit = () => {
    video.current?.pause();
    if (onExit) onExit(); else onNavigateToHome?.('#hero');
    requestAnimationFrame(() => document.getElementById('hero-watch-promo')?.focus());
  };
  useEffect(() => { heading.current?.focus({ preventScroll: true }); }, []);
  useEffect(() => {
    const pause = () => { if (document.hidden) video.current?.pause(); };
    document.addEventListener('visibilitychange', pause);
    return () => document.removeEventListener('visibilitychange', pause);
  }, []);
  return (
    <section
      className="promo-video-page"
      onKeyDown={event => {
        if (event.key === 'Escape' && !document.fullscreenElement) exit();
      }}
    >
      <button type="button" className="promo-back" onClick={exit}>
        <ArrowLeft size={17} /> Back to portfolio
      </button>
      <header>
        <p className="promo-kicker">AR DHRUBO / INTERACTIVE PROMO</p>
        <h1 ref={heading} tabIndex={-1}>From idea to launch.</h1>
        <p>Live motion graphics showcase — annotating product interfaces, shipping 3D web platforms, and orchestrating AI-native workflows.</p>
      </header>

      <div className="promo-stage-shell">
        <div className="promo-stage-bar">
          <span className="promo-stage-badge">STAGESHOW MOTION GRAPHICS</span>
          <button
            type="button"
            className="promo-replay-btn"
            onClick={() => setRun(n => n + 1)}
            aria-label="Replay motion graphics promo"
          >
            <RotateCcw size={14} aria-hidden="true" /> Replay
          </button>
        </div>
        <div className="promo-stage-frame">
          <PromoStage key={run} />
        </div>
      </div>

      <div className="promo-actions-row">
        <a
          className="promo-project-cta"
          href="#contact"
          onClick={event => {
            event.preventDefault();
            video.current?.pause();
            onNavigateToHome?.('#contact');
          }}
        >
          Start a project <span aria-hidden="true">↗</span>
        </a>
      </div>

      <div className="promo-video-section">
        <div className="promo-video-header">
          <p className="promo-kicker">RENDERED ILLUSTRATIVE REEL</p>
          <h2>Watch or download the full MP4 promo</h2>
        </div>
        <video
          ref={video}
          controls
          playsInline
          preload="metadata"
          poster="/media/portfolio-promo-widescreen-poster.jpg"
          aria-label={`${personalInfo.name} portfolio promo`}
        >
          <source src="/media/portfolio-promo-widescreen.mp4" type="video/mp4" />
          <track kind="captions" src="/media/portfolio-promo.vtt" srcLang="en" label="English" />
          Your browser cannot play this video. Use the download links below.
        </video>
        <div className="promo-downloads">
          <a href="/media/portfolio-promo-vertical.mp4" download>
            <Download size={18} />
            <span>Vertical promo<small>1080 × 1920 · Reels / Shorts</small></span>
          </a>
          <a href="/media/portfolio-promo-widescreen.mp4" download>
            <Download size={18} />
            <span>Widescreen promo<small>1920 × 1080 · Website / social posts</small></span>
          </a>
        </div>
        <details className="promo-transcript">
          <summary>Promo transcript</summary>
          <p>Got a project in mind? See what’s possible. Websites. Apps. Automation. Explore the work. Imagine your project. Brown’s Interior: interior design and 3D architecture. Squicy UAP: campus food ordering. ScrapeAutomate: web scraping and automation. React and Next.js for web experiences. Python and Puppeteer for automation. Claude Code, Codex, and Hermes Agent for the AI workflow. Visit my site. Let’s build your project. Visit ardhrubo.dev or contact {personalInfo.email}.</p>
          <p>Music-free promo; no instrumental soundtrack or spoken narration.</p>
        </details>
      </div>
    </section>
  );
}
