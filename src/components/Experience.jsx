import React, { useState } from 'react';
import { experienceData, educationData, certificationsData, eventsData } from '../data/portfolioData';

export default function Experience() {
  const [activeTab, setActiveTab] = useState('experience'); // 'experience' | 'education' | 'events'
  const [showAllRoles, setShowAllRoles] = useState(false);
  const [lightboxImage, setLightboxImage] = useState(null);

  const visibleExperience = showAllRoles ? experienceData : experienceData.slice(0, 4);

  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        {/* Compact Section Header */}
        <div className="section-header" style={{ marginBottom: '32px' }}>
          <div className="section-tag">
            <i className="fa-solid fa-briefcase"></i>
            <span>Career &amp; Academic Track</span>
          </div>
          <h2 className="section-title">
            Experience &amp; <span className="gradient-text">Credentials</span>
          </h2>

          {/* Clean 3-Tab Switcher */}
          <div className="exp-tab-switcher" style={{ marginTop: '18px', marginBottom: '8px' }}>
            <button
              className={`exp-tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
            >
              <i className="fa-solid fa-timeline"></i>
              <span>Work &amp; Research</span>
              <span className="exp-count-badge">{experienceData.length}</span>
            </button>
            <button
              className={`exp-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
            >
              <i className="fa-solid fa-graduation-cap"></i>
              <span>Education &amp; Certs</span>
              <span className="exp-count-badge">{educationData.length + certificationsData.length}</span>
            </button>
            <button
              className={`exp-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => setActiveTab('events')}
            >
              <i className="fa-solid fa-trophy"></i>
              <span>Summits &amp; Hackathons</span>
              <span className="exp-count-badge">{eventsData.length}</span>
            </button>
          </div>
        </div>

        {/* Tab 1: Streamlined Experience Grid */}
        {activeTab === 'experience' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {visibleExperience.map((exp, index) => (
                <div
                  key={index}
                  className="glass-panel rounded-2xl p-5 flex flex-col justify-between transition-all duration-200 hover:-translate-y-0.5 hover:border-[var(--glass-border-strong)]"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2.5">
                      <div className="flex items-center gap-2.5">
                        <div className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-[var(--tint-bg)] border border-[var(--tint-border)] text-primary text-sm">
                          <i className={exp.icon}></i>
                        </div>
                        <div>
                          <h3 className="font-heading text-base font-bold text-foreground leading-tight">
                            {exp.role}
                          </h3>
                          <span className="text-xs font-semibold text-primary">
                            {exp.company}
                          </span>
                        </div>
                      </div>
                      <span className="shrink-0 rounded-full border border-[var(--glass-border)] bg-[var(--glass-item)] px-2.5 py-0.5 font-mono text-[0.6875rem] text-muted-foreground">
                        {exp.period}
                      </span>
                    </div>

                    <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed line-clamp-2 mt-2">
                      {exp.description}
                    </p>
                  </div>

                  <div className="flex flex-wrap gap-1.5 mt-4 pt-3 border-t border-[var(--glass-border)]">
                    {exp.tech.slice(0, 4).map((t, idx) => (
                      <span key={idx} className="tech-tag-pill">
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            {experienceData.length > 4 && (
              <div className="mt-6 text-center">
                <button
                  type="button"
                  onClick={() => setShowAllRoles((prev) => !prev)}
                  className="btn-liquid-frosted h-9 px-4 text-xs font-semibold"
                >
                  <span>{showAllRoles ? 'Show Core Roles Only' : `View All ${experienceData.length} Roles`}</span>
                </button>
              </div>
            )}
          </div>
        )}

        {/* Tab 2: Compact Education & Certifications */}
        {activeTab === 'education' && (
          <div className="max-w-4xl mx-auto flex flex-col gap-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {educationData.map((edu, idx) => (
                <div key={idx} className="edu-card">
                  <div className="edu-card-top">
                    <div className="edu-icon-badge">
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
                  <p className="edu-desc" style={{ marginBottom: 0 }}>{edu.description}</p>
                </div>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {certificationsData.map((cert, idx) => (
                <div key={idx} className="cert-card">
                  <div className="cert-card-header">
                    <div className="cert-icon-box">
                      <i className={cert.icon}></i>
                    </div>
                    <span className="cert-badge">{cert.badge}</span>
                  </div>
                  <h4 className="cert-title">{cert.title}</h4>
                  <div className="cert-issuer">{cert.issuer}</div>
                  <p className="cert-desc line-clamp-2">{cert.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 3: Summits & Hackathons */}
        {activeTab === 'events' && (
          <div className="max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {eventsData.map((event) => (
                <div
                  key={event.id}
                  className={`event-card ${event.hasRealPhoto ? 'event-card--featured' : ''}`}
                >
                  {event.hasRealPhoto && event.image && (
                    <div
                      className="event-card-media"
                      onClick={() => setLightboxImage(event)}
                      title="Click to view full photo"
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        className="event-card-img"
                        loading="lazy"
                      />
                      <div className="event-card-media-overlay">
                        <span className="event-view-photo-btn">
                          <i className="fa-solid fa-expand"></i> View Photo
                        </span>
                      </div>
                    </div>
                  )}

                  <div className="event-card-body">
                    <div className="event-card-meta-top">
                      <span className="event-type-badge">{event.badge}</span>
                      <span className="event-date-pill">
                        <i className="fa-solid fa-calendar-day"></i> {event.date}
                      </span>
                    </div>

                    <h3 className="event-card-title">{event.title}</h3>
                    <div className="event-card-subtitle">{event.organizer} &bull; {event.location}</div>
                    <p className="event-description line-clamp-2" style={{ marginBottom: '12px' }}>
                      {event.description}
                    </p>

                    <div className="event-tags-row">
                      {event.tags.slice(0, 3).map((tag, tIdx) => (
                        <span key={tIdx} className="tech-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxImage && (
          <div
            className="event-lightbox-overlay"
            onClick={() => setLightboxImage(null)}
            role="dialog"
            aria-modal="true"
          >
            <div
              className="event-lightbox-container"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="event-lightbox-close"
                onClick={() => setLightboxImage(null)}
                aria-label="Close photo preview"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>

              <div className="event-lightbox-img-wrapper">
                <img
                  src={lightboxImage.image}
                  alt={lightboxImage.title}
                  className="event-lightbox-img"
                />
              </div>

              <div className="event-lightbox-caption">
                <div className="event-lightbox-header">
                  <span className="event-type-badge">{lightboxImage.badge}</span>
                  <span className="event-date-pill">
                    <i className="fa-solid fa-calendar-day"></i> {lightboxImage.date}
                  </span>
                </div>
                <h3 className="event-lightbox-title">{lightboxImage.title}</h3>
                <p className="event-lightbox-subtitle">{lightboxImage.subtitle}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
