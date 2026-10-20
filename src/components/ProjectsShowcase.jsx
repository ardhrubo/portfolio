import React, { useState, useMemo } from 'react';
import { projectsData } from '../data/portfolioData';

export default function ProjectsShowcase({ onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [imageErrors, setImageErrors] = useState({});

  // Flagship projects (Top 4 standout client/production works)
  const flagshipProjects = useMemo(() => {
    return [
      projectsData.find(p => p.id === 'horizontaxsolution'),
      projectsData.find(p => p.id === 'scrapeautomate'),
      projectsData.find(p => p.id === 'admissionbondhu'),
      projectsData.find(p => p.id === 'emailhider'),
    ].filter(Boolean);
  }, []);

  const categoryCounts = useMemo(() => {
    return {
      all: projectsData.length,
      fullstack: projectsData.filter((p) => p.category === 'fullstack').length,
      automation: projectsData.filter((p) => p.category === 'automation').length,
      tools: projectsData.filter((p) => p.category === 'tools').length,
    };
  }, []);

  const categories = [
    { id: 'all', label: 'All Projects', count: categoryCounts.all },
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
      if (activeCategory !== 'all') {
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
    <>
      {/* 1. Flagship Spotlight Showcase */}
      <section id="flagship" className="section flagship-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <i className="fa-solid fa-star"></i>
              <span>Spotlight Deliveries</span>
            </div>
            <h2 className="section-title">
              Flagship Client & <span className="gradient-text">Production Works</span>
            </h2>
            <p className="section-subtitle">
              High-impact solutions engineered for Australian accounting clients, live higher-education portals,
              enterprise Puppeteer platforms, and published Chrome extensions.
            </p>
          </div>

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
        </div>
      </section>

      {/* 2. Complete Project Vault (All 20 Projects) */}
      <section id="projects" className="section vault-section">
        <div className="container">
          <div className="section-header">
            <div className="section-tag">
              <i className="fa-solid fa-folder-open"></i>
              <span>All 20 Systems</span>
            </div>
            <h2 className="section-title">
              The Complete Project Vault <span className="gradient-text">({projectsData.length})</span>
            </h2>
            <p className="section-subtitle">
              Browse, filter, and inspect all 20 repositories and systems in your choice of visual Grid or compact Directory Table view.
            </p>
          </div>

          {/* Interactive Vault Controls */}
          <div className="vault-toolbar">
            <div className="vault-categories">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`vault-filter-chip ${activeCategory === cat.id ? 'active' : ''}`}
                >
                  <span>{cat.label}</span>
                  <span className="vault-chip-count">{cat.count}</span>
                </button>
              ))}
            </div>

            <div className="vault-search-and-view">
              {/* Instant Search Box */}
              <div className="vault-search-box">
                <i className="fa-solid fa-magnifying-glass"></i>
                <input
                  type="text"
                  placeholder={`Search ${projectsData.length} projects...`}
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
                {searchQuery && (
                  <button onClick={() => setSearchQuery('')} className="btn-clear-search">
                    <i className="fa-solid fa-xmark"></i>
                  </button>
                )}
              </div>

              {/* View Switcher: Grid vs Table */}
              <div className="vault-view-toggle">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`view-toggle-btn ${viewMode === 'grid' ? 'active' : ''}`}
                  title="Grid visual view"
                  aria-label="Grid view"
                >
                  <i className="fa-solid fa-grip"></i>
                </button>
                <button
                  onClick={() => setViewMode('table')}
                  className={`view-toggle-btn ${viewMode === 'table' ? 'active' : ''}`}
                  title="Compact directory table view"
                  aria-label="Table view"
                >
                  <i className="fa-solid fa-list-ul"></i>
                </button>
              </div>
            </div>
          </div>

          {/* Empty State */}
          {filteredProjects.length === 0 ? (
            <div className="vault-empty-card">
              <i className="fa-solid fa-magnifying-glass" style={{ fontSize: '2.5rem', color: 'var(--text-muted)' }}></i>
              <h3>No matching projects</h3>
              <p>No projects match "{searchQuery}". Try modifying your query or selecting "All Projects".</p>
            </div>
          ) : viewMode === 'grid' ? (
            /* Visual Grid View */
            <div className="vault-grid">
              {filteredProjects.map((project) => (
                <article key={project.id} className="vault-card">
                  <div className="vault-card-thumb">
                    {!imageErrors[project.id] && project.image ? (
                      <img
                        src={project.image}
                        alt={project.title}
                        loading="lazy"
                        onError={() => handleImageError(project.id)}
                      />
                    ) : (
                      <div className="vault-thumb-fallback">
                        <i className="fa-solid fa-layer-group"></i>
                        <span>{project.title}</span>
                      </div>
                    )}
                    <span className="vault-badge">{project.badge}</span>
                  </div>

                  <div className="vault-card-content">
                    <div className="vault-meta">
                      <span className="vault-category">{project.categoryLabel}</span>
                    </div>

                    <h3 className="vault-card-title">{project.title}</h3>
                    <p className="vault-card-desc">{project.desc}</p>

                    <div className="vault-tech-list">
                      {project.tech.map((t, idx) => (
                        <span key={idx} className="vault-tech-pill">{t}</span>
                      ))}
                    </div>

                    <div className="vault-card-actions">
                      {project.url && (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-vault-link"
                        >
                          <span>{project.hasLiveDemo ? 'Live Demo' : 'View'}</span>
                          <i className="fa-solid fa-arrow-up-right-from-square"></i>
                        </a>
                      )}
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="btn-vault-code"
                        >
                          <i className="fa-brands fa-github"></i>
                          <span>Code</span>
                        </a>
                      )}
                      <button
                        onClick={() => onSelectProject(project)}
                        className="btn-vault-inspect"
                        title="View details"
                      >
                        <i className="fa-solid fa-circle-info"></i>
                        <span>Inspect</span>
                      </button>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          ) : (
            /* Compact Directory Table View */
            <div className="vault-table-wrapper">
              <table className="vault-table">
                <thead>
                  <tr>
                    <th>Project Name</th>
                    <th>Category</th>
                    <th>Tech Stack</th>
                    <th>Classification</th>
                    <th style={{ textAlign: 'right' }}>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProjects.map((project) => (
                    <tr key={project.id} className="vault-table-row">
                      <td className="vault-table-name">
                        <div className="table-title-group">
                          <span className="table-title-text">{project.title}</span>
                          <span className="table-subtitle-text">{project.subtitle}</span>
                        </div>
                      </td>
                      <td>
                        <span className="table-cat-badge">{project.categoryLabel}</span>
                      </td>
                      <td>
                        <div className="table-tech-chips">
                          {project.tech.slice(0, 3).map((t, i) => (
                            <span key={i} className="table-tech-chip">{t}</span>
                          ))}
                          {project.tech.length > 3 && (
                            <span className="table-tech-chip-more">+{project.tech.length - 3}</span>
                          )}
                        </div>
                      </td>
                      <td>
                        <span className="table-badge-pill">{project.badge}</span>
                      </td>
                      <td style={{ textAlign: 'right' }}>
                        <div className="table-actions">
                          {project.url && (
                            <a
                              href={project.url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-table-action"
                              title={project.hasLiveDemo ? 'Live Demo' : 'View Site'}
                            >
                              <i className="fa-solid fa-arrow-up-right-from-square"></i>
                            </a>
                          )}
                          {project.githubUrl && (
                            <a
                              href={project.githubUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="btn-table-action"
                              title="Source code on GitHub"
                            >
                              <i className="fa-brands fa-github"></i>
                            </a>
                          )}
                          <button
                            onClick={() => onSelectProject(project)}
                            className="btn-table-action inspect"
                            title="Inspect project details"
                          >
                            <i className="fa-solid fa-circle-info"></i>
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </section>
    </>
  );
}
