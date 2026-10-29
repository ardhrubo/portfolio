import React, { useState, useEffect } from 'react';
import { projectsData, personalInfo } from '../data/portfolioData';
import AccessibleDialog from './ui/AccessibleDialog';

export default function CommandPalette({ isOpen, onClose, onSelectProject, onShowToast, onNavigateToAllProjects, onNavigateToHome }) {
  const [query, setQuery] = useState('');

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        onClose(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const filteredProjects = projectsData.filter(p =>
    p.title.toLowerCase().includes(query.toLowerCase()) ||
    p.categoryLabel.toLowerCase().includes(query.toLowerCase()) ||
    p.tech.some(t => t.toLowerCase().includes(query.toLowerCase()))
  );

  const sections = [
    { name: 'About & Overview', href: '#hero', icon: 'fa-solid fa-user' },
    { name: 'Flagship Deliveries', href: '#projects', icon: 'fa-solid fa-star' },
    { name: 'Complete Project Vault', href: '#all-projects', icon: 'fa-solid fa-folder-open' },
    { name: '3D Motion Graphics & Simulation Lab', href: '#simulation-lab', icon: 'fa-solid fa-atom' },
    { name: 'Career & Research Timeline', href: '#experience', icon: 'fa-solid fa-briefcase' },
    { name: 'Skills & Arsenal', href: '#skills', icon: 'fa-solid fa-layer-group' },
    { name: 'Get in Touch', href: '#contact', icon: 'fa-solid fa-paper-plane' },
  ];

  const handleAction = async (type, val) => {
    if (type === 'project') {
      onSelectProject(val);
      onClose(false);
    } else if (type === 'link') {
      if (val === '#all-projects' && onNavigateToAllProjects) {
        onNavigateToAllProjects();
      } else {
        onNavigateToHome(val);
      }
      onClose(false);
    } else if (type === 'copy') {
      try { await navigator.clipboard.writeText(personalInfo.email); onShowToast?.('Email copied.'); }
      catch { onShowToast?.(`Email me at ${personalInfo.email}`); }
      onClose(false);
    }
  };

  return (
    <AccessibleDialog title="Search portfolio" description="Find projects and navigate sections. Use arrow keys and Enter to select." onClose={() => onClose(false)} overlayClass="cmd-backdrop" className="cmd-modal" onKeyDown={event => {
      const items = [...event.currentTarget.querySelectorAll('.cmd-item')];
      if (!items.length) return;
      if (event.key === 'Enter' && event.target.tagName === 'INPUT') { event.preventDefault(); items[0].click(); }
      if (!['ArrowDown', 'ArrowUp'].includes(event.key)) return;
      event.preventDefault();
      const index = items.indexOf(document.activeElement);
      const next = index < 0 ? (event.key === 'ArrowDown' ? 0 : items.length - 1) : (index + (event.key === 'ArrowDown' ? 1 : -1) + items.length) % items.length;
      items[next].focus(); items[next].scrollIntoView({ block: 'nearest' });
    }}>
        <div className="cmd-input-wrapper">
          <i className="fa-solid fa-magnifying-glass cmd-search-icon"></i>
          <input
            type="text"
            aria-label="Search projects and technologies"
            className="cmd-input"
            placeholder="Type a project, technology, or command (e.g. 'React', 'Puppeteer', 'Contact')..."
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="cmd-esc-badge" onClick={() => onClose(false)} aria-label="Close search">ESC</button>
        </div>

        <div className="cmd-results">
          {/* Quick Actions */}
          {query === '' && (
            <div className="cmd-group">
              <span className="cmd-group-title">Quick Actions</span>
              <button className="cmd-item" onClick={() => handleAction('copy')}>
                <div className="cmd-item-icon"><i className="fa-regular fa-copy"></i></div>
                <span>Copy Email Address (<code>{personalInfo.email}</code>)</span>
                <span className="cmd-shortcut">Enter</span>
              </button>
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="cmd-item"
                onClick={() => onClose(false)}
              >
                <div className="cmd-item-icon"><i className="fa-brands fa-github"></i></div>
                <span>Open GitHub Profile (@ardhrubo)</span>
                <i className="fa-solid fa-arrow-up-right-from-square cmd-ext-icon"></i>
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="cmd-item"
                onClick={() => onClose(false)}
              >
                <div className="cmd-item-icon"><i className="fa-brands fa-linkedin"></i></div>
                <span>Open LinkedIn Profile</span>
                <i className="fa-solid fa-arrow-up-right-from-square cmd-ext-icon"></i>
              </a>
            </div>
          )}

          {/* Quick Navigation */}
          {query === '' && (
            <div className="cmd-group">
              <span className="cmd-group-title">Jump to Section</span>
              {sections.map((sec, i) => (
                <button key={i} className="cmd-item" onClick={() => handleAction('link', sec.href)}>
                  <div className="cmd-item-icon"><i className={sec.icon}></i></div>
                  <span>{sec.name}</span>
                </button>
              ))}
            </div>
          )}

          {/* Projects Search Results */}
          <div className="cmd-group">
            <span className="cmd-group-title">
              {query === '' ? 'Projects Directory (Top Matches)' : `Matching Projects (${filteredProjects.length})`}
            </span>
            {filteredProjects.length === 0 ? (
              <div className="cmd-empty">No projects found matching "{query}"</div>
            ) : (
              filteredProjects.slice(0, 8).map(p => (
                <button key={p.id} className="cmd-item" onClick={() => handleAction('project', p)}>
                  <div className="cmd-item-icon"><i className="fa-solid fa-folder-closed"></i></div>
                  <div className="cmd-item-text">
                    <span className="cmd-item-name">{p.title}</span>
                    <span className="cmd-item-sub">{p.categoryLabel} &bull; {p.tech.slice(0, 3).join(', ')}</span>
                  </div>
                  <span className="cmd-badge">{p.badge}</span>
                </button>
              ))
            )}
          </div>
        </div>

        <div className="cmd-footer">
          <span>Navigate with <kbd>&uarr;</kbd> <kbd>&darr;</kbd></span>
          <span>Open with <kbd>Enter</kbd></span>
          <span>Close with <kbd>Esc</kbd></span>
        </div>
    </AccessibleDialog>
  );
}
