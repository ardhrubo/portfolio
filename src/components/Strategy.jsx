import React, { useState } from 'react';
import { engineeringStrategy } from '../data/portfolioData';

export default function Strategy() {
  const [activeStep, setActiveStep] = useState(0);
  const current = engineeringStrategy[activeStep];

  return (
    <section id="strategy" className="section strategy-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-compass-drafting"></i>
            <span>Engineering Blueprint</span>
          </div>
          <h2 className="section-title">
            The Unique Strategy: <span className="gradient-text">How I Build & Scale</span>
          </h2>
          <p className="section-subtitle">
            Most developers jump straight into code and hit roadblocks. My hybrid background in academic research
            and production engineering follows a battle-tested 4-phase delivery framework.
          </p>
        </div>

        {/* Strategy Steps Nav */}
        <div className="strategy-nav-grid">
          {engineeringStrategy.map((item, index) => (
            <button
              key={index}
              onClick={() => setActiveStep(index)}
              className={`strategy-nav-item ${activeStep === index ? 'active' : ''}`}
            >
              <div className="strategy-nav-step">{item.step}</div>
              <div className="strategy-nav-text">
                <span className="strategy-nav-phase">{item.phase}</span>
                <span className="strategy-nav-badge">{item.badge}</span>
              </div>
            </button>
          ))}
        </div>

        {/* Active Strategy Card */}
        <div className="strategy-active-card">
          <div className="strategy-card-header">
            <div>
              <div className="strategy-step-pill">Phase {current.step} &bull; {current.badge}</div>
              <h3 className="strategy-card-title">{current.title}</h3>
            </div>
            <div className="strategy-metric-badge">
              <i className="fa-solid fa-chart-line"></i>
              <span>{current.metric}</span>
            </div>
          </div>

          <p className="strategy-card-desc">{current.description}</p>

          <div className="strategy-deliverables-box">
            <h4 className="strategy-deliverables-title">
              <i className="fa-solid fa-shield-halved"></i>
              <span>Core Deliverables & Standards</span>
            </h4>
            <div className="strategy-deliverables-grid">
              {current.deliverables.map((item, idx) => (
                <div key={idx} className="strategy-deliverable-item">
                  <i className="fa-solid fa-circle-check"></i>
                  <span>{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
