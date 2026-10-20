import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({
  currentTheme,
  currentView,
  onToggleTheme,
  onOpenCmd,
  onNavigateToAllProjects,
  onNavigateToHome
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (currentView === 'all-projects') {
      setActiveSection('all-projects');
      return;
    }

    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const scrollPos = window.scrollY + 180;
      const sections = ['contact', 'skills', 'projects', 'experience'];

      let found = '';
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
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentView]);

  const navLinks = [
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleNavClick = (e, link) => {
    setMobileMenuOpen(false);

    if (currentView === 'all-projects') {
      e.preventDefault();
      onNavigateToHome(link.href);
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    onNavigateToHome('#hero');
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar-container">
          {/* Brand */}
          <a href="#hero" onClick={handleBrandClick} className="nav-brand">
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
                  onClick={(e) => handleNavClick(e, link)}
                  className={`nav-link ${(currentView === 'all-projects' ? link.id === 'projects' : activeSection === link.id) ? 'active' : ''}`}
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
              title={`Switch to ${currentTheme === 'light' ? 'Dark mode' : 'Light mode'}`}
              aria-label="Toggle theme"
            >
              <i className={`fa-solid ${currentTheme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
            </button>

            <a
              href="#contact"
              onClick={(e) => {
                if (currentView === 'all-projects') {
                  e.preventDefault();
                  onNavigateToHome('#contact');
                }
              }}
              className="btn-hire"
            >
              <span>Let's Talk</span>
              <i className="fa-solid fa-arrow-right"></i>
            </a>

            {/* Mobile Hamburger Toggle */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="mobile-toggle-btn"
              aria-label="Toggle menu"
            >
              <i className={`fa-solid ${mobileMenuOpen ? 'fa-xmark' : 'fa-bars'}`}></i>
            </button>
          </div>
        </nav>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div className="mobile-menu">
            <ul className="mobile-nav-links">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link)}
                    className={`mobile-nav-link ${(currentView === 'all-projects' ? link.id === 'projects' : activeSection === link.id) ? 'active' : ''}`}
                  >
                    {link.name}
                  </a>
                </li>
              ))}
              <li style={{ marginTop: '12px' }}>
                <a
                  href="#contact"
                  onClick={(e) => {
                    setMobileMenuOpen(false);
                    if (currentView === 'all-projects') {
                      e.preventDefault();
                      onNavigateToHome('#contact');
                    }
                  }}
                  className="btn-primary"
                  style={{ width: '100%', justifyContent: 'center' }}
                >
                  <span>Let's Talk</span>
                  <i className="fa-solid fa-arrow-right"></i>
                </a>
              </li>
            </ul>
          </div>
        )}
      </div>
    </header>
  );
}
