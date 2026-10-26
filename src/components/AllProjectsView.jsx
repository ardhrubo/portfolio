import React, { useState, useMemo, useEffect } from 'react';
import { projectsData } from '../data/portfolioData';

export default function AllProjectsView({ onBackToHome, onSelectProject }) {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState('grid'); // 'grid' | 'table'
  const [imageErrors, setImageErrors] = useState({});

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
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
      let matchesCat = true;
      if (activeCategory !== 'all') {
        matchesCat = project.category === activeCategory;
      }

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
    <div className="all-projects-page">
      {/* Top Navigation Bar */}
      <div className="all-projects-topbar">
        <div className="container">
          <button onClick={onBackToHome} className="btn-back-home">
            <i className="fa-solid fa-arrow-left"></i>
            <span>Back to Home</span>
          </button>
          <div className="all-projects-breadcrumbs">
            <span onClick={onBackToHome} className="breadcrumb-link">Home</span>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-active">Project Vault</span>
          </div>
        </div>
      </div>

      <div className="container" style={{ paddingTop: '20px', paddingBottom: '80px' }}>
        {/* Header */}
        <div className="section-header" style={{ marginBottom: '32px' }}>
          <div className="section-tag">
            <i className="fa-solid fa-folder-open"></i>
            <span>Engineering Archive</span>
          </div>
          <h1 className="section-title">
            The Complete Project Vault <span className="gradient-text">Archive</span>
          </h1>
          <p className="section-subtitle">
            Explore production web applications, automated crawling pipelines, Chrome privacy extensions, and open-source developer tooling.
          </p>
        </div>

        {/* Toolbar: Categories + Search + View Mode */}
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
            {/* Search Box */}
            <div className="vault-search-box">
              <i className="fa-solid fa-magnifying-glass"></i>
              <input
                type="text"
                placeholder="Search projects by name, category, or stack..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button onClick={() => setSearchQuery('')} className="btn-clear-search">
                  <i className="fa-solid fa-xmark"></i>
                </button>
              )}
            </div>

            {/* Grid vs Table View */}
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
                title="Table compact list view"
                aria-label="Table view"
              >
                <i className="fa-solid fa-list"></i>
              </button>
            </div>
          </div>
        </div>

        {/* Results Counter */}
        <div className="vault-results-summary">
          <span>Showing {filteredProjects.length} of {projectsData.length} projects</span>
          {searchQuery && (
            <span className="active-filter-indicator">
              Filtered by: <strong>"{searchQuery}"</strong>
            </span>
          )}
        </div>

        {/* View Mode: Grid */}
        {viewMode === 'grid' && (
          <div className="vault-grid">
            {filteredProjects.map((project) => (
              <div key={project.id} className="vault-card">
                <div className="vault-card-media">
                  {!imageErrors[project.id] && project.image ? (
                    <img
                      src={project.image}
                      alt={project.title}
                      loading="lazy"
                      onError={() => handleImageError(project.id)}
                    />
                  ) : (
                    <div className="vault-card-fallback">
                      <i className="fa-solid fa-code"></i>
                      <span>{project.title}</span>
                    </div>
                  )}
                  <span className="vault-card-badge">{project.badge}</span>
                </div>

                <div className="vault-card-content">
                  <div className="vault-card-meta">
                    <span className="vault-category-tag">{project.categoryLabel}</span>
                  </div>

                  <h3 className="vault-card-title">{project.title}</h3>
                  <p className="vault-card-desc line-clamp-2">{project.desc}</p>

                  <div className="vault-card-tech">
                    {project.tech.slice(0, 4).map((t, idx) => (
                      <span key={idx} className="vault-tech-pill">{t}</span>
                    ))}
                  </div>

                  <div className="vault-card-footer">
                    <button
                      onClick={() => onSelectProject(project)}
                      className="btn-vault-inspect"
                    >
                      <i className="fa-solid fa-circle-info"></i>
                      <span>Inspect Details</span>
                    </button>

                    {project.url && (
                      <a
                        href={project.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn-vault-visit"
                        title={project.hasLiveDemo ? 'Visit live website' : 'Open project source'}
                      >
                        <span>{project.hasLiveDemo ? 'Live Demo' : 'Source'}</span>
                        <i className="fa-solid fa-arrow-up-right-from-square"></i>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* View Mode: Table */}
        {viewMode === 'table' && (
          <div className="vault-table-wrapper">
            <table className="vault-table">
              <thead>
                <tr>
                  <th>Project Name</th>
                  <th>Category</th>
                  <th>Core Stack</th>
                  <th>Type</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {filteredProjects.map((project) => (
                  <tr key={project.id} onClick={() => onSelectProject(project)} className="vault-table-row">
                    <td className="table-col-title">
                      <div className="table-title-group">
                        <span className="table-title-text">{project.title}</span>
                        <span className="table-sub-text">{project.subtitle}</span>
                      </div>
                    </td>
                    <td>
                      <span className="table-category-badge">{project.categoryLabel}</span>
                    </td>
                    <td>
                      <div className="table-tech-pills">
                        {project.tech.slice(0, 3).map((t, idx) => (
                          <span key={idx} className="table-pill">{t}</span>
                        ))}
                        {project.tech.length > 3 && (
                          <span className="table-pill more">+{project.tech.length - 3}</span>
                        )}
                      </div>
                    </td>
                    <td>
                      <span className="table-badge">{project.badge}</span>
                    </td>
                    <td className="table-col-action">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onSelectProject(project);
                        }}
                        className="btn-table-inspect"
                      >
                        <i className="fa-solid fa-arrow-right"></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Empty Search State */}
        {filteredProjects.length === 0 && (
          <div className="vault-empty-state">
            <i className="fa-solid fa-magnifying-glass"></i>
            <h3>No matching projects found</h3>
            <p>Try searching with a different technology or clear your search query.</p>
            <button onClick={() => { setSearchQuery(''); setActiveCategory('all'); }} className="btn-reset-filters">
              Reset Filters
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
