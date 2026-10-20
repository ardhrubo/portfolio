import React, { useEffect } from 'react';

export default function ProjectModal({ project, onClose }) {
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

  return (
    <div className="modal-overlay" onClick={onClose} role="dialog" aria-modal="true">
      <div className="modal-container" onClick={(e) => e.stopPropagation()}>
        {/* Close Button */}
        <button
          className="modal-close-btn"
          onClick={onClose}
          aria-label="Close project modal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>

        {/* Banner */}
        <div className="modal-banner">
          {project.image ? (
            <img
              src={project.image}
              alt={project.title}
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
          ) : (
            <div className="project-thumbnail-fallback">
              <i className="fa-solid fa-layer-group"></i>
              <span>{project.title}</span>
            </div>
          )}
        </div>

        {/* Body */}
        <div className="modal-body">
          <div className="modal-meta-row">
            <span className="project-category-tag">{project.categoryLabel}</span>
            <span className="project-badge-pill" style={{ position: 'static' }}>
              {project.badge}
            </span>
          </div>

          <h2 className="modal-title">{project.title}</h2>
          <div className="modal-subtitle">{project.subtitle}</div>

          <p className="modal-description">{project.longDesc || project.desc}</p>

          {/* Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="modal-highlights-box">
              <div className="modal-highlights-title">
                <i className="fa-solid fa-circle-check" style={{ color: '#10b981' }}></i>
                <span>Key Deliverables & Engineering Highlights</span>
              </div>
              <ul className="modal-highlights-list">
                {project.highlights.map((h, i) => (
                  <li key={i} className="modal-highlight-item">
                    <i className="fa-solid fa-chevron-right"></i>
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div style={{ marginBottom: '24px' }}>
            <span
              style={{
                display: 'block',
                fontSize: '0.8rem',
                fontFamily: 'var(--font-mono)',
                color: 'var(--text-muted)',
                marginBottom: '10px',
                textTransform: 'uppercase',
              }}
            >
              Technologies & Tools
            </span>
            <div className="project-tech-tags">
              {project.tech.map((t, idx) => (
                <span key={idx} className="tech-tag-pill" style={{ fontSize: '0.82rem', padding: '5px 12px' }}>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Actions */}
          <div className="modal-actions-row">
            {project.url && (
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                <span>{project.hasLiveDemo ? 'Visit Live Demo' : 'Open Link'}</span>
                <i className="fa-solid fa-arrow-up-right-from-square"></i>
              </a>
            )}

            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary"
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
