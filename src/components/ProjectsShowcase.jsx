import React, { useState, useMemo } from 'react';
import { projectsData } from '../data/portfolioData';
import Button from './ui/Button';
import { ArrowUpRight, ArrowRight, FolderKanban, Layers } from 'lucide-react';
import '../styles/projects.css';

// Exact matches only: unavailable marks and methods keep their text labels.
const stackLogos = { React: 'react', 'React 19': 'react', 'Next.js': 'nextjs', 'Node.js': 'nodejs', 'Three.js': 'threejs', Supabase: 'supabase', Vite: 'vitejs', Puppeteer: 'puppeteer', 'Headless Chrome': 'chrome', Express: 'express', JavaScript: 'javascript', 'Modern CSS': 'css3' };

export default function ProjectsShowcase({ onSelectProject, onNavigateToAllProjects }) {
  const [imageErrors, setImageErrors] = useState({});

  // Flagship projects (Top standout client/production works)
  const flagshipProjects = useMemo(() => {
    return [
      projectsData.find(p => p.id === 'brownsinterior'),
      projectsData.find(p => p.id === 'squicyuap'),
      projectsData.find(p => p.id === 'scrapeautomate'),
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
            <FolderKanban size={15} aria-hidden="true" />
            <span>Selected projects</span>
          </div>
          <h2 className="section-title">
            Ideas turned into products
          </h2>
          <p className="section-subtitle">
            A selection of platforms, tools, and digital experiences I’ve built. Explore the product, then look under the hood.
          </p>
        </div>

        {/* Flagship Grid */}
        <div className="flagship-grid">
          {flagshipProjects.map((project) => (
            <article key={project.id} className="flagship-card">
              <div className="flagship-media">
                <div className="project-preview-screen">
                {!imageErrors[project.id] && project.image ? (
                  <img
                    src={project.image}
                    alt={`${project.title} interface preview`}
                    loading="lazy"
                    onError={() => handleImageError(project.id)}
                  />
                ) : (
                  <div className="flagship-fallback">
                    <Layers size={24} aria-hidden="true" />
                    <span>{project.title}</span>
                  </div>
                )}
                </div>
              </div>

              <div className="flagship-body">
                <div className="project-card-meta"><span>{project.categoryLabel}</span></div>
                <h3 className="flagship-title">{project.title}</h3>
                <p className="flagship-desc">{project.desc}</p>

                <div className="flagship-tech-row" aria-label="Built with">
                  {project.tech.filter(t => stackLogos[t]).slice(0, 3).map((t) => (
                    <span key={t} className="project-stack-logo" tabIndex={0}>
                      <span className={`project-stack-mark project-stack-mark--${stackLogos[t]}`}><img src={`/tech/${stackLogos[t]}.svg`} alt={t} width="28" height="28" /></span>
                      <span className="project-stack-tooltip" aria-hidden="true">{t}</span>
                    </span>
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
                    <span>Details</span><ArrowRight size={16} aria-hidden="true" />
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="projects-archive-link">
          <Button variant="secondary" onClick={onNavigateToAllProjects}>
            All projects <ArrowRight size={17} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
