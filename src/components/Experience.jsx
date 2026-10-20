import React from 'react';
import { experienceData } from '../data/portfolioData';

export default function Experience() {
  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-briefcase"></i>
            <span>Career Path</span>
          </div>
          <h2 className="section-title">
            Professional Experience & <span className="gradient-text">Research</span>
          </h2>
          <p className="section-subtitle">
            Bridging academia and industry — delivering computational models, high-scale scraping infrastructures,
            and reliable full-stack applications.
          </p>
        </div>

        {/* Timeline */}
        <div className="timeline-container">
          <div className="timeline-line"></div>

          {experienceData.map((exp, index) => (
            <div key={index} className="timeline-item">
              <div
                className="timeline-node"
                style={{ borderColor: exp.color, color: exp.color, boxShadow: `0 0 16px ${exp.color}55` }}
              >
                <i className={exp.icon}></i>
              </div>

              <div className="timeline-card">
                <div className="timeline-header">
                  <div>
                    <h3 className="timeline-role-title">{exp.role}</h3>
                    <div className="timeline-company">{exp.company}</div>
                  </div>

                  <div className="timeline-badges">
                    <span className="timeline-period-pill">{exp.period}</span>
                    <span className="timeline-type-pill">{exp.type}</span>
                  </div>
                </div>

                <p className="timeline-desc">{exp.description}</p>

                <ul className="timeline-achievements">
                  {exp.achievements.map((item, idx) => (
                    <li key={idx} className="timeline-achievement-item">
                      <i className="fa-solid fa-circle-check"></i>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>

                <div className="timeline-tech-row">
                  {exp.tech.map((t, idx) => (
                    <span key={idx} className="tech-tag-pill">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
