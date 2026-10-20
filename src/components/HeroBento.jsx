import React, { useState, useEffect } from 'react';
import { personalInfo } from '../data/portfolioData';
import Logo from './Logo';

export default function HeroBento({ onCopyEmail, onOpenCmd }) {
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState('');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Dhaka is GMT+6
      const options = { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(now));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    if (onCopyEmail) onCopyEmail('Email copied to clipboard: ' + personalInfo.email);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="hero" className="hero-bento-section">
      <div className="container">
        {/* Bento Grid */}
        <div className="bento-grid">
          {/* Main Profile & Bio Card (Spans 2 cols, 2 rows on desktop) */}
          <div className="bento-card bento-card-main">
            <div className="bento-status-pill">
              <span className="pulse-dot"></span>
              <span>{personalInfo.status}</span>
            </div>

            <div className="bento-hero-header">
              <div className="bento-avatar-wrapper">
                <Logo size={52} />
              </div>
              <div className="bento-title-group">
                <h1 className="bento-hero-title">
                  Hi, I'm <span className="gradient-text">{personalInfo.name}</span>.
                </h1>
                <p className="bento-hero-subtitle">{personalInfo.role}</p>
              </div>
            </div>

            <p className="bento-hero-desc">
              Full-Stack Software Engineer & Computational Researcher with{' '}
              <strong style={{ color: 'var(--accent-dark)' }}>50+ shipped projects</strong>.
              I engineer scalable React/Next.js web applications, resilient backend microservices, and high-performance scientific simulations.
            </p>

            <div className="bento-cta-row">
              <a href="#experience" className="btn-primary">
                <span>View Experience</span>
                <i className="fa-solid fa-briefcase"></i>
              </a>

              <a href="#projects" className="btn-secondary">
                <span>Featured Projects</span>
                <i className="fa-solid fa-layer-group"></i>
              </a>

              <button
                onClick={handleCopy}
                className="btn-icon-copy"
                title="Copy email address"
                aria-label="Copy email"
              >
                <i className={`fa-solid ${copied ? 'fa-check' : 'fa-envelope'}`}></i>
              </button>

              <button
                onClick={onOpenCmd}
                className="btn-cmd-quick"
                title="Open Command Palette (⌘K)"
              >
                <i className="fa-solid fa-magnifying-glass"></i>
                <span>Quick Search</span>
                <kbd>⌘K</kbd>
              </button>
            </div>

            {/* Social Links */}
            <div className="bento-socials-row">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-social-link"
              >
                <i className="fa-brands fa-github"></i>
                <span>GitHub</span>
              </a>

              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-social-link"
              >
                <i className="fa-brands fa-linkedin" style={{ color: '#0a66c2' }}></i>
                <span>LinkedIn</span>
              </a>

              <a
                href={personalInfo.socials.peerlist}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-social-link"
              >
                <i className="fa-solid fa-p" style={{ color: '#00aa45' }}></i>
                <span>Peerlist</span>
              </a>

              <a
                href={personalInfo.socials.facebook}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-social-link"
                title="Backbencher Chemist Facebook Channel"
              >
                <i className="fa-brands fa-facebook" style={{ color: '#1877f2' }}></i>
                <span>Backbencher Chemist</span>
              </a>

              <a
                href={personalInfo.socials.youtube}
                target="_blank"
                rel="noopener noreferrer"
                className="bento-social-link"
                title="YouTube Channel (@randomdhrubo)"
              >
                <i className="fa-brands fa-youtube" style={{ color: '#ff0000' }}></i>
                <span>YouTube</span>
              </a>
            </div>
          </div>

          {/* Location & Timezone Card */}
          <div className="bento-card bento-card-location">
            <div className="bento-card-header-icon">
              <i className="fa-solid fa-location-dot"></i>
              <span className="bento-card-tag">Dhaka, Bangladesh</span>
            </div>
            <div className="bento-time-display">
              <span className="bento-time-clock">{localTime || 'GMT+6'}</span>
              <span className="bento-time-label">Local Time (GMT+6)</span>
            </div>
            <div className="bento-remote-badge">
              <i className="fa-solid fa-globe"></i>
              <span>Available for Worldwide Remote</span>
            </div>
          </div>

          {/* Quick Stats Grid Card */}
          <div className="bento-card bento-card-stats">
            <div className="bento-stats-grid">
              {personalInfo.stats.map((stat, idx) => (
                <div key={idx} className="bento-stat-item">
                  <span className="bento-stat-val">{stat.value}</span>
                  <span className="bento-stat-lbl">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Core Arsenal Card */}
          <div className="bento-card bento-card-stack">
            <div className="bento-card-header-icon">
              <i className="fa-solid fa-bolt"></i>
              <span className="bento-card-tag">Primary Arsenal</span>
            </div>
            <div className="bento-tech-cloud">
              <span className="bento-tech-pill"><i className="fa-brands fa-react" style={{ color: '#059669' }}></i> React</span>
              <span className="bento-tech-pill"><i className="fa-solid fa-n" style={{ color: '#064e3b' }}></i> Next.js</span>
              <span className="bento-tech-pill"><i className="fa-solid fa-code" style={{ color: '#2563eb' }}></i> TypeScript</span>
              <span className="bento-tech-pill"><i className="fa-brands fa-node" style={{ color: '#16a34a' }}></i> Node.js</span>
              <span className="bento-tech-pill"><i className="fa-brands fa-python" style={{ color: '#0d9488' }}></i> Python</span>
              <span className="bento-tech-pill"><i className="fa-solid fa-chart-line" style={{ color: '#7c3aed' }}></i> Monte Carlo</span>
              <span className="bento-tech-pill"><i className="fa-solid fa-atom" style={{ color: '#0284c7' }}></i> DFT / ORCA</span>
              <span className="bento-tech-pill"><i className="fa-brands fa-docker" style={{ color: '#0284c7' }}></i> Docker</span>
              <span className="bento-tech-pill"><i className="fa-solid fa-spider" style={{ color: '#059669' }}></i> Web Crawling</span>
            </div>
          </div>

          {/* Interactive Lab Link Card */}
          <div className="bento-card bento-card-lab">
            <div className="bento-lab-content">
              <div className="bento-lab-badge">
                <i className="fa-solid fa-flask-vial"></i>
                <span>Interactive Playground</span>
              </div>
              <h3 className="bento-lab-title">Live Simulator & Scientific Lab</h3>
              <p className="bento-lab-desc">
                Explore real-time headless crawling pipelines and Monte Carlo stochastic uncertainty simulations right in your browser.
              </p>
              <a href="#playground" className="btn-lab-jump">
                <span>Launch Simulator</span>
                <i className="fa-solid fa-arrow-right"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
