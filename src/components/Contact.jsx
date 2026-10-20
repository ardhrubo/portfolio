import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-Time Role',
    message: 'Hi Dhrubo, I would like to discuss an opportunity...',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const topicPresets = [
    { label: 'Full-Time Role', text: 'Hi Dhrubo, we are interested in discussing a full-time software engineering role with our team...' },
    { label: 'Web Application', text: 'Hi Dhrubo, I need a modern, high-performance web application built with React/Next.js...' },
    { label: 'Puppeteer Scraping', text: 'Hi Dhrubo, we need a reliable, high-concurrency web scraping and data pipeline engineered...' },
    { label: 'Scientific Modeling', text: 'Hi Dhrubo, we would like to collaborate on computational research or data modeling...' },
    { label: 'General Inquiry', text: 'Hi Dhrubo, I wanted to connect and discuss...' },
  ];

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    if (onShowToast) onShowToast('Email address copied: ' + personalInfo.email);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handlePresetClick = (preset) => {
    setFormData((prev) => ({
      ...prev,
      projectType: preset.label,
      message: preset.text,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      if (onShowToast) onShowToast('Please fill out all fields.');
      return;
    }

    const subject = encodeURIComponent(`[Inquiry] ${formData.projectType} - ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Dhrubo,\n\nName: ${formData.name}\nEmail: ${formData.email}\nTopic: ${formData.projectType}\n\nMessage:\n${formData.message}\n`
    );

    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;
    setSubmitted(true);
    if (onShowToast) onShowToast('Launching your mail client with prefilled draft...');
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-paper-plane"></i>
            <span>Start a Conversation</span>
          </div>
          <h2 className="section-title">
            Let's Build Something <span className="gradient-text">Exceptional</span>
          </h2>
          <p className="section-subtitle">
            Looking for a dedicated software engineer, need automated data workflows, or have an exciting product idea?
            Pick a topic below to get in touch directly.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info Cards */}
          <div className="contact-info-col">
            <div className="contact-card-box">
              <h3 style={{ fontSize: '1.25rem' }}>Direct Reachout</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Feel free to email me directly or connect on LinkedIn. I am based in Dhaka, Bangladesh (GMT+6) and work with international teams worldwide.
              </p>

              {/* Email Link with Copy feedback */}
              <div onClick={handleCopyEmail} className="contact-item-link" title="Click to copy email">
                <div className="contact-icon-pill">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <span className="contact-label">Email Address (Click to copy)</span>
                  <span className="contact-value">{personalInfo.email}</span>
                </div>
                <div className="contact-value-copy">
                  <i className={`fa-solid ${copiedEmail ? 'fa-check' : 'fa-copy'}`}></i>
                </div>
              </div>

              {/* Location */}
              <div className="contact-item-link" style={{ cursor: 'default' }}>
                <div className="contact-icon-pill">
                  <i className="fa-solid fa-location-dot"></i>
                </div>
                <div className="contact-details">
                  <span className="contact-label">Location & Timezone</span>
                  <span className="contact-value">{personalInfo.location}</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>{personalInfo.timezone}</span>
                </div>
              </div>

              {/* Availability Status */}
              <div className="contact-item-link" style={{ cursor: 'default' }}>
                <div className="contact-icon-pill" style={{ color: 'var(--accent-primary)', background: 'var(--accent-light)' }}>
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <div className="contact-details">
                  <span className="contact-label">Current Status</span>
                  <span className="contact-value" style={{ color: 'var(--accent-primary)' }}>Open for Opportunities</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Full-Time & Select Contracts</span>
                </div>
              </div>
            </div>

            {/* Socials Box */}
            <div className="contact-card-box">
              <h4 style={{ fontSize: '1rem', color: 'var(--text-primary)' }}>Professional Profiles</h4>
              <div className="socials-row" style={{ marginTop: 0 }}>
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
          </div>

          {/* Right Column: Interactive Quick-Inquiry Composer */}
          <div className="contact-form-box">
            <h3 className="form-title">Send a Direct Message</h3>
            <p className="form-subtitle">Select a topic below to auto-populate your inquiry template.</p>

            {/* Quick Topic Chips */}
            <div className="contact-topic-chips">
              {topicPresets.map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => handlePresetClick(preset)}
                  className={`topic-chip ${formData.projectType === preset.label ? 'active' : ''}`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {submitted && (
              <div className="form-status-msg success" style={{ marginBottom: '16px' }}>
                <i className="fa-solid fa-circle-check"></i>
                <span>Your default email client has been launched with your drafted message!</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="contact-form">
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Your Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    placeholder="e.g. Alex Henderson"
                    className="form-input"
                    value={formData.name}
                    onChange={handleChange}
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Your Email *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    placeholder="alex@company.com"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Message Details *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={4}
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn-submit">
                <span>Launch Email Client</span>
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
