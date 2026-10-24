import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import Logo from './Logo';

const NAV_STYLES = `
.nv-pill {
  --nv-ease: cubic-bezier(0.16, 1, 0.3, 1);
  position: fixed; top: 1rem; left: 0; right: 0; margin: 0 auto;
  width: calc(100% - 1.5rem); max-width: 64rem; z-index: 50;
  display: flex; align-items: center; justify-content: space-between; gap: 0.75rem;
  padding: 0.625rem 1rem; border-radius: 1rem;
  border: 1px solid rgba(255,255,255,0.08);
  background: rgba(9,9,11,0.75);
  -webkit-backdrop-filter: blur(24px); backdrop-filter: blur(24px);
  box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.12), 0 12px 40px -12px rgba(0,0,0,0.6);
  font-family: var(--font-sans, 'Plus Jakarta Sans', system-ui, sans-serif);
  color: #fafafa;
}
.nv-left { display: flex; align-items: center; gap: 0.75rem; min-width: 0; }
.nv-brand { display: flex; align-items: center; gap: 0.5rem; text-decoration: none; color: #fafafa; }
.nv-brand-name { font-size: 0.875rem; font-weight: 600; letter-spacing: -0.01em; white-space: nowrap; }
.nv-status {
  display: inline-flex; align-items: center; gap: 0.375rem;
  padding: 0.1875rem 0.5rem; border-radius: 9999px;
  border: 1px solid rgba(16,185,129,0.25); background: rgba(16,185,129,0.08);
  font-size: 0.6875rem; font-weight: 500; color: #6ee7b7; white-space: nowrap; cursor: default;
}
.nv-dot { position: relative; width: 6px; height: 6px; border-radius: 9999px; background: #10b981; }
.nv-dot::after {
  content: ''; position: absolute; inset: 0; border-radius: 9999px; background: #10b981;
  animation: nv-ping 1.8s var(--nv-ease) infinite;
}
@keyframes nv-ping { 0% { transform: scale(1); opacity: .7; } 100% { transform: scale(2.8); opacity: 0; } }

.nv-links { display: flex; align-items: center; gap: 0.125rem; list-style: none; margin: 0; padding: 0; }
.nv-link {
  display: block; padding: 0.375rem 0.75rem; border-radius: 0.625rem;
  font-size: 0.8125rem; font-weight: 500; color: #a1a1aa; text-decoration: none;
  transition: color 300ms var(--nv-ease), background-color 300ms var(--nv-ease);
}
.nv-link:hover { color: #fafafa; background: rgba(255,255,255,0.04); }
.nv-link.active { color: #fafafa; background: rgba(255,255,255,0.06); box-shadow: inset 0 1px 0 0 rgba(255,255,255,0.08); }

.nv-right { display: flex; align-items: center; gap: 0.375rem; }
.nv-btn {
  display: inline-flex; align-items: center; justify-content: center; gap: 0.375rem;
  height: 2rem; min-width: 2rem; padding: 0 0.5rem; border-radius: 0.625rem;
  border: 1px solid rgba(255,255,255,0.08); background: rgba(255,255,255,0.03);
  color: #a1a1aa; font: inherit; font-size: 0.75rem; cursor: pointer;
  transition: color 300ms var(--nv-ease), border-color 300ms var(--nv-ease), background-color 300ms var(--nv-ease);
}
.nv-btn:hover { color: #fafafa; border-color: rgba(255,255,255,0.16); background: rgba(255,255,255,0.06); }
.nv-btn:focus-visible, .nv-link:focus-visible, .nv-cta:focus-visible, .nv-brand:focus-visible {
  outline: 2px solid #10b981; outline-offset: 2px;
}
.nv-kbd {
  font-family: var(--font-mono, 'JetBrains Mono', monospace); font-size: 0.6875rem;
  padding: 0.0625rem 0.3125rem; border-radius: 0.3125rem;
  border: 1px solid rgba(255,255,255,0.1); background: rgba(255,255,255,0.04); color: #d4d4d8;
}
.nv-ai-avatar { width: 1.125rem; height: 1.125rem; border-radius: 9999px; object-fit: cover; }
.nv-cta {
  display: inline-flex; align-items: center; gap: 0.375rem;
  height: 2rem; padding: 0 0.875rem; border-radius: 0.625rem;
  background: #fafafa; color: #09090b; text-decoration: none;
  font-size: 0.8125rem; font-weight: 600; white-space: nowrap;
  box-shadow: inset 0 -1px 0 0 rgba(0,0,0,0.12), 0 0 0 1px rgba(255,255,255,0.1);
  transition: transform 300ms var(--nv-ease), box-shadow 300ms var(--nv-ease);
}
.nv-cta:hover { transform: translateY(-1px); box-shadow: 0 6px 20px -6px rgba(16,185,129,0.55), 0 0 0 1px rgba(16,185,129,0.6); }
.nv-cta i { font-size: 0.6875rem; transition: transform 300ms var(--nv-ease); }
.nv-cta:hover i { transform: translateX(2px); }

@media (max-width: 900px) {
  .nv-pill { flex-wrap: wrap; row-gap: 0.5rem; }
  .nv-links { order: 3; width: 100%; justify-content: space-between; overflow-x: auto;
    padding-top: 0.5rem; border-top: 1px solid rgba(255,255,255,0.06); }
  .nv-hide-sm { display: none; }
}
@media (max-width: 480px) {
  .nv-brand-name, .nv-status-label { display: none; }
}
@media (prefers-reduced-motion: reduce) {
  .nv-dot::after { animation: none; }
  .nv-pill *, .nv-pill { transition: none !important; }
}
`;

