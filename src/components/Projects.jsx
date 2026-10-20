import React, { useState, useMemo } from 'react';
import { projectsData } from '../data/portfolioData';

export default function Projects({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [imageErrors, setImageErrors] = useState({});

  const categoryCounts = useMemo(() => {
    return {
      all: projectsData.length,
      featured: projectsData.filter((p) => p.featured).length,
      fullstack: projectsData.filter((p) => p.category === 'fullstack').length,
      automation: projectsData.filter((p) => p.category === 'automation').length,
      tools: projectsData.filter((p) => p.category === 'tools').length,
    };
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects', count: categoryCounts.all },
    { id: 'featured', label: 'Featured', count: categoryCounts.featured },
    { id: 'fullstack', label: 'Full-Stack Web', count: categoryCounts.fullstack },
    { id: 'automation', label: 'Automation & Bots', count: categoryCounts.automation },
    { id: 'tools', label: 'Tools & DevOps', count: categoryCounts.tools },
  ];

  const handleImageError = (id) => {
    setImageErrors((prev) => ({ ...prev, [id]: true }));
  };

  const filteredProjects = useMemo(() => {
    return projectsData.filter((project) => {
      // Category filter
      let matchesCat = true;
      if (activeCategory === 'featured') {
        matchesCat = project.featured;
      } else if (activeCategory !== 'all') {
        matchesCat = project.category === activeCategory;
      }

      // Search filter
      let matchesSearch = true;
      if (searchQuery.trim() !== '') {
        const query = searchQuery.toLowerCase();
        const inTitle = project.title.toLowerCase().includes(query);
        const inDesc = project.desc.toLowerCase().includes(query);
        const inTech = project.tech.some((t) => t.toLowerCase().includes(query));
        matchesSearch = inTitle || inDesc || inTech;
      }

      return matchesCat && matchesSearch;
    });
  }, [activeCategory, searchQuery]);

  return (
    <section id="projects" className="section projects-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-code"></i>
            <span>Complete Portfolio</span>
          </div>
          <h2 className="section-title">
            All Projects & <span className="gradient-text">Shipped Systems ({projectsData.length})</span>
          </h2>
          <p className="section-subtitle">
            Every project below represents production client work, public Chrome extensions, SaaS architectures,
            or open-source automation tools.
          </p>
        </div>

        {/* Toolbar: Category Filters & Search */}
        <div className="projects-toolbar">
          <div className="filter-tabs">
            {categories.map((cat) => (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`filter-btn ${activeCategory === cat.id ? 'active' : ''}`}
              >
                <span>{cat.label}</span>
                <span className="filter-count-badge">{cat.count}</span>
              </button>
            ))}
          </div>

          <div className="project-search-box">
            <i className="fa-solid fa-magnifying-glass"></i>
            <input
              type="text"
              className="project-search-input"
              placeholder={`Search all ${projectsData.length} projects...`}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}
                aria-label="Clear search"
              >
                <i className="fa-solid fa-xmark"></i>
              </button>
            )}
          </div>
        </div>

        {/* Project Cards Grid */}
        {filteredProjects.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: '60px 20px',
              color: 'var(--text-muted)',
              background: 'var(--bg-card)',
              borderRadius: 'var(--radius-lg)',
              border: '1px solid var(--border-subtle)',
            }}
          >
            <i className="fa-solid fa-folder-open" style={{ fontSize: '2.5rem', marginBottom: '16px' }}></i>
            <h3>No projects found matching "{searchQuery}"</h3>
            <p style={{ marginTop: '8px' }}>Try modifying your search query or switching categories.</p>
          </div>
        ) : (
          <div className="projects-grid">
            {filteredProjects.map((project) => (
              <article key={project.id} className="project-card">
                {/* Thumbnail / Visual */}
                <div className="project-thumbnail-wrapper">
                  {!imageErrors[project.id] && project.image ? (
                    <img
                      src={project.image}
                      alt={`${project.title} screenshot`}
                      className="project-thumbnail"
                      loading="lazy"
                      onError={() => handleImageError(project.id)}
                    />
                  ) : (
                    <div className="project-thumbnail-fallback">
                      <i className="fa-solid fa-layer-group"></i>
                      <span>{project.title}</span>
                    </div>
                  )}

                  <span className="project-badge-pill">{project.badge}</span>
                </div>

                {/* Body Content */}
                <div className="project-body">
                  <div className="project-meta-top">
                    <span className="project-category-tag">{project.categoryLabel}</span>
                    {project.featured && (
                      <span className="project-featured-star" title="Featured project">
                        <i className="fa-solid fa-star"></i> Featured
                      </span>
                    )}
                  </div>

                  <h3 className="project-title">{project.title}</h3>
                  <p className="project-desc">{project.desc}</p>

                  {/* Tech Stack Tags */}
                  <div className="project-tech-tags">
                    {project.tech.map((tag, idx) => (
                      <span key={idx} className="tech-tag-pill">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {/* Footer Actions */}
                  <div className="project-footer-actions">
                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-project-link primary"
                      >
                        <span>{project.hasLiveDemo ? 'Live Demo' : 'View Link'}</span>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    )}

                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-project-link secondary"
                      >
                        <i className="fa-brands fa-github"></i>
                        <span>Code</span>
                      </a>
                    )}

                    <button
                      className="btn-project-quickview"
                      onClick={() => onSelectProject(project)}
                      title="Read project highlights"
                    >
                      <span>Details</span>
                      <i className="fa-solid fa-circle-info"></i>
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
