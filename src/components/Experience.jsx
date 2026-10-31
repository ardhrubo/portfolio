import React, { useState } from 'react';
import {
  BriefcaseBusiness,
  GraduationCap,
  Sparkles,
  Laptop,
  Atom,
  BookOpen,
  Mic,
  GitFork,
  Brain,
  MapPin,
  CheckCircle2,
  Award,
  Calendar,
  Maximize2,
  Camera,
  Image,
  Building2,
  UserCheck,
  Images,
  Zap,
  ShieldCheck,
  X,
  Trophy,
  School,
  FlaskConical,
  Server,
  PenTool,
} from 'lucide-react';
import { experienceData, educationData, certificationsData, eventsData } from '../data/portfolioData';
import AccessibleDialog from './ui/AccessibleDialog';
import '../styles/experience.css';

const ROLE_ICONS = {
  'fa-solid fa-atom': Atom,
  'fa-solid fa-flask-vial': FlaskConical,
  'fa-solid fa-briefcase': BriefcaseBusiness,
  'fa-solid fa-laptop-code': Laptop,
  'fa-solid fa-server': Server,
  'fa-solid fa-pen-nib': PenTool,
  'fa-solid fa-chalkboard-user': BookOpen,
  'fa-solid fa-graduation-cap': GraduationCap,
  'fa-solid fa-school': School,
  'fa-solid fa-trophy': Trophy,
  'fa-solid fa-brain': Brain,
  'fa-solid fa-award': Award,
};

function renderDataIcon(iconName, size = 18) {
  const IconComponent = ROLE_ICONS[iconName] || BriefcaseBusiness;
  return <IconComponent size={size} aria-hidden="true" />;
}

