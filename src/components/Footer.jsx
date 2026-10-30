import React from 'react';
import { Mail, ArrowUp, Globe } from 'lucide-react';
import { Github, Linkedin, Facebook, Youtube } from './ui/BrandIcons';
import { personalInfo } from '../data/portfolioData';
import Logo from './Logo';

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
              <Logo size={36} />
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
                <Github size={17} />
              </a>
              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="LinkedIn Profile"
                aria-label="LinkedIn Profile"
              >
                <Linkedin size={17} />
              </a>
              <a
                href={personalInfo.socials.peerlist}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="Peerlist Profile"
                aria-label="Peerlist Profile"
              >
                <Globe size={16} />
              </a>
              <a
                href={personalInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="Backbencher Chemist Facebook Channel"
                aria-label="Backbencher Chemist Facebook Channel"
              >
                <Facebook size={16} />
              </a>
              <a
                href={personalInfo.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-btn"
                title="YouTube Channel (@randomdhrubo)"
                aria-label="YouTube Channel"
              >
                <Youtube size={16} />
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="footer-social-btn"
                title="Send Email"
                aria-label="Send Email"
              >
                <Mail size={16} />
              </a>
            </div>
          </div>

          <div className="footer-nav">
            <a href="#hero" onClick={(e) => handleLinkClick(e, '#hero')} className="footer-nav-link">Overview</a>
            <a href="#projects" onClick={(e) => handleLinkClick(e, '#projects')} className="footer-nav-link">Projects</a>
            <a href="#experience" onClick={(e) => handleLinkClick(e, '#experience')} className="footer-nav-link">Experience</a>
            <a href="#skills" onClick={(e) => handleLinkClick(e, '#skills')} className="footer-nav-link">Tech stack</a>
            <a href="#strategy" onClick={(e) => handleLinkClick(e, '#strategy')} className="footer-nav-link">Approach</a>
            <a href="#simulation-lab" onClick={(e) => handleLinkClick(e, '#simulation-lab')} className="footer-nav-link">3D playground</a>
            <a href="#services" onClick={(e) => handleLinkClick(e, '#services')} className="footer-nav-link">Services</a>
            <a href="#contact" onClick={(e) => handleLinkClick(e, '#contact')} className="footer-nav-link">Contact</a>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            &copy; {new Date().getFullYear()} {personalInfo.fullName}. All rights reserved. Crafted with React, Vite &amp; Modern CSS.
          </div>

          <button onClick={scrollToTop} className="btn-scroll-top" aria-label="Scroll to top of page">
            <span>Back to top</span>
            <ArrowUp size={14} aria-hidden="true" />
          </button>
        </div>
      </div>
    </footer>
  );
}
