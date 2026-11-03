import { useEffect, useRef } from 'react';
import { ArrowLeft, Download } from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import '../styles/promo.css';

export default function PromoReel({ onExit, onNavigateToHome }) {
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
  return <section className="promo-video-page" onKeyDown={event => { if (event.key === 'Escape' && !document.fullscreenElement) exit(); }}>
    <button className="promo-back" onClick={exit}><ArrowLeft size={17} /> Back to portfolio</button>
    <header><p className="promo-kicker">AR DHRUBO / SELECTED WORK</p><h1 ref={heading} tabIndex={-1}>From idea to launch.</h1><p>24 seconds of ideas turned into websites, products, and useful systems.</p></header>
    <video ref={video} controls playsInline preload="metadata" poster="/media/portfolio-promo-widescreen-poster.jpg" aria-label={`${personalInfo.name} portfolio promo`}>
      <source src="/media/portfolio-promo-widescreen.mp4" type="video/mp4" />
      <track kind="captions" src="/media/portfolio-promo.vtt" srcLang="en" label="English" />
      Your browser cannot play this video. Use the download links below.
    </video>
    <div className="promo-downloads"><a href="/media/portfolio-promo-vertical.mp4" download><Download size={18} /><span>Vertical video<small>1080 × 1920 · Reels / Shorts</small></span></a><a href="/media/portfolio-promo-widescreen.mp4" download><Download size={18} /><span>Widescreen video<small>1920 × 1080 · Website / social posts</small></span></a></div>
    <details className="promo-transcript"><summary>Video transcript</summary><p>A little curiosity. Something useful. Thoughtful websites. Powerful systems. Meet AR Dhrubo, Product Builder. Brown’s Interior: interior design and 3D architecture. Squicy UAP: campus food ordering. ScrapeAutomate: web scraping and automation. Design. Build. Automate. From idea to launch. Let’s make it real. Visit ardhrubo.dev or contact {personalInfo.email}.</p><p>Original instrumental soundtrack; no spoken narration.</p></details>
  </section>;
}
