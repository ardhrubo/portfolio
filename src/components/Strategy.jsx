import React, { useEffect, useRef, useState } from 'react';
import { Compass, CheckCircle2 } from 'lucide-react';
import { engineeringStrategy } from '../data/portfolioData';
import '../styles/strategy.css';
import WorkflowScene from './ui/WorkflowScene';

export default function Strategy() {
  const [activeStep, setActiveStep] = useState(0);
  const section = useRef(null);
  const [mobile, setMobile] = useState(() => window.matchMedia('(max-width: 767px)').matches);
  useEffect(() => {
    const media = window.matchMedia('(max-width: 767px)');
    const change = () => setMobile(media.matches);
    media.addEventListener('change', change);
    return () => media.removeEventListener('change', change);
  }, []);

  useEffect(() => {
    if (!mobile) return undefined;
    const cards = [...section.current.querySelectorAll('[data-step]')];
    const observer = new IntersectionObserver(entries => {
      for (const entry of entries) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
        }
      }
    }, { threshold: 0.15 });
    cards.forEach(card => observer.observe(card));
    let frame = 0;
    const update = () => {
      frame = 0;
      const center = window.innerHeight / 2;
      const closest = cards.reduce((best, card) => {
        const rect = card.getBoundingClientRect();
        const distance = Math.abs(rect.top + rect.height / 2 - center);
        return distance < best.distance ? { card, distance } : best;
      }, { card: cards[0], distance: Infinity });
      setActiveStep(Number(closest.card.dataset.step));
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    update();
    return () => {
      observer.disconnect();
      cancelAnimationFrame(frame);
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, [mobile]);

  const selectStep = index => {
    setActiveStep(index);
    if (!mobile) return;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    document.getElementById(`approach-${index}`)?.scrollIntoView({ behavior: reduced ? 'instant' : 'smooth', block: 'center' });
  };

  return (
    <section ref={section} id="strategy" className="section strategy-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Compass size={15} aria-hidden="true" />
            <span>How I work</span>
          </div>
          <h2 className="section-title">
            A thoughtful <span className="gradient-text">approach.</span>
          </h2>
          <p className="section-subtitle">
            {mobile ? 'From first idea to the final detail. Follow the process as you scroll.' : 'From first idea to the final detail. Explore each step.'}
          </p>
        </div>

        {/* Strategy Steps Nav */}
        <div className="strategy-nav-grid">
          {engineeringStrategy.map((item, index) => (
            <button
              key={index}
              onClick={() => selectStep(index)}
              onPointerEnter={event => { if (!mobile && event.pointerType === 'mouse') setActiveStep(index); }}
              onFocus={() => { if (!mobile) setActiveStep(index); }}
              aria-pressed={activeStep === index}
              className={`strategy-nav-item ${activeStep === index ? 'active' : ''}`}
            >
              
              <div className="strategy-nav-text">
                <span className="strategy-nav-phase">{item.shortPhase}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Strategy Card */}
        <div className="strategy-scroll-steps">
        {engineeringStrategy.map((current, index) => (
        <article id={`approach-${index}`} data-step={index} key={current.step} hidden={!mobile && activeStep !== index} className={`strategy-active-card ${!mobile ? 'is-visible' : ''}`}>
          <div className="strategy-story">
            <div className="strategy-card-header"><div>
              <div className="strategy-step-pill">{current.badge}</div>
              <h3 className="strategy-card-title">{current.phase}</h3>
            </div></div>
            <p className="strategy-card-desc">{current.summary}</p>
            <details className="strategy-deliverables-box">
              <summary>Explore the details</summary>
            <div className="strategy-deliverables-grid">
              {current.deliverables.map((item, idx) => (
                <div key={idx} className="strategy-deliverable-item">
                  <CheckCircle2 size={15} aria-hidden="true" />
                  <span>{item}</span>
                </div>
              ))}
            </div>
            </details>
          </div>
          <WorkflowScene phase={index} />
        </article>
        ))}
        </div>
      </div>
    </section>
  );
}
