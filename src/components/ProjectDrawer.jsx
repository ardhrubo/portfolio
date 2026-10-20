import React, { useEffect } from 'react';
import { projectsData } from '../data/portfolioData';

export default function ProjectDrawer({ project, onClose, onSelectProject }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    document.body.style.overflow = 'hidden';
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  if (!project) return null;

  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  return (
    <div className="drawer-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="drawer-panel" onClick={(e) => e.stopPropagation()}>
        {/* Top Header / Controls */}
        <div className="drawer-topbar">
          <div className="drawer-nav-arrows">
            <button
              onClick={() => prevProject && onSelectProject(prevProject)}
              disabled={!prevProject}
              className="drawer-arrow-btn"
              title={prevProject ? `Previous: ${prevProject.title}` : 'No previous project'}
            >
              <i className="fa-solid fa-chevron-left"></i>
            </button>
            <span className="drawer-index-indicator">
              {currentIndex + 1} / {projectsData.length}
            </span>
            <button
              onClick={() => nextProject && onSelectProject(nextProject)}
              disabled={!nextProject}
              className="drawer-arrow-btn"
              title={nextProject ? `Next: ${nextProject.title}` : 'No next project'}
            >
              <i className="fa-solid fa-chevron-right"></i>
            </button>
          </div>

          <button onClick={onClose} className="drawer-close-btn" aria-label="Close drawer">
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>

        {/* Media Banner */}
        <div className="drawer-media">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="drawer-media-fallback">
              <i className="fa-solid fa-layer-group"></i>
              <span>{project.title}</span>
            </div>
          )}
        </div>

        {/* Content Body */}
        <div className="drawer-body">
          <div className="drawer-meta-pills">
            <span className="drawer-category-pill">{project.categoryLabel}</span>
            <span className="drawer-badge-pill">{project.badge}</span>
          </div>

          <h2 className="drawer-title">{project.title}</h2>
          <div className="drawer-subtitle">{project.subtitle}</div>

          <p className="drawer-description">{project.longDesc || project.desc}</p>

          {/* Key Deliverables Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="drawer-highlights-card">
              <div className="drawer-highlights-header">
                <i className="fa-solid fa-circle-check" style={{ color: 'var(--accent-primary)' }}></i>
                <span>Engineering Deliverables & Highlights</span>
              </div>
              <ul className="drawer-highlights-list">
                {project.highlights.map((h, i) => (
                  <li key={i} className="drawer-highlight-item">
                    <i className="fa-solid fa-arrow-right"></i>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="drawer-tech-section">
            <span className="drawer-section-label">Technologies & Frameworks</span>
            <div className="drawer-tech-tags">
              {project.tech.map((t, idx) => (
                <span key={idx} className="drawer-tech-tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="drawer-action-row">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <span>{project.hasLiveDemo ? 'Launch Live Application' : 'Open Link'}</span>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <i className="fa-brands fa-github"></i>
                <span>View Source Code</span>
              </a>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
