import React, { useState, useMemo } from 'react';
import { projectsData } from '../data/portfolioData';

export default function ProjectsShowcase({ onSelectProject, onNavigateToAllProjects }) {
  const [imageErrors, setImageErrors] = useState({});

  const flagshipProjects = useMemo(() => {
    return [
      projectsData.find((p) => p.id === 'brownsinterior'),
      projectsData.find((p) => p.id === 'squicyuap'),
      projectsData.find((p) => p.id === 'horizontaxsolution'),
      projectsData.find((p) => p.id === 'scrapeautomate'),
      projectsData.find((p) => p.id === 'admissionbondhu'),
      projectsData.find((p) => p.id === 'emailhider'),
    ].filter(Boolean);
  }, []);

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <section id="projects" className="section flagship-section">
      <div className="container">
        {/* Compact Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
          <div>
            <div className="section-tag">
              <i className="fa-solid fa-star"></i>
              <span>Featured Work</span>
            </div>
            <h2 className="section-title" style={{ marginBottom: 0 }}>
              Selected <span className="gradient-text">Production Projects</span>
            </h2>
          </div>

          <button
            onClick={onNavigateToAllProjects}
            className="btn-liquid-glass h-10 px-4 text-xs sm:text-sm font-semibold shrink-0 self-start sm:self-auto"
          >
            <span>Explore All {projectsData.length} Projects</span>
            <i className="fa-solid fa-arrow-right"></i>
          </button>
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
                <div className="flex items-center justify-between gap-2">
                  <h3 className="flagship-title">{project.title}</h3>
                  <span className="flagship-category">{project.categoryLabel}</span>
                </div>
                <p className="flagship-desc line-clamp-2">{project.desc}</p>

                <div className="flagship-tech-row">
                  {project.tech.slice(0, 4).map((t, i) => (
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
                      <span>{project.hasLiveDemo ? 'Live App' : 'Open'}</span>
                      <i className="fa-solid fa-arrow-up-right-from-square"></i>
                    </a>
                  )}
                  <button
                    onClick={() => onSelectProject(project)}
                    className="btn-flagship-inspect"
                    title="Inspect architecture & highlights"
                  >
                    <i className="fa-solid fa-circle-info"></i>
                    <span>Details</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
