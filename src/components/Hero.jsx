import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Hero({ onCopyEmail }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    if (onCopyEmail) onCopyEmail('Email address copied to clipboard!');
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="hero" className="hero-section">
      <div className="container">
        <div className="hero-grid">
          {/* Left Column: Headline, Bio & CTAs */}
          <div className="hero-content">
            <div className="status-pill">
              <span className="pulse-dot"></span>
              <span>{personalInfo.status}</span>
            </div>

            <h1 className="hero-title">
              Hi, I'm <span className="gradient-text">{personalInfo.name}</span>.<br />
              Building <span className="gradient-text-silver">Modern Web Apps</span> & Intelligent Automations.
            </h1>

            <p className="hero-description">
              Full-Stack Software Engineer & Computational Researcher with{' '}
              <strong style={{ color: 'var(--text-primary)' }}>50+ shipped projects</strong>.
              Specializing in high-performance React & Node applications, distributed web automation with Puppeteer,
              and scientific risk modeling.
            </p>

            <div className="hero-cta-group">
              <a href="#projects" className="btn-primary">
                <span>Explore Works</span>
                <i className="fa-solid fa-arrow-down"></i>
              </a>

              <a href="#contact" className="btn-secondary">
                <span>Let's Talk</span>
                <i className="fa-regular fa-paper-plane"></i>
              </a>

              <button
                onClick={handleCopy}
                className="btn-icon-copy"
                title="Copy email to clipboard"
                aria-label="Copy email"
              >
                <i className={`fa-solid ${copied ? 'fa-check' : 'fa-envelope'}`}></i>
              </button>
            </div>

            {/* Social Links Row */}
            <div className="socials-row">
              <a
                href={personalInfo.socials.github}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
              >
                <i className="fa-brands fa-github"></i>
                <span>GitHub</span>
              </a>

              <a
                href={personalInfo.socials.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
              >
                <i className="fa-brands fa-linkedin" style={{ color: '#0a66c2' }}></i>
                <span>LinkedIn</span>
              </a>

              <a
                href={personalInfo.socials.peerlist}
                target="_blank"
                rel="noopener noreferrer"
                className="social-pill"
              >
                <i className="fa-solid fa-p" style={{ color: '#00aa45' }}></i>
                <span>Peerlist</span>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Code Terminal Card */}
          <div className="hero-visual-card">
            <div className="card-topbar">
              <div className="card-dots">
                <span className="card-dot red"></span>
                <span className="card-dot yellow"></span>
                <span className="card-dot green"></span>
              </div>
              <span className="card-title">engineer.config.ts</span>
              <span className="card-badge">v3.0.0</span>
            </div>

            <div className="card-body">
              <div className="code-line">
                <span className="line-num">1</span>
                <div>
                  <span className="token-keyword">const</span>{' '}
                  <span className="token-function">developerProfile</span> = {'{'}
                </div>
              </div>

              <div className="code-line">
                <span className="line-num">2</span>
                <div style={{ paddingLeft: '16px' }}>
                  <span className="token-property">name</span>:{' '}
                  <span className="token-string">"Dhrubo"</span>,
                </div>
              </div>

              <div className="code-line">
                <span className="line-num">3</span>
                <div style={{ paddingLeft: '16px' }}>
                  <span className="token-property">role</span>:{' '}
                  <span className="token-string">"Full-Stack & Automation Engineer"</span>,
                </div>
              </div>

              <div className="code-line">
                <span className="line-num">4</span>
                <div style={{ paddingLeft: '16px' }}>
                  <span className="token-property">currentFocus</span>:{' '}
                  <span className="token-string">["React", "Node", "Puppeteer", "Monte Carlo"]</span>,
                </div>
              </div>

              <div className="code-line">
                <span className="line-num">5</span>
                <div style={{ paddingLeft: '16px' }}>
                  <span className="token-property">shippedProjects</span>:{' '}
                  <span className="token-number">50</span>,
                </div>
              </div>

              <div className="code-line">
                <span className="line-num">6</span>
                <div style={{ paddingLeft: '16px' }}>
                  <span className="token-property">openToOpportunities</span>:{' '}
                  <span className="token-keyword">true</span>
                </div>
              </div>

              <div className="code-line">
                <span className="line-num">7</span>
                <div>{'};'}</div>
              </div>

              <div className="terminal-interactive-preview">
                <div className="preview-header">
                  <span>Core Arsenal</span>
                  <span className="live-indicator">
                    <i className="fa-solid fa-circle" style={{ fontSize: '6px' }}></i> Active Stack
                  </span>
                </div>
                <div className="tech-chip-cloud">
                  <span className="tech-chip"><i className="fa-brands fa-react" style={{ color: '#38bdf8' }}></i> React</span>
                  <span className="tech-chip"><i className="fa-brands fa-node" style={{ color: '#34d399' }}></i> Node.js</span>
                  <span className="tech-chip"><i className="fa-brands fa-python" style={{ color: '#f59e0b' }}></i> Python</span>
                  <span className="tech-chip"><i className="fa-solid fa-spider" style={{ color: '#ec4899' }}></i> Puppeteer</span>
                  <span className="tech-chip"><i className="fa-brands fa-docker" style={{ color: '#0ea5e9' }}></i> Docker</span>
                  <span className="tech-chip"><i className="fa-brands fa-linux" style={{ color: '#fbbf24' }}></i> Linux</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
