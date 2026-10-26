import React from 'react';
import { skillsData } from '../data/portfolioData';

export default function Skills() {
  return (
    <section id="skills" className="section skills-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-layer-group"></i>
            <span>03 / Technical stack</span>
          </div>
          <h2 className="section-title">
            The tools behind <span className="gradient-text">the work.</span>
          </h2>
          <p className="section-subtitle">
            The languages, frameworks, and research tools I use to build, automate, and investigate.
          </p>
        </div>

        {/* Skills Categories Grid */}
        <div className="skills-categories-grid">
          {skillsData.map((cat, idx) => (
            <div key={idx} className="skill-category-card">
              <div className="skill-cat-header">
                <div
                  className="skill-cat-icon"
                  style={{
                    background: 'var(--tint-bg)',
                    color: 'var(--primary)',
                    border: '1px solid var(--tint-border)',
                  }}
                >
                  <i className={cat.icon}></i>
                </div>
                <h3 className="skill-cat-title">{cat.category}</h3>
              </div>

              <p className="skill-cat-desc">{cat.description}</p>

              <div className="skill-items-list">
                {cat.skills.map((skill, sIdx) => (
                  <div key={sIdx} className="skill-badge-row">
                    <div className="skill-name-group">
                      <i className={skill.icon}></i>
                      <span>{skill.name}</span>
                    </div>
                    <span className="skill-level-tag">{skill.level}</span>
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
