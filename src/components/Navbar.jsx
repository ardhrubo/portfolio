import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import Logo from './Logo';

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
    { id: 'experience', name: 'Experience', href: '#experience', icon: 'fa-solid fa-briefcase', badge: 'Career' },
    { id: 'projects', name: 'Projects', href: '#projects', icon: 'fa-solid fa-layer-group', badge: '16 Works' },
    { id: 'skills', name: 'Skills', href: '#skills', icon: 'fa-solid fa-bolt', badge: 'Stack' },
    { id: 'contact', name: 'Contact', href: '#contact', icon: 'fa-solid fa-paper-plane', badge: 'Hire' },
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

  return (
    <>
      {/* ===================================================================
          1. Desktop Left Rail: Core Navigation Dock
          =================================================================== */}
      <aside className="desktop-left-nav" aria-label="Desktop Left Navigation">
        <div className="left-nav-card">
          {/* Brand Header */}
          <a href="#hero" onClick={handleBrandClick} className="left-brand-link">
            <div className="left-brand-avatar">
              <img src={personalInfo.avatar || "/dhrubo-profile.jpg"} alt={personalInfo.name} className="left-brand-photo" />
              <span className="left-avatar-status" title="Available for hire"></span>
            </div>
            <div className="left-brand-meta">
              <span className="left-brand-name">{personalInfo.name}</span>
              <span className="left-brand-role">Full-Stack & Research</span>
            </div>
          </a>

          {/* Nav List */}
          <div className="left-nav-group">
            <span className="left-nav-section-label">Navigation</span>
            <ul className="left-nav-links">
              {navItems.map((item) => {
                const isActive = currentView === 'all-projects' ? item.id === 'projects' : activeSection === item.id;
                return (
                  <li key={item.id}>
                    <a
                      href={item.href}
                      onClick={(e) => handleNavClick(e, item)}
                      className={`left-nav-link ${isActive ? 'active' : ''}`}
                    >
                      <div className="left-nav-icon">
                        <i className={item.icon}></i>
                      </div>
                      <span className="left-nav-title">{item.name}</span>
                      {item.badge && <span className="left-nav-badge">{item.badge}</span>}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Quick Meta Footer */}
          <div className="left-nav-footer">
            <div className="left-metric-badge">
              <span className="left-metric-pulse"></span>
              <span>50+ Projects &bull; 100k+ Runs</span>
            </div>
            <a
              href={personalInfo.socials.github}
              target="_blank"
              rel="noopener noreferrer"
              className="left-code-link"
              title="View GitHub @ardhrubo"
            >
              <span style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                <i className="fa-brands fa-github"></i>
                <span>ardhrubo</span>
              </span>
              <i className="fa-solid fa-arrow-up-right-from-square" style={{ fontSize: '0.65rem' }}></i>
            </a>
          </div>
        </div>
      </aside>

      {/* ===================================================================
          2. Desktop Right Rail: Actions, Tools, & Contact Dock
          =================================================================== */}
      <aside className="desktop-right-dock" aria-label="Desktop Right Utilities">
        <div className="right-dock-card">
          {/* Status & Local Time */}
          <div className="right-dock-header">
            <div className="right-status-badge">
              <span className="right-status-ping"></span>
              <span>Available for Hire</span>
            </div>
            <div className="right-clock-box">
              <span className="right-clock-time">{localTime || 'GMT+6'}</span>
              <span className="right-clock-label">Dhaka (GMT+6)</span>
            </div>
          </div>

          {/* Quick Tools */}
          <div className="right-dock-group">
            <span className="right-dock-label">Quick Tools</span>
            <div className="right-tools-col">
              <button
                onClick={onOpenCmd}
                className="right-tool-btn"
                title="Quick Search (⌘K)"
                aria-label="Open Command Search"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>Quick Search</span>
                <kbd>⌘K</kbd>
              </button>

              <button
                onClick={onOpenChat}
                className="right-tool-btn right-tool-ai-btn"
                title="Chat with Dhrubo (⌘J / Ctrl+J)"
                aria-label="Chat with Dhrubo"
              >
                <div className="right-tool-avatar-mini">
                  <img src={personalInfo.avatar || "/dhrubo-profile.jpg"} alt="Dhrubo" className="right-tool-avatar-img" />
                </div>
                <span>Chat with Me</span>
                <span className="right-dock-kbd">⌘J</span>
              </button>

              <button
                onClick={onToggleTheme}
                className="right-tool-btn"
                title={`Switch to ${currentTheme === 'light' ? 'Dark' : 'Light'} Mode`}
                aria-label="Toggle Theme"
              >
                <i className={`fa-solid ${currentTheme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
                <span>{currentTheme === 'light' ? 'Dark Mode' : 'Light Mode'}</span>
              </button>
            </div>
          </div>

          {/* Contact & Socials */}
          <div className="right-dock-footer">
            <a
              href="#contact"
              onClick={(e) => {
                if (currentView === 'all-projects') {
                  e.preventDefault();
                  onNavigateToHome('#contact');
                }
              }}
              className="right-btn-hire"
            >
              <span>Let's Talk</span>
              <i className="fa-solid fa-arrow-right"></i>
            </a>

            <div className="right-socials-row">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="right-social-link"
                title="GitHub"
                aria-label="GitHub Profile"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="right-social-link"
                title="LinkedIn"
                aria-label="LinkedIn Profile"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a
                href={personalInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="right-social-link"
                title="Backbencher Chemist (Facebook)"
                aria-label="Backbencher Chemist Facebook"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                href={personalInfo.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="right-social-link"
                title="YouTube Channel (@randomdhrubo)"
                aria-label="YouTube Channel"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="right-social-link"
                title="Email"
                aria-label="Send Email"
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </aside>

      {/* ===================================================================
          3. Mobile Top Bar (< 1024px) - Features Experience & Projects on Top!
          =================================================================== */}
      <header className="mobile-top-bar" aria-label="Mobile Top Header">
        <div className="mobile-top-left">
          <a href="#hero" onClick={handleBrandClick} className="mobile-top-brand">
            <img src={personalInfo.avatar || "/dhrubo-profile.jpg"} alt={personalInfo.name} className="mobile-top-avatar" />
            <span className="mobile-top-name">{personalInfo.name}</span>
          </a>
        </div>

        {/* Navigation on Top: Experience & Contact */}
        <div className="mobile-top-nav-pills">
          <a
            href="#experience"
            onClick={(e) => handleNavClick(e, { href: '#experience' })}
            className={`mobile-top-pill ${activeSection === 'experience' ? 'active' : ''}`}
          >
            <i className="fa-solid fa-briefcase"></i>
            <span>Experience</span>
          </a>
          <a
            href="#contact"
            onClick={(e) => handleNavClick(e, { href: '#contact' })}
            className={`mobile-top-pill mobile-top-pill-cta ${activeSection === 'contact' ? 'active' : ''}`}
          >
            <i className="fa-solid fa-paper-plane"></i>
            <span>Contact</span>
          </a>
        </div>

        {/* Actions: Search & Theme */}
        <div className="mobile-top-actions">
          <button
            onClick={onOpenCmd}
            className="mobile-top-icon-btn"
            title="Search (⌘K)"
            aria-label="Search"
          >
            <i className="fa-solid fa-magnifying-glass"></i>
          </button>
          <button
            onClick={onToggleTheme}
            className="mobile-top-icon-btn"
            title="Toggle Theme"
            aria-label="Toggle Theme"
          >
            <i className={`fa-solid ${currentTheme === 'light' ? 'fa-moon' : 'fa-sun'}`}></i>
          </button>
        </div>
      </header>

      {/* ===================================================================
          4. Mobile Bottom Bar (< 1024px) - Home, Projects, Skills
          =================================================================== */}
      <nav className="mobile-bottom-bar" aria-label="Mobile Bottom Tabs">
        <div className="mobile-bottom-inner">
          <a
            href="#hero"
            onClick={handleBrandClick}
            className={`mobile-bottom-tab ${activeSection === 'hero' ? 'active' : ''}`}
            aria-label="Home"
          >
            <i className="fa-solid fa-house"></i>
            <span>Home</span>
          </a>

          <a
            href="#projects"
            onClick={(e) => handleNavClick(e, { href: '#projects' })}
            className={`mobile-bottom-tab ${activeSection === 'projects' || currentView === 'all-projects' ? 'active' : ''}`}
            aria-label="Projects"
          >
            <i className="fa-solid fa-layer-group"></i>
            <span>Projects</span>
          </a>

          <a
            href="#skills"
            onClick={(e) => handleNavClick(e, { href: '#skills' })}
            className={`mobile-bottom-tab ${activeSection === 'skills' ? 'active' : ''}`}
            aria-label="Skills"
          >
            <i className="fa-solid fa-bolt"></i>
            <span>Skills</span>
          </a>
        </div>
      </nav>
    </>
  );
}
