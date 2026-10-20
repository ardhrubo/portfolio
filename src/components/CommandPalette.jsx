import React, { useState, useEffect } from 'react';
import { projectsData, personalInfo } from '../data/portfolioData';

export default function CommandPalette({ isOpen, onClose, onSelectProject, onShowToast }) {
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
    { name: 'Live Automation Simulator', href: '#playground', icon: 'fa-solid fa-terminal' },
    { name: 'Career & Research Timeline', href: '#experience', icon: 'fa-solid fa-briefcase' },
    { name: 'Skills & Arsenal', href: '#skills', icon: 'fa-solid fa-layer-group' },
    { name: 'Get in Touch', href: '#contact', icon: 'fa-solid fa-paper-plane' },
  ];

  const handleAction = (type, val) => {
    if (type === 'project') {
      onSelectProject(val);
      onClose(false);
    } else if (type === 'link') {
      if (val === '#all-projects' && onNavigateToAllProjects) {
        onNavigateToAllProjects();
      } else {
        window.location.href = val;
      }
      onClose(false);
    } else if (type === 'copy') {
      navigator.clipboard.writeText(personalInfo.email);
      if (onShowToast) onShowToast('Email copied to clipboard!');
      onClose(false);
    }
  };

  return (
    <div className="cmd-backdrop" onClick={() => onClose(false)} role="dialog" aria-modal="true">
      <div className="cmd-modal" onClick={e => e.stopPropagation()}>
        <div className="cmd-input-wrapper">
          <i className="fa-solid fa-magnifying-glass cmd-search-icon"></i>
          <input
            type="text"
            className="cmd-input"
            placeholder="Type a project, technology, or command (e.g. 'React', 'Puppeteer', 'Contact')..."
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <span className="cmd-esc-badge" onClick={() => onClose(false)}>ESC</span>
        </div>

        <div className="cmd-results">
          {/* Quick Actions */}
          {query === '' && (
            <div className="cmd-group">
              <span className="cmd-group-title">Quick Actions</span>
              <div className="cmd-item" onClick={() => handleAction('copy')}>
                <div className="cmd-item-icon"><i className="fa-regular fa-copy"></i></div>
                <span>Copy Email Address (<code>{personalInfo.email}</code>)</span>
                <span className="cmd-shortcut">Enter</span>
              </div>
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
                <div className="cmd-item-icon"><i className="fa-brands fa-linkedin" style={{ color: '#0a66c2' }}></i></div>
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
                <div key={i} className="cmd-item" onClick={() => handleAction('link', sec.href)}>
                  <div className="cmd-item-icon"><i className={sec.icon}></i></div>
                  <span>{sec.name}</span>
                </div>
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
                <div key={p.id} className="cmd-item" onClick={() => handleAction('project', p)}>
                  <div className="cmd-item-icon"><i className="fa-solid fa-folder-closed"></i></div>
                  <div className="cmd-item-text">
                    <span className="cmd-item-name">{p.title}</span>
                    <span className="cmd-item-sub">{p.categoryLabel} &bull; {p.tech.slice(0, 3).join(', ')}</span>
                  </div>
                  <span className="cmd-badge">{p.badge}</span>
                </div>
              ))
            )}
          </div>
        </div>

        <div className="cmd-footer">
          <span>Navigate with <kbd>&uarr;</kbd> <kbd>&darr;</kbd></span>
          <span>Open with <kbd>Enter</kbd></span>
          <span>Close with <kbd>Esc</kbd></span>
        </div>
      </div>
    </div>
  );
}
