import React from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Footer({ currentView, onNavigateToAllProjects, onNavigateToHome }) {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleLinkClick = (e, targetHash) => {
    if (targetHash === '#all-projects') {
      e.preventDefault();
      if (onNavigateToAllProjects) onNavigateToAllProjects();
    } else {
      if (currentView === 'all-projects') {
        e.preventDefault();
        if (onNavigateToHome) onNavigateToHome(targetHash);
      }
    }
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a
              href="#hero"
              onClick={(e) => {
                e.preventDefault();
                if (onNavigateToHome) onNavigateToHome('#hero');
              }}
              className="nav-brand"
              style={{ marginBottom: '8px' }}
            >
              <div className="relative size-10 shrink-0">
                <img
                  src={personalInfo.avatar || '/dhrubo-profile.jpg'}
                  alt={personalInfo.name}
                  className="size-full rounded-xl object-cover border border-emerald-500/40 shadow-xs"
                />
              </div>
              <div className="brand-text">
                <span className="brand-name">{personalInfo.name}</span>
                <span className="brand-role">Software Engineer</span>
              </div>
            </a>
            <p className="footer-tagline">
              Engineering robust web platforms, automated scraping pipelines, and computational modeling systems.
            </p>

            <div className="footer-socials">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="GitHub Profile"
                aria-label="GitHub Profile"
              >
                <i className="fa-brands fa-github"></i>
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <i className="fa-brands fa-linkedin"></i>
              </a>
              <a
                href={personalInfo.socials.peerlist}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="Peerlist Profile"
                aria-label="Peerlist Profile"
              >
                <i className="fa-solid fa-p"></i>
              </a>
              <a
                href={personalInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="Backbencher Chemist Facebook Channel"
                aria-label="Backbencher Chemist Facebook Channel"
              >
                <i className="fa-brands fa-facebook"></i>
              </a>
              <a
                href={personalInfo.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="YouTube Channel (@randomdhrubo)"
                aria-label="YouTube Channel"
              >
                <i className="fa-brands fa-youtube"></i>
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="footer-social-btn"
                title="Send Email"
                aria-label="Send Email"
              >
                <i className="fa-solid fa-envelope"></i>
              </a>
            </div>
          </div>

          <div className="footer-nav">
            <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="footer-nav-link">About</a>
            <a href="#experience" onClick={(e) => handleLinkClick(e, '#experience')} className="footer-nav-link">Experience</a>
            <a href="#projects" onClick={(e) => handleLinkClick(e, '#projects')} className="footer-nav-link">Projects</a>
            <a href="#skills" onClick={(e) => handleLinkClick(e, '#skills')} className="footer-nav-link">Skills</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="footer-nav-link">Contact</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved. Crafted with React, Vite & Modern CSS.
          </div>

          <button onClick={scrollToTop} className="btn-scroll-top" aria-label="Scroll to top of page">
            <span>Back to top</span>
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </div>
      </div>
    </footer>
  );
}