export default function Experience() {
  const [activeTab, setActiveTab] = useState('experience'); // 'experience' | 'education' | 'events'
  const [filterCategory, setFilterCategory] = useState('engineering'); // 'all' | 'engineering' | 'research' | 'education'
  const [eventCategory, setEventCategory] = useState('all'); // 'all' | 'conference' | 'hackathon' | 'workshop'
  const [lightboxImage, setLightboxImage] = useState(null);

  const filteredExperience = experienceData.filter((item) => {
    if (filterCategory === 'all') return true;
    return item.category === filterCategory;
  });

  const filteredEvents = eventsData.filter((item) => {
    if (eventCategory === 'all') return true;
    return item.category === eventCategory;
  });


  return (
    <section id="experience" className="section experience-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <BriefcaseBusiness size={15} aria-hidden="true" />
            <span>02 / Experience & research</span>
          </div>
          <h2 className="section-title">
            The work behind <span className="gradient-text">the work.</span>
          </h2>
          <p className="section-subtitle">
            Building, researching, and sharing along the way.
          </p>

          {/* Primary View Switcher: Experience vs Education vs Conferences */}
          <div className="exp-tab-switcher">
            <button
              className={`exp-tab-btn ${activeTab === 'experience' ? 'active' : ''}`}
              onClick={() => setActiveTab('experience')}
              aria-pressed={activeTab === 'experience'}
            >
              <BriefcaseBusiness size={17} aria-hidden="true" />
              <span>Experience</span>
              <span className="exp-count-badge">{experienceData.length}</span>
            </button>
            <button
              className={`exp-tab-btn ${activeTab === 'education' ? 'active' : ''}`}
              onClick={() => setActiveTab('education')}
              aria-pressed={activeTab === 'education'}
            >
              <GraduationCap size={17} aria-hidden="true" />
              <span>Education</span>
              <span className="exp-count-badge">{educationData.length + certificationsData.length}</span>
            </button>
            <button
              className={`exp-tab-btn ${activeTab === 'events' ? 'active' : ''}`}
              onClick={() => setActiveTab('events')}
              aria-pressed={activeTab === 'events'}
            >
              <Sparkles size={17} aria-hidden="true" />
              <span>Events</span>
              <span className="exp-count-badge">{eventsData.length}</span>
            </button>
          </div>

          {/* Category Filter Pills (when Work Experience tab is active) */}
          {activeTab === 'experience' && (
            <div className="exp-filter-pills">
              <button
                className={`exp-filter-pill ${filterCategory === 'all' ? 'active' : ''}`}
                onClick={() => setFilterCategory('all')}
                aria-pressed={filterCategory === 'all'}
              >
                All Positions ({experienceData.length})
              </button>
              <button
                className={`exp-filter-pill ${filterCategory === 'engineering' ? 'active' : ''}`}
                onClick={() => setFilterCategory('engineering')}
                aria-pressed={filterCategory === 'engineering'}
              >
                <Laptop size={14} aria-hidden="true" /> Engineering ({experienceData.filter(item => item.category === 'engineering').length})
              </button>
              <button
                className={`exp-filter-pill ${filterCategory === 'research' ? 'active' : ''}`}
                onClick={() => setFilterCategory('research')}
                aria-pressed={filterCategory === 'research'}
              >
                <Atom size={14} aria-hidden="true" /> Research ({experienceData.filter(item => item.category === 'research').length})
              </button>
              <button
                className={`exp-filter-pill ${filterCategory === 'education' ? 'active' : ''}`}
                onClick={() => setFilterCategory('education')}
                aria-pressed={filterCategory === 'education'}
              >
                <BookOpen size={14} aria-hidden="true" /> Teaching & Writing ({experienceData.filter(item => item.category === 'education').length})
              </button>
            </div>
          )}

          {/* Category Filter Pills (when Events tab is active) */}
          {activeTab === 'events' && (
            <div className="exp-filter-pills">
              <button
                className={`exp-filter-pill ${eventCategory === 'all' ? 'active' : ''}`}
                onClick={() => setEventCategory('all')}
                aria-pressed={eventCategory === 'all'}
              >
                All Events ({eventsData.length})
              </button>
              <button
                className={`exp-filter-pill ${eventCategory === 'conference' ? 'active' : ''}`}
                onClick={() => setEventCategory('conference')}
                aria-pressed={eventCategory === 'conference'}
              >
                <Mic size={14} aria-hidden="true" /> Conferences ({eventsData.filter(e => e.category === 'conference').length})
              </button>
              <button
                className={`exp-filter-pill ${eventCategory === 'hackathon' ? 'active' : ''}`}
                onClick={() => setEventCategory('hackathon')}
                aria-pressed={eventCategory === 'hackathon'}
              >
                <GitFork size={14} aria-hidden="true" /> Hackathons ({eventsData.filter(e => e.category === 'hackathon').length})
              </button>
              <button
                className={`exp-filter-pill ${eventCategory === 'workshop' ? 'active' : ''}`}
                onClick={() => setEventCategory('workshop')}
                aria-pressed={eventCategory === 'workshop'}
              >
                <Brain size={14} aria-hidden="true" /> Workshops ({eventsData.filter(e => e.category === 'workshop').length})
              </button>
            </div>
          )}
        </div>

        {/* Tab 1: Experience Timeline */}
        {activeTab === 'experience' && (
          <div className="timeline-container">
            <div className="timeline-line"></div>

            {filteredExperience.map((exp) => (
              <div key={`${exp.company}-${exp.role}`} className={`timeline-item timeline-item--${exp.category}`}>
                <div className="timeline-node">
                  {renderDataIcon(exp.icon, 18)}
                </div>

                <div className="timeline-card">
                  <div className="timeline-header">
                    <div>
                      <h3 className="timeline-role-title">{exp.role}</h3>
                      <div className="timeline-company-row">
                        <span className="timeline-company">{exp.company}</span>
                        {exp.location && (
                          <span className="timeline-location">
                            <MapPin size={13} aria-hidden="true" /> {exp.location}
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

                  <div className="experience-preview-tech" aria-label="Selected technologies">{exp.tech.slice(0, 3).map(tech => <span key={tech}>{tech}</span>)}</div>

                  <details className="experience-details"><summary>Explore this role</summary><p className="timeline-desc">{exp.description}</p><ul className="timeline-achievements">
                    {exp.achievements.map((item, idx) => (
                      <li key={idx} className="timeline-achievement-item">
                        <CheckCircle2 size={14} aria-hidden="true" />
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
                  </details>
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
                <GraduationCap size={20} aria-hidden="true" />
                <span>Academic Degrees & Education</span>
              </h3>
              <div className="edu-grid">
                {educationData.map((edu, idx) => (
                  <div key={idx} className={`edu-card edu-card--${idx % 2 === 0 ? 'mint' : 'teal'}`}>
                    <div className="edu-card-top">
                      <div className="edu-icon-badge">
                        {renderDataIcon(edu.icon, 20)}
                      </div>
                      <span className="edu-status-tag">{edu.status}</span>
                    </div>
                    <h4 className="edu-degree">{edu.degree}</h4>
                    <div className="edu-institution">{edu.institution}</div>
                    <div className="edu-meta">
                      <span><Calendar size={13} aria-hidden="true" /> {edu.period}</span>
                      <span><MapPin size={13} aria-hidden="true" /> {edu.location}</span>
                    </div>
                    <p className="edu-desc">{edu.description}</p>
                    <ul className="edu-highlights">
                      {edu.highlights.map((h, hIdx) => (
                        <li key={hIdx}>
                          <CheckCircle2 size={14} aria-hidden="true" />
                          <span>{h}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            {/* Certifications & Memberships */}
            <details className="cert-block"><summary>Certifications & affiliations ({certificationsData.length})</summary>
              <h3 className="edu-block-title">
                <Award size={20} aria-hidden="true" />
                <span>Certifications & Scientific Affiliations</span>
              </h3>
              <div className="cert-grid">
                {certificationsData.map((cert, idx) => (
                  <div key={idx} className={`cert-card cert-card--${['mint', 'violet', 'blue'][idx % 3]}`}>
                    <div className="cert-card-header">
                      <div className="cert-icon-box">
                        {renderDataIcon(cert.icon, 20)}
                      </div>
                      <span className="cert-badge">{cert.badge}</span>
                    </div>
                    <h4 className="cert-title">{cert.title}</h4>
                    <div className="cert-issuer">{cert.issuer}</div>
                    <p className="cert-desc">{cert.description}</p>
                  </div>
                ))}
              </div>
            </details>
          </div>
        )}

        {/* Tab 3: Conferences, Hackathons & Tech Events */}
        {activeTab === 'events' && (
          <div className="events-showcase-container">
            <div className="events-grid">
              {filteredEvents.map((event) => (
                <div
                  key={event.id}
                  className={`event-card event-card--${event.category} ${event.hasRealPhoto ? 'event-card--featured' : ''}`}
                >
                  {/* Event Media / Photo */}
                  {event.hasRealPhoto && event.image ? (
                    <div
                      className="event-card-media"
                      onClick={() => setLightboxImage(event)}
                      title="Click to view full photo"
                      role="button"
                      tabIndex={0}
                      onKeyDown={eventKey => { if (eventKey.key === 'Enter' || eventKey.key === ' ') { eventKey.preventDefault(); setLightboxImage(event); } }}
                    >
                      <img
                        src={event.image}
                        alt={event.title}
                        className="event-card-img"
                        loading="lazy"
                      />
                      <div className="event-card-media-overlay">
                        <span className="event-view-photo-btn">
                          <Maximize2 size={13} aria-hidden="true" /> View Full Photo
                        </span>
                      </div>
                      <div className="event-photo-indicator">
                        <Camera size={13} aria-hidden="true" /> Live Event Photo
                      </div>
                    </div>
                  ) : (
                    <div className="event-card-placeholder-banner">
                      <div className="event-placeholder-icon">
                        {event.category === 'hackathon' ? (
                          <GitFork size={20} aria-hidden="true" />
                        ) : event.category === 'workshop' ? (
                          <Brain size={20} aria-hidden="true" />
                        ) : (
                          <Award size={20} aria-hidden="true" />
                        )}
                      </div>
                      <span className="event-ready-tag">
                        <Image size={13} aria-hidden="true" /> Photo Slot Ready
                      </span>
                    </div>
                  )}

                  {/* Event Content */}
                  <div className="event-card-body">
                    <div className="event-card-meta-top">
                      <span className="event-type-badge">
                        {event.badge}
                      </span>
                      <span className="event-date-pill">
                        <Calendar size={13} aria-hidden="true" /> {event.date}
                      </span>
                    </div>

                    <h3 className="event-card-title">{event.title}</h3>
                    <div className="event-card-subtitle">{event.subtitle}</div>

                    <div className="event-meta-row">
                      <span className="event-organizer">
                        <Building2 size={13} aria-hidden="true" /> {event.organizer}
                      </span>
                      <span className="event-location">
                        <MapPin size={13} aria-hidden="true" /> {event.location}
                      </span>
                    </div>

                    <div className="event-role-pill">
                      <UserCheck size={13} aria-hidden="true" /> {event.role}
                    </div>

                    <p className="event-description">{event.description}</p>

                    {event.keyTakeaways && event.keyTakeaways.length > 0 && (
                      <ul className="event-takeaways">
                        {event.keyTakeaways.map((point, pIdx) => (
                          <li key={pIdx}>
                            <CheckCircle2 size={14} aria-hidden="true" />
                            <span>{point}</span>
                          </li>
                        ))}
                      </ul>
                    )}

                    <div className="event-tags-row">
                      {event.tags.map((tag, tIdx) => (
                        <span key={tIdx} className="tech-tag-pill">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              ))}

              {/* Upload slot callout card */}
              <div className="event-upload-callout-card">
                <div className="event-upload-icon-circle">
                  <Images size={22} aria-hidden="true" />
                </div>
                <h4 className="event-upload-title">More Hackathons &amp; Summits</h4>
                <p className="event-upload-desc">
                  Attended or participating in new tech hackathons, developer conferences, and research summits? Drop more photos anytime to grow this live gallery!
                </p>
                <div className="event-upload-badges">
                  <span className="event-upload-pill">
                    <Zap size={13} aria-hidden="true" /> Instant Photo Integration
                  </span>
                  <span className="event-upload-pill">
                    <ShieldCheck size={13} aria-hidden="true" /> Verified Event Credentials
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Lightbox Modal */}
        {lightboxImage && (
          <AccessibleDialog title={lightboxImage.title} description="Event photo preview" overlayClass="event-lightbox-overlay" className="event-lightbox-container" onClose={() => setLightboxImage(null)}>
              <button
                className="event-lightbox-close"
                onClick={() => setLightboxImage(null)}
                aria-label="Close photo preview"
              >
                <X size={18} aria-hidden="true" />
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
                  <span className="event-type-badge">
                    {lightboxImage.badge}
                  </span>
                  <span className="event-date-pill">
                    <Calendar size={13} aria-hidden="true" /> {lightboxImage.date}
                  </span>
                </div>
                <h3 className="event-lightbox-title">{lightboxImage.title}</h3>
                <p className="event-lightbox-subtitle">{lightboxImage.subtitle}</p>
                <div className="event-lightbox-meta">
                  <span><Building2 size={14} aria-hidden="true" /> {lightboxImage.organizer}</span>
                  <span><MapPin size={14} aria-hidden="true" /> {lightboxImage.location}</span>
                  <span><UserCheck size={14} aria-hidden="true" /> {lightboxImage.role}</span>
                </div>
              </div>
          </AccessibleDialog>
        )}
      </div>
    </section>
  );
}

