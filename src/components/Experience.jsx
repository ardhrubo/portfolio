import React, { useState } from 'react';
import { experienceData, educationData, certificationsData } from '../data/portfolioData';

export default function Experience() {
  const [activeTab, setActiveTab] = useState('experience'); // 'experience' | 'education'
  const [filterCategory, setFilterCategory] = useState('all'); // 'all' | 'engineering' | 'research' | 'education'

  const filteredExperience = experienceData.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-briefcase"></i>
            <span>Career & Academic Journey</span>
          </div>
          <h2 className="section-title">
            Professional Experience & <span className="gradient-text">Research</span>
          </h2>
          <p className="section-subtitle">
            Verified timeline across production software engineering, distributed web scraping, computational chemistry, and higher education.
          </p>

          {/* Primary View Switcher: Experience vs Education */}
          <div className="exp-tab-switcher">
            <button
              className={`exp-tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              <i className="fa-solid fa-timeline"></i>
              <span>Work & Research Timeline</span>
              <span className="exp-count-badge">{experienceData.length}</span>
            </button>
            <button
              className={`exp-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              <i className="fa-solid fa-graduation-cap"></i>
              <span>Education & Credentials</span>
              <span className="exp-count-badge">{educationData.length + certificationsData.length}</span>
            </button>
          </div>

          {/* Category Filter Pills (when Work Experience tab is active) */}
          {activeTab === 'experience' && (
            <div className="exp-filter-pills">
              <button
                className={`exp-filter-pill ${filterCategory === 'all' ? 'active' : ''}`}
                onClick={() => setFilterCategory('all')}
              >
                All Positions ({experienceData.length})
              </button>
              <button
                className={`exp-filter-pill ${filterCategory === 'engineering' ? 'active' : ''}`}
                onClick={() => setFilterCategory('engineering')}
              >
                <i className="fa-solid fa-laptop-code"></i> Engineering & Dev (3)
              </button>
              <button
                className={`exp-filter-pill ${filterCategory === 'research' ? 'active' : ''}`}
                onClick={() => setFilterCategory('research')}
              >
                <i className="fa-solid fa-atom"></i> Scientific Research (2)
              </button>
              <button
                className={`exp-filter-pill ${filterCategory === 'education' ? 'active' : ''}`}
                onClick={() => setFilterCategory('education')}
              >
                <i className="fa-solid fa-book-open"></i> Teaching & Writing (2)
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: Experience Timeline */}
        {activeTab === 'experience' && (
          <div className="timeline-container">
            <div className="timeline-line"></div>

            {filteredExperience.map((exp, index) => (
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
                      <div className="timeline-company-row">
                        <span className="timeline-company">{exp.company}</span>
                        {exp.location && (
                          <span className="timeline-location">
                            <i className="fa-solid fa-location-dot"></i> {exp.location}
                          </span>
                        )}
                      </div>
                    </div>

                    <div className="timeline-badges">
                      <span className="timeline-period-pill">{exp.period}</span>
                      {exp.duration && (
                        <span className="timeline-duration-pill">{exp.duration}</span>
                      )}
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
        )}

        {/* Tab 2: Education & Certifications */}
        {activeTab === 'education' && (
          <div className="education-credentials-container">
            {/* Academic Education */}
            <div className="edu-block">
              <h3 className="edu-block-title">
                <i className="fa-solid fa-graduation-cap"></i>
                <span>Academic Degrees & Education</span>
              </h3>
              <div className="edu-grid">
                {educationData.map((edu, idx) => (
                  <div key={idx} className="edu-card">
                    <div className="edu-card-top">
                      <div className="edu-icon-badge" style={{ borderColor: edu.color, color: edu.color }}>
                        <i className={edu.icon}></i>
                      </div>
                      <span className="edu-status-tag">{edu.status}</span>
                    </div>
                    <h4 className="edu-degree">{edu.degree}</h4>
                    <div className="edu-institution">{edu.institution}</div>
                    <div className="edu-meta">
                      <span><i className="fa-solid fa-calendar"></i> {edu.period}</span>
                      <span><i className="fa-solid fa-location-dot"></i> {edu.location}</span>
                    </div>
                    <p className="edu-desc">{edu.description}</p>
                    <ul className="edu-highlights">
                      {edu.highlights.map((h, hIdx) => (
                        <li key={hIdx}>
                          <i className="fa-solid fa-circle-check"></i>
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Memberships */}
            <div className="cert-block">
              <h3 className="edu-block-title">
                <i className="fa-solid fa-award"></i>
                <span>Certifications & Scientific Affiliations</span>
              </h3>
              <div className="cert-grid">
                {certificationsData.map((cert, idx) => (
                  <div key={idx} className="cert-card">
                    <div className="cert-card-header">
                      <div className="cert-icon-box" style={{ color: cert.color }}>
                        <i className={cert.icon}></i>
                      </div>
                      <span className="cert-badge">{cert.badge}</span>
                    </div>
                    <h4 className="cert-title">{cert.title}</h4>
                    <div className="cert-issuer">{cert.issuer}</div>
                    <p className="cert-desc">{cert.description}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