export default function Navbar({
  currentTheme,
  currentView,
  onToggleTheme,
  onOpenCmd,
  onOpenChat,
  onNavigateToAllProjects,
  onNavigateToHome
}) {
  const [activeSection, setActiveSection] = useState('hero');
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const options = { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  useEffect(() => {
    if (currentView === 'all-projects') {
      setActiveSection('projects');
      return;
    }

    const handleScroll = () => {
      const scrollPos = window.scrollY + 220;
      const sections = ['contact', 'skills', 'projects', 'experience'];

      let found = 'hero';
      for (const section of sections) {
        const el = document.getElementById(section);
        if (el && scrollPos >= el.offsetTop) {
          found = section;
          break;
        }
      }
      setActiveSection(found);
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const navItems = [
    { id: 'experience', name: 'Experience', href: '#experience' },
    { id: 'projects', name: 'Projects', href: '#projects' },
    { id: 'skills', name: 'Skills', href: '#skills' },
    { id: 'contact', name: 'Contact', href: '#contact' },
  ];

  const handleNavClick = (e, link) => {
    if (currentView === 'all-projects') {
      e.preventDefault();
      onNavigateToHome(link.href);
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    onNavigateToHome('#hero');
  };

  const isLight = currentTheme === 'light';

  return (
    <>
      <style>{NAV_STYLES}</style>
      <header className="nv-pill" aria-label="Primary Navigation">
        {/* Left: Brand + Availability */}
        <div className="nv-left">
          <a href="#hero" onClick={handleBrandClick} className="nv-brand" id="nav-brand">
            <Logo size={28} showGlow={false} />
            <span className="nv-brand-name">{personalInfo.name}</span>
          </a>
          <span className="nv-status" title={`Available for hire · Dhaka ${localTime || 'GMT+6'}`}>
            <span className="nv-dot" aria-hidden="true"></span>
            <span className="nv-status-label">Available</span>
          </span>
        </div>

        {/* Center: Navigation */}
        <nav aria-label="Sections">
          <ul className="nv-links">
            {navItems.map((item) => {
              const isActive = currentView === 'all-projects' ? item.id === 'projects' : activeSection === item.id;
              return (
                <li key={item.id}>
                  <a
                    id={`nav-link-${item.id}`}
                    href={item.href}
                    onClick={(e) => handleNavClick(e, item)}
                    className={`nv-link ${isActive ? 'active' : ''}`}
                    aria-current={isActive ? 'page' : undefined}
                  >
                    {item.name}
                  </a>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Right: Tools + CTA */}
        <div className="nv-right">
          <button
            id="nav-cmd-btn"
            onClick={onOpenCmd}
            className="nv-btn"
            title="Quick Search (⌘K)"
            aria-label="Open Command Search"
          >
            <i className="fa-solid fa-magnifying-glass" aria-hidden="true"></i>
            <kbd className="nv-kbd">⌘K</kbd>
          </button>

          <button
            id="nav-ai-btn"
            onClick={onOpenChat}
            className="nv-btn nv-hide-sm"
            title="Chat with Dhrubo (⌘J / Ctrl+J)"
            aria-label="Chat with Dhrubo"
          >
            <img src={personalInfo.avatar || '/dhrubo-profile.jpg'} alt="" className="nv-ai-avatar" />
            <kbd className="nv-kbd">⌘J</kbd>
          </button>

          <button
            id="nav-theme-btn"
            onClick={onToggleTheme}
            className="nv-btn"
            title={`Switch to ${isLight ? 'Dark' : 'Light'} Mode`}
            aria-label="Toggle Theme"
          >
            <i className={`fa-solid ${isLight ? 'fa-moon' : 'fa-sun'}`} aria-hidden="true"></i>
          </button>

          <a
            id="nav-cta"
            href="#contact"
            onClick={(e) => handleNavClick(e, { href: '#contact' })}
            className="nv-cta"
          >
            <span>Let's Talk</span>
            <i className="fa-solid fa-arrow-right" aria-hidden="true"></i>
          </a>
        </div>
      </header>
    </>
  );
}
