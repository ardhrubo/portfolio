import React, { useState, useMemo } from 'react';
import { projectsData } from '../data/portfolioData';
import Button from './ui/Button';
import { ArrowUpRight, ArrowRight, FolderOpen, FolderKanban, Layers } from 'lucide-react';
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
            <FolderKanban size={15} aria-hidden="true" />
            <span>01 / Selected projects</span>
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
          {flagshipProjects.map((project, index) => (
            <article key={project.id} className={`flagship-card ${index === 0 ? 'flagship-card--lead' : ''}`}>
              <div className="flagship-media">
                <div className="project-preview-bar"><span className="project-preview-dots" aria-hidden="true"><i /><i /><i /></span><span>{project.title}</span><span className="project-preview-index">{String(index + 1).padStart(2, '0')}</span></div>
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
                <div className="project-card-meta"><span>{index === 0 ? 'Featured product' : project.categoryLabel}</span><span>{project.badge}</span></div>
                <h3 className="flagship-title">{project.title}</h3>
                <p className="project-subtitle">{project.subtitle}</p>
                <p className="flagship-desc">{project.desc}</p>

                <div className="flagship-tech-row" aria-label="Built with">
                  {project.tech.map((t, i) => (
                    <span key={i} className={`project-stack-badge ${stackLogos[t] ? 'project-stack-badge--logo' : ''}`}>{stackLogos[t] && <span className={`project-stack-mark project-stack-mark--${stackLogos[t]}`}><img src={`/tech/${stackLogos[t]}.svg`} alt="" width="20" height="20" /></span>}{t}</span>
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
                    <span>Explore the build</span><ArrowRight size={16} aria-hidden="true" />
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
          <Button
            variant="secondary"
            onClick={onNavigateToAllProjects}
            className="btn-explore-vault-cta"
            title="Browse all projects"
          >
            <span>All projects</span>
            <ArrowRight size={17} aria-hidden="true" />
          </Button>
        </div>
      </div>
    </section>
  );
}
