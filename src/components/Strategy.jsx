import React, { useState } from 'react';
import { Compass, CheckCircle2 } from 'lucide-react';
import { engineeringStrategy } from '../data/portfolioData';
import '../styles/strategy.css';

export default function Strategy() {
  const [activeStep, setActiveStep] = useState(0);
  const current = engineeringStrategy[activeStep];

  return (
    <section id="strategy" className="section strategy-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Compass size={15} aria-hidden="true" />
            <span>04 / How I work</span>
          </div>
          <h2 className="section-title">
            A thoughtful <span className="gradient-text">approach.</span>
          </h2>
          <p className="section-subtitle">
            From first idea to the final detail.
          </p>
        </div>

        {/* Strategy Steps Nav */}
        <div className="strategy-nav-grid">
          {engineeringStrategy.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              aria-pressed={activeStep === index}
              className={`strategy-nav-item ${activeStep === index ? 'active' : ''}`}
            >
              <div className="strategy-nav-step">{item.step}</div>
              <div className="strategy-nav-text">
                <span className="strategy-nav-phase">{item.shortPhase}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Strategy Card */}
        <div className="strategy-active-card">
          <div className="strategy-story">
            <div className="strategy-card-header"><div>
              <div className="strategy-step-pill">{current.step} / {current.badge}</div>
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
          <div className={`strategy-illustration strategy-illustration--${activeStep}`} aria-hidden="true">
            <span className="strategy-lab-grid" />
            <span className="strategy-lab-tube strategy-lab-tube--one"><span /></span><span className="strategy-lab-tube strategy-lab-tube--two"><span /></span>
            <span className="strategy-lab-flask"><span className="strategy-lab-liquid" /><span className="strategy-lab-bubble strategy-lab-bubble--one" /><span className="strategy-lab-bubble strategy-lab-bubble--two" /></span>
            <span className="strategy-lab-neck" /><span className="strategy-lab-rim" /><span className="strategy-lab-base" />
            <span className="strategy-art-number">{current.step}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
