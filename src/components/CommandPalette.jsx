import React, { useState, useEffect } from 'react';
import {
  Search,
  Copy,
  ArrowUpRight,
  Folder,
  UserRound,
  FolderKanban,
  Briefcase,
  Compass,
  Atom,
  Handshake,
  Mail,
} from 'lucide-react';
import { Github, Linkedin } from './ui/BrandIcons';
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

  const trimmed = query.trim().toLowerCase();

  const sections = [
    { name: 'Overview', href: '#hero', Icon: UserRound, keywords: ['hero', 'intro', 'home', 'about', 'bio'] },
    { name: 'Projects Showcase', href: '#projects', Icon: FolderKanban, keywords: ['work', 'featured', 'portfolio', 'apps'] },
    { name: 'All Projects Archive', href: '#all-projects', Icon: Folder, keywords: ['archive', 'all', 'complete', 'directory'] },
    { name: 'Experience & Research', href: '#experience', Icon: Briefcase, keywords: ['jobs', 'career', 'work', 'education', 'research', 'credentials', 'events'] },
    { name: 'Engineering Approach', href: '#strategy', Icon: Compass, keywords: ['methodology', 'strategy', 'process', 'workflow', 'design', 'automate'] },
    { name: '3D Simulation Lab', href: '#simulation-lab', Icon: Atom, keywords: ['threejs', 'webgl', 'physics', 'science', 'crystallography'] },
    { name: 'Services', href: '#services', Icon: Handshake, keywords: ['hire', 'consulting', 'freelance', 'contract', 'offerings'] },
    { name: 'Get in Touch', href: '#contact', Icon: Mail, keywords: ['contact', 'email', 'message', 'reach', 'talk', 'hire'] },
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

  const quickActions = [
    {
      id: 'copy-email',
      title: `Copy Email Address (${personalInfo.email})`,
      action: () => handleAction('copy'),
      Icon: Copy,
      shortcut: 'Enter',
      keywords: ['email', 'contact', 'mail', 'write', 'reach', 'message', 'copy'],
    },
    {
      id: 'open-github',
      title: 'Open GitHub Profile (@ardhrubo)',
      action: () => { window.open(personalInfo.socials.github, '_blank', 'noopener,noreferrer'); onClose(false); },
      Icon: Github,
      external: true,
      keywords: ['github', 'code', 'git', 'repo', 'repositories', 'profile', 'source'],
    },
    {
      id: 'open-linkedin',
      title: 'Open LinkedIn Profile',
      action: () => { window.open(personalInfo.socials.linkedin, '_blank', 'noopener,noreferrer'); onClose(false); },
      Icon: Linkedin,
      external: true,
      keywords: ['linkedin', 'social', 'career', 'network', 'profile', 'resume'],
    },
  ];

  const filteredActions = trimmed
    ? quickActions.filter(act =>
        act.title.toLowerCase().includes(trimmed) ||
        act.keywords.some(k => k.includes(trimmed))
      )
    : quickActions;

  const filteredSections = trimmed
    ? sections.filter(sec =>
        sec.name.toLowerCase().includes(trimmed) ||
        sec.href.toLowerCase().includes(trimmed) ||
        sec.keywords.some(k => k.includes(trimmed))
      )
    : sections;

  const filteredProjects = trimmed
    ? projectsData.filter(p =>
        p.title.toLowerCase().includes(trimmed) ||
        p.categoryLabel.toLowerCase().includes(trimmed) ||
        p.tech.some(t => t.toLowerCase().includes(trimmed)) ||
        (p.desc && p.desc.toLowerCase().includes(trimmed))
      )
    : projectsData;

  const hasAnyResults = filteredActions.length > 0 || filteredSections.length > 0 || filteredProjects.length > 0;

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
          <Search size={18} className="cmd-search-icon" aria-hidden="true" />
          <input
            type="text"
            aria-label="Search projects, navigation, and commands"
            className="cmd-input"
            placeholder="Search projects, sections, or actions (e.g. 'React', 'Contact', 'Email')..."
            autoFocus
            value={query}
            onChange={e => setQuery(e.target.value)}
          />
          <button className="cmd-esc-badge" onClick={() => onClose(false)} aria-label="Close search">ESC</button>
        </div>

        <div className="cmd-results">
          {!hasAnyResults && (
            <div className="cmd-empty">No results found matching "{query}"</div>
          )}

          {/* Quick Actions (when query matches or on empty query) */}
          {filteredActions.length > 0 && (
            <div className="cmd-group">
              <span className="cmd-group-title">{trimmed ? `Actions (${filteredActions.length})` : 'Quick Actions'}</span>
              {filteredActions.map(act => {
                const ActionIcon = act.Icon;
                return (
                  <button key={act.id} className="cmd-item" onClick={act.action}>
                    <div className="cmd-item-icon"><ActionIcon size={16} aria-hidden="true" /></div>
                    <span>{act.title}</span>
                    {act.shortcut && <span className="cmd-shortcut">{act.shortcut}</span>}
                    {act.external && <ArrowUpRight size={14} className="cmd-ext-icon" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
          )}

          {/* Navigation Sections */}
          {filteredSections.length > 0 && (
            <div className="cmd-group">
              <span className="cmd-group-title">{trimmed ? `Navigation (${filteredSections.length})` : 'Jump to Section'}</span>
              {filteredSections.map((sec, i) => {
                const IconComponent = sec.Icon;
                return (
                  <button key={i} className="cmd-item" onClick={() => handleAction('link', sec.href)}>
                    <div className="cmd-item-icon"><IconComponent size={16} aria-hidden="true" /></div>
                    <span>{sec.name}</span>
                  </button>
                );
              })}
            </div>
          )}

          {/* Projects Search Results */}
          {filteredProjects.length > 0 && (
            <div className="cmd-group">
              <span className="cmd-group-title">
                {trimmed ? `Matching Projects (${filteredProjects.length})` : 'Projects Directory (Top Matches)'}
              </span>
              {filteredProjects.slice(0, 8).map(p => (
                <button key={p.id} className="cmd-item" onClick={() => handleAction('project', p)}>
                  <div className="cmd-item-icon"><Folder size={16} aria-hidden="true" /></div>
                  <div className="cmd-item-text">
                    <span className="cmd-item-name">{p.title}</span>
                    <span className="cmd-item-sub">{p.categoryLabel} &bull; {p.tech.slice(0, 3).join(', ')}</span>
                  </div>
                  <span className="cmd-badge">{p.badge}</span>
                </button>
              ))}
            </div>
          )}
        </div>

        <div className="cmd-footer">
          <span>Navigate with <kbd>&uarr;</kbd> <kbd>&darr;</kbd></span>
          <span>Open with <kbd>Enter</kbd></span>
          <span>Close with <kbd>Esc</kbd></span>
        </div>
    </AccessibleDialog>
  );
}
