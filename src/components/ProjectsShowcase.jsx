import React, { useState, useMemo } from 'react';
import { projectsData } from '../data/portfolioData';

export default function ProjectsShowcase({ onSelectProject, onNavigateToAllProjects }) {
  const [imageErrors, setImageErrors] = useState({});

  // Flagship projects (Top standout client/production works)
  const flagshipProjects = useMemo(() => {
    return [
      projectsData.find(p => p.id === 'brownsinterior'),
      projectsData.find(p => p.id === 'squicyuap'),
      projectsData.find(p => p.id === 'horizontaxsolution'),
      projectsData.find(p => p.id === 'scrapeautomate'),
      projectsData.find(p => p.id === 'admissionbondhu'),
      projectsData.find(p => p.id === 'emailhider'),
    ].filter(Boolean);
  }, []);

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="projects" className="section flagship-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-star"></i>
            <span>Spotlight Deliveries</span>
          </div>
          <h2 className="section-title">
            Featured Client & <span className="gradient-text">Production Works</span>
          </h2>
          <p className="section-subtitle">
            Curated high-impact platforms engineered for global clients, real-time communities, and automated workflows.
          </p>
        </div>

        {/* Flagship Grid */}
        <div className="flagship-grid">
          {flagshipProjects.map((project) => (
            <div key={project.id} className="flagship-card">
              <div className="flagship-media">
                {!imageErrors[project.id] && project.image ? (
                  <img
                    src={project.image}
                    alt={project.title}
                    loading="lazy"
                    onError={() => handleImageError(project.id)}
                  />
                ) : (
                  <div className="flagship-fallback">
                    <i className="fa-solid fa-layer-group"></i>
                    <span>{project.title}</span>
                  </div>
                )}
                <span className="flagship-badge">{project.badge}</span>
              </div>

              <div className="flagship-body">
                <div className="flagship-category">{project.categoryLabel}</div>
                <h3 className="flagship-title">{project.title}</h3>
                <p className="flagship-desc">{project.desc}</p>

                <div className="flagship-tech-row">
                  {project.tech.map((t, i) => (
                    <span key={i} className="flagship-tech-pill">{t}</span>
                  ))}
                </div>

                <div className="flagship-actions">
                  {project.url && (
                    <a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-flagship-primary"
                    >
                      <span>{project.hasLiveDemo ? 'Visit Live Application' : 'Open Link'}</span>
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  )}
                  <button
                    onClick={() => onSelectProject(project)}
                    className="btn-flagship-inspect"
                    title="Inspect architecture & highlights"
                  >
                    <i className="fa-solid fa-circle-info"></i>
                    <span>Inspect</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* CTA Banner to Dedicated All Projects Page */}
        <div className="vault-cta-banner">
          <div className="vault-cta-info">
            <div className="vault-cta-tag">
              <i className="fa-solid fa-folder-open"></i>
              <span>Complete Engineering Vault</span>
            </div>
            <h3 className="vault-cta-title">Looking for the complete engineering vault?</h3>
            <p className="vault-cta-desc">
              Explore all client repositories, distributed web automation scrapers, Chrome utilities, and computational research platforms on our dedicated Project Vault page.
            </p>
          </div>
          <button
            onClick={onNavigateToAllProjects}
            className="btn-explore-vault-cta"
            title="Open complete Project Vault"
          >
            <span>Explore Full Project Vault</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
        </div>
      </div>
    </section>
  );
}
