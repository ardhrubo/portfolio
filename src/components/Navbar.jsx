import React, { useState, useEffect } from 'react';
import { personalInfo, projectsData } from '../data/portfolioData';

export default function Navbar({ currentTheme, onToggleTheme, onOpenCmd }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'flagship', 'projects', 'strategy', 'playground', 'experience', 'skills', 'contact'];
      const scrollPos = window.scrollY + 140;

      for (const section of sections) {
        const el = document.getElementById(section);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'About', href: '#hero', id: 'hero' },
    { name: 'Flagship', href: '#flagship', id: 'flagship' },
    { name: `Projects (${projectsData.length})`, href: '#projects', id: 'projects' },
    { name: 'Strategy', href: '#strategy', id: 'strategy' },
    { name: 'Simulator', href: '#playground', id: 'playground' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar-container">
          {/* Brand */}
          <a href="#hero" className="nav-brand">
            <div className="brand-badge">D</div>
            <div className="brand-text">
              <span className="brand-name">{personalInfo.name}</span>
              <span className="brand-role">Software Engineer</span>
            </div>
          </a>

          {/* Desktop Nav Links */}
          <ul className="nav-links">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className={`nav-link ${activeSection === link.id ? 'active' : ''}`}
                >
                  {link.name}
                </a>
              </li>
            ))}
          </ul>

          {/* Actions: Command Palette, Theme, Hire CTA */}
          <div className="nav-actions">
            {/* Quick Command Trigger */}
            <button
              onClick={onOpenCmd}
              className="nav-cmd-btn"
              title="Quick Search & Commands (⌘K)"
              aria-label="Open command palette"
            >
              <i className="fa-solid fa-magnifying-glass"></i>
              <span className="cmd-key-hint">⌘K</span>
            </button>

            {/* Theme Toggle Button */}
            <button
              onClick={onToggleTheme}
              className="theme-toggle-btn"
              title={`Switch to ${currentTheme === 'light' ? 'Dark Forest' : 'Greenish White'} mode`}
              aria-label="Toggle theme"
            >
              <i className={`fa-solid ${currentTheme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>

            <a href="#contact" className="btn-hire">
              <span>Let's Talk</span>
              <i className="fa-solid fa-arrow-right"></i>
            </a>

            <button
              className="mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle navigation menu"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>
          </div>
        </nav>
      </div>

      {/* Mobile Drawer */}
      <div className={`mobile-nav-drawer ${mobileMenuOpen ? 'open' : ''}`}>
        <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
          <button
            onClick={() => { setMobileMenuOpen(false); onOpenCmd(); }}
            className="btn-secondary"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <i className="fa-solid fa-magnifying-glass"></i>
            <span>Search Projects (⌘K)</span>
          </button>
        </div>

        {navLinks.map((link) => (
          <a
            key={link.id}
            href={link.href}
            onClick={handleLinkClick}
            className={`mobile-nav-link ${activeSection === link.id ? 'active' : ''}`}
          >
            {link.name}
          </a>
        ))}

        <div style={{ display: 'flex', gap: '12px', marginTop: '14px' }}>
          <button
            onClick={onToggleTheme}
            className="btn-secondary"
            style={{ flex: 1, justifyContent: 'center' }}
          >
            <i className={`fa-solid ${currentTheme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
            <span>{currentTheme === 'light' ? 'Dark Forest Mode' : 'Greenish White Mode'}</span>
          </button>
        </div>

        <a
          href="#contact"
          onClick={handleLinkClick}
          className="btn-primary"
          style={{ marginTop: '10px', justifyContent: 'center' }}
        >
          <span>Get in Touch</span>
          <i className="fa-solid fa-arrow-right"></i>
        </a>
      </div>
    </header>
  );
}
