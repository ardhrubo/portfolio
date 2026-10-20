import React from 'react';
import { personalInfo, projectsData } from '../data/portfolioData';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="footer-wrapper">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <a href="#hero" className="nav-brand" style={{ marginBottom: '8px' }}>
              <div className="brand-badge">D</div>
              <div className="brand-text">
                <span className="brand-name">{personalInfo.name}</span>
                <span className="brand-role">Software Engineer</span>
              </div>
            </a>
            <p className="footer-tagline">
              Engineering robust web platforms, automated scraping pipelines, and computational modeling systems.
            </p>
          </div>

          <div className="footer-nav">
            <a href="#hero" className="footer-nav-link">About</a>
            <a href="#flagship" className="footer-nav-link">Flagship</a>
            <a href="#projects" className="footer-nav-link">Projects ({projectsData.length})</a>
            <a href="#strategy" className="footer-nav-link">Strategy</a>
            <a href="#playground" className="footer-nav-link">Simulator</a>
            <a href="#experience" className="footer-nav-link">Experience</a>
            <a href="#skills" className="footer-nav-link">Skills</a>
            <a href="#services" className="footer-nav-link">Services</a>
            <a href="#contact" className="footer-nav-link">Contact</a>
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
