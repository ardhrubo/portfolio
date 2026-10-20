import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Navbar({ currentTheme, onToggleTheme }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);

      const sections = ['hero', 'strategy', 'playground', 'projects', 'experience', 'skills', 'services', 'contact'];
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
    { name: 'Strategy', href: '#strategy', id: 'strategy' },
    { name: 'Simulator', href: '#playground', id: 'playground' },
    { name: 'Projects', href: '#projects', id: 'projects' },
    { name: 'Experience', href: '#experience', id: 'experience' },
    { name: 'Skills', href: '#skills', id: 'skills' },
    { name: 'Services', href: '#services', id: 'services' },
    { name: 'Contact', href: '#contact', id: 'contact' },
  ];

  const handleLinkClick = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className={`navbar-wrapper ${scrolled ? 'scrolled' : ''}`}>
      <div className="container">
        <nav className="navbar-container">
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

          {/* CTA & Theme Switcher */}
          <div className="nav-actions">
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
