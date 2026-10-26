import React from 'react';
import { skillsData } from '../data/portfolioData';

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        {/* Compact Section Header */}
        <div className="section-header" style={{ marginBottom: '36px' }}>
          <div className="section-tag">
            <i className="fa-solid fa-layer-group"></i>
            <span>Technical Stack</span>
          </div>
          <h2 className="section-title" style={{ marginBottom: 0 }}>
            Skills &amp; <span className="gradient-text">Engineering Arsenal</span>
          </h2>
        </div>

        {/* Compact Pill-Based Skills Grid */}
        <div className="skills-categories-grid">
          {skillsData.map((cat, idx) => (
            <div key={idx} className="skill-category-card">
              <div className="skill-cat-header" style={{ marginBottom: '16px' }}>
                <div className="skill-cat-icon">
                  <i className={cat.icon}></i>
                </div>
                <h3 className="skill-cat-title">{cat.category}</h3>
              </div>

              <div className="flex flex-wrap gap-2">
                {cat.skills.map((skill, sIdx) => (
                  <div
                    key={sIdx}
                    className="inline-flex items-center gap-2 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-item)] px-3 py-2 text-xs font-semibold text-foreground transition-colors hover:border-[var(--glass-border-strong)] hover:bg-[var(--glass-item-hover)]"
                  >
                    <i className={`${skill.icon} text-primary text-xs`}></i>
                    <span>{skill.name}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
