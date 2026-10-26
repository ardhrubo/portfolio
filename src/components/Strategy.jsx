import React from 'react';
import { engineeringStrategy } from '../data/portfolioData';

export default function Strategy() {
  return (
    <section id="strategy" className="section strategy-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-compass-drafting"></i>
            <span>Engineering Framework</span>
          </div>
          <h2 className="section-title">
            How I Build &amp; <span className="gradient-text">Scale Systems</span>
          </h2>
          <p className="section-subtitle">
            Four-stage execution pipeline from system design to zero-downtime deployment.
          </p>
        </div>

        {/* Clean 4-Card Glass Pipeline Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {engineeringStrategy.map((item, index) => (
            <div
              key={index}
              className="glass-panel rounded-2xl p-5 flex flex-col justify-between gap-4 border border-[var(--glass-border)] bg-[var(--glass-bg)] hover:border-[var(--tint-border)] transition-all duration-300"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="inline-flex items-center justify-center px-2.5 py-1 rounded-lg text-xs font-mono font-bold bg-[var(--tint-bg)] text-[var(--tint-text)] border border-[var(--tint-border)]">
                    Phase {item.step}
                  </span>
                  <span className="text-[0.68rem] font-mono uppercase tracking-wider text-muted-foreground">
                    {item.badge}
                  </span>
                </div>

                <h3 className="text-base font-bold text-foreground tracking-tight mb-2">
                  {item.phase}
                </h3>

                <p className="text-xs text-muted-foreground leading-relaxed line-clamp-3">
                  {item.description}
                </p>
              </div>

              <div className="pt-3 border-t border-[var(--glass-border)] flex items-center justify-between gap-2">
                <div className="inline-flex items-center gap-1.5 text-xs font-mono font-semibold text-accent">
                  <i className="fa-solid fa-chart-line text-[0.7rem]"></i>
                  <span>{item.metric}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
