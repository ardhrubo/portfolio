import React, { useState } from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Contact({ onShowToast }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    projectType: 'Full-Stack Web App',
    message: '',
  });

  const [copiedEmail, setCopiedEmail] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopyEmail = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalInfo.email);
    setCopiedEmail(true);
    if (onShowToast) onShowToast('Email copied: ' + personalInfo.email);
    setTimeout(() => setCopiedEmail(false), 2500);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      if (onShowToast) onShowToast('Please fill out all required fields.');
      return;
    }

    const subject = encodeURIComponent(`[Portfolio Inquiry] ${formData.projectType} - ${formData.name}`);
    const body = encodeURIComponent(
      `Hi Dhrubo,\n\nName: ${formData.name}\nEmail: ${formData.email}\nProject Type: ${formData.projectType}\n\nMessage:\n${formData.message}\n`
    );

    // Trigger user mail client
    window.location.href = `mailto:${personalInfo.email}?subject=${subject}&body=${body}`;

    setSubmitted(true);
    if (onShowToast) onShowToast('Message prepared! Opening your mail client...');
  };

  return (
    <section id="contact" className="section contact-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-paper-plane"></i>
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title">
            Let's Collaborate on Your <span className="gradient-text">Next Big Project</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind, need automated data workflows, or looking to add a dedicated engineer to your team?
            I'm always open to discussing new opportunities.
          </p>
        </div>

        {/* Contact Grid */}
        <div className="contact-grid">
          {/* Left Column: Direct Info Cards */}
          <div className="contact-info-col">
            <div className="contact-card-box">
              <h3 style={{ fontSize: '1.25rem' }}>Direct Reachout</h3>
              <p style={{ fontSize: '0.92rem', color: 'var(--text-secondary)' }}>
                Feel free to email me directly or connect on LinkedIn and GitHub. I typically respond within 24 hours.
              </p>

              {/* Email Link */}
              <a href={`mailto:${personalInfo.email}`} onClick={handleCopyEmail} className="contact-item-link">
                <div className="contact-icon-pill">
                  <i className="fa-solid fa-envelope"></i>
                </div>
                <div className="contact-details">
                  <span className="contact-label">Email Address</span>
                  <span className="contact-value">{personalInfo.email}</span>
                </div>
                <div className="contact-value-copy" title="Click to copy">
                  <i className={`fa-solid ${copiedEmail ? 'fa-check' : 'fa-copy'}`}></i>
                </div>
              </a>

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
                <div className="contact-icon-pill" style={{ color: '#10b981', background: 'rgba(16, 185, 129, 0.1)' }}>
                  <i className="fa-solid fa-circle-check"></i>
                </div>
                <div className="contact-details">
                  <span className="contact-label">Current Availability</span>
                  <span className="contact-value" style={{ color: '#34d399' }}>Open for Work</span>
                  <span style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                    Full-time roles & select contracts
                  </span>
                </div>
              </div>
            </div>

            {/* Socials Box */}
            <div className="contact-card-box">
              <h4 style={{ fontSize: '1.05rem', color: 'var(--text-primary)' }}>Find Me On The Web</h4>
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

          {/* Right Column: Contact Form */}
          <div className="contact-form-box">
            <h3 className="form-title">Send a Direct Message</h3>
            <p className="form-subtitle">Fill out the quick form below to launch your email client with your message.</p>

            {submitted && (
              <div className="form-status-msg success" style={{ marginBottom: '20px' }}>
                <i className="fa-solid fa-circle-check"></i>
                <span>Thank you! Your email client has been launched with your drafted message.</span>
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
                    placeholder="e.g. Sarah Jenkins"
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
                    placeholder="sarah@company.com"
                    className="form-input"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="form-group">
                <label htmlFor="projectType" className="form-label">
                  Project Type / Topic
                </label>
                <select
                  id="projectType"
                  name="projectType"
                  className="form-select"
                  value={formData.projectType}
                  onChange={handleChange}
                >
                  <option value="Full-Stack Web App">Full-Stack Web Application (React / Next.js)</option>
                  <option value="Web Scraping & Automation">Web Automation & Scraping (Puppeteer)</option>
                  <option value="Backend API & Docker">Backend API & Containerization</option>
                  <option value="Scientific Research / Modeling">Scientific Computing & Modeling</option>
                  <option value="Job / Contract Opportunity">Full-Time / Contract Opportunity</option>
                  <option value="General Question">General Inquiry / Consultation</option>
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="message" className="form-label">
                  Project Details or Message *
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  placeholder="Tell me a bit about your timeline, goals, or requirements..."
                  className="form-textarea"
                  value={formData.message}
                  onChange={handleChange}
                ></textarea>
              </div>

              <button type="submit" className="btn-submit">
                <span>Send Inquiry</span>
                <i className="fa-solid fa-paper-plane"></i>
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
