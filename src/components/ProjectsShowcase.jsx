import React, { useState, useMemo } from 'react';
import { projectsData } from '../data/portfolioData';
import Button from './ui/Button';
import { ArrowUpRight, ArrowRight, FolderOpen } from 'lucide-react';

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
            <span>01 / Selected projects</span>
          </div>
          <h2 className="section-title">
            Selected <span className="gradient-text">work.</span>
          </h2>
          <p className="section-subtitle">
            Client websites, community platforms, and automation tools. Explore the live work or open a project to see the architecture and technical details.
          </p>
        </div>

        {/* Flagship Grid */}
        <div className="flagship-grid">
          {flagshipProjects.map((project, index) => (
            <article key={project.id} className={`flagship-card ${index === 0 ? 'flagship-card--lead' : ''}`}>
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
                {index === 0 && <span className="featured-work-label">FEATURED BUILD</span>}
                <h3 className="flagship-title">{project.title}</h3>
                <p className="flagship-desc">{project.desc}</p>
                {index === 0 && <details className="featured-story"><summary>Inside the build</summary><div className="featured-story-content"><p>{project.longDesc}</p><h4>What went into the build</h4><ul>{project.highlights.slice(0, 3).map(highlight => <li key={highlight}>{highlight}</li>)}</ul></div></details>}

                <div className="flagship-tech-row">
                  {project.tech.map((t, i) => (
                    <span key={i} className="flagship-tech-pill">{t}</span>
                  ))}
                </div>

                <div className="flagship-actions">
                  {project.url && (
                    <Button asChild variant="secondary"><a
                      href={project.url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>{project.hasLiveDemo ? 'Visit website' : 'Open link'}</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </a></Button>
                  )}
                  <Button variant="ghost" size="small"
                    onClick={() => onSelectProject(project)}
                    className="project-details-button"
                    aria-label={`View project: ${project.title}`}
                  >
                    <span>View project</span><ArrowRight size={16} aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA Banner to Dedicated All Projects Page */}
        <div className="vault-cta-banner">
          <div className="vault-cta-info">
            <div className="vault-cta-tag">
              <FolderOpen size={16} aria-hidden="true" />
              <span>More to explore</span>
            </div>
            <h3 className="vault-cta-title">There’s more behind the work.</h3>
            <p className="vault-cta-desc">
              Browse web applications, automation tools, and research projects by technology or category.
            </p>
          </div>
          <button
            onClick={onNavigateToAllProjects}
            className="btn-explore-vault-cta"
            title="Browse all projects"
          >
            <span>All projects</span>
            <ArrowRight size={17} aria-hidden="true" />
          </button>
        </div>
      </div>
    </section>
  );
}
