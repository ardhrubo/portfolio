import React, { useEffect, useRef } from 'react';
import * as Dialog from '@radix-ui/react-dialog';
import {
  ChevronLeft,
  ChevronRight,
  X,
  Layers,
  CheckCircle2,
  ArrowRight,
  ArrowUpRight,
} from 'lucide-react';
import { Github } from './ui/BrandIcons';
import Button from './ui/Button';
import { projectsData } from '../data/portfolioData';

export default function ProjectDrawer({ project, onClose, onSelectProject }) {
  const returnFocusRef = useRef(document.activeElement);
  useEffect(() => {
    const returnFocus = returnFocusRef.current;
    return () => {
      returnFocus?.focus();
    };
  }, []);

  if (!project) return null;

  const currentIndex = projectsData.findIndex((p) => p.id === project.id);
  const prevProject = currentIndex > 0 ? projectsData[currentIndex - 1] : null;
  const nextProject = currentIndex < projectsData.length - 1 ? projectsData[currentIndex + 1] : null;

  return (
    <Dialog.Root open={true} onOpenChange={(open) => { if (!open) onClose(); }}>
      <Dialog.Portal>
      <Dialog.Overlay className="drawer-overlay" />
      <Dialog.Content className="drawer-panel">
        {/* Top Header / Controls */}
        <div className="drawer-topbar">
          <div className="drawer-nav-arrows">
            <button
              onClick={() => prevProject && onSelectProject(prevProject)}
              disabled={!prevProject}
              className="drawer-arrow-btn"
              title={prevProject ? `Previous: ${prevProject.title}` : 'No previous project'}
              aria-label="Previous project"
            >
              <ChevronLeft size={18} aria-hidden="true" />
            </button>
            <span className="drawer-index-indicator">
              {currentIndex + 1} / {projectsData.length}
            </span>
            <button
              onClick={() => nextProject && onSelectProject(nextProject)}
              disabled={!nextProject}
              className="drawer-arrow-btn"
              title={nextProject ? `Next: ${nextProject.title}` : 'No next project'}
              aria-label="Next project"
            >
              <ChevronRight size={18} aria-hidden="true" />
            </button>
          </div>

          <button onClick={onClose} className="drawer-close-btn" aria-label="Close drawer">
            <X size={18} aria-hidden="true" />
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
              <Layers size={28} aria-hidden="true" />
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

          <Dialog.Title className="drawer-title">{project.title}</Dialog.Title>
          <div className="drawer-subtitle">{project.subtitle}</div>

          <Dialog.Description className="drawer-description">{project.longDesc || project.desc}</Dialog.Description>

          {/* Key Deliverables Highlights */}
          {project.highlights && project.highlights.length > 0 && (
            <div className="drawer-highlights-card">
              <div className="drawer-highlights-header">
                <CheckCircle2 size={16} aria-hidden="true" />
                <span>Engineering Deliverables &amp; Highlights</span>
              </div>
              <ul className="drawer-highlights-list">
                {project.highlights.map((h, i) => (
                  <li key={i} className="drawer-highlight-item">
                    <ArrowRight size={14} aria-hidden="true" />
                    <span>{h}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tech Stack */}
          <div className="drawer-tech-section">
            <span className="drawer-section-label">Technologies &amp; Frameworks</span>
            <div className="drawer-tech-tags">
              {project.tech.map((t, idx) => (
                <span key={idx} className="drawer-tech-tag">{t}</span>
              ))}
            </div>
          </div>

          {/* Action CTAs */}
          <div className="drawer-action-row">
            {project.url && (
              <Button
                asChild
                variant="primary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span>{project.hasLiveDemo ? 'Launch Live Application' : 'Open Link'}</span>
                  <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </Button>
            )}

            {project.githubUrl && (
              <Button
                asChild
                variant="secondary"
                style={{ flex: 1, justifyContent: 'center' }}
              >
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github size={17} />
                  <span>View Source Code</span>
                </a>
              </Button>
            )}
          </div>
        </div>
      </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
