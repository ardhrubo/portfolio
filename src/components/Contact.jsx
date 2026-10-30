import React, { useState } from 'react';
import {
  Mail,
  Copy,
  Check,
  MapPin,
  CheckCircle2,
  ArrowUpRight,
  Send,
  Globe,
} from 'lucide-react';
import { Github, Linkedin, Facebook, Youtube } from './ui/BrandIcons';
import Button from './ui/Button';
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

  const handleCopyEmail = async (e) => {
    e.preventDefault();
    try { await navigator.clipboard.writeText(personalInfo.email); }
    catch { onShowToast?.(`Email me at ${personalInfo.email}`); return; }
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
            <Mail size={15} aria-hidden="true" />
            <span>07 / Get in touch</span>
          </div>
          <h2 className="section-title">
            Good things start with <span className="gradient-text">a conversation.</span>
          </h2>
          <p className="section-subtitle">
            Have a project, role, or collaboration in mind? Pick a topic below to reach out directly.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Column: Direct Info Cards */}
          <div className="contact-info-col">
            <div className="contact-card-box">
              <div className="contact-author-header">
                <div className="contact-author-photo-wrapper">
                  <img src={personalInfo.avatar || "/dhrubo-profile.jpg"} alt={personalInfo.name} className="contact-author-photo" />
                  <span className="contact-author-status" title="Available"></span>
                </div>
                <div>
                  <h3 className="contact-author-name">{personalInfo.name}</h3>
                  <span className="contact-author-title">Full-Stack Engineer & Researcher</span>
                </div>
              </div>
              <p className="contact-card-intro">
                Feel free to email me directly or connect on LinkedIn. I am based in Dhaka, Bangladesh (GMT+6) and work with international teams worldwide.
              </p>

              {/* Email Link with Copy feedback */}
              <button type="button" onClick={handleCopyEmail} className="contact-item-link" title="Copy email address">
                <div className="contact-icon-pill">
                  <Mail size={18} aria-hidden="true" />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Email Address (Click to copy)</span>
                  <span className="contact-value">{personalInfo.email}</span>
                </div>
                <div className="contact-value-copy">
                  {copiedEmail ? <Check size={16} aria-hidden="true" /> : <Copy size={16} aria-hidden="true" />}
                </div>
              </button>

              {/* Location */}
              <div className="contact-item-link contact-item-link--static">
                <div className="contact-icon-pill">
                  <MapPin size={18} aria-hidden="true" />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Location & Timezone</span>
                  <span className="contact-value">{personalInfo.location}</span>
                  <span className="contact-subdetail">{personalInfo.timezone}</span>
                </div>
              </div>

              {/* Availability Status */}
              <div className="contact-item-link contact-item-link--static">
                <div className="contact-icon-pill contact-icon-pill--status">
                  <CheckCircle2 size={18} aria-hidden="true" />
                </div>
                <div className="contact-details">
                  <span className="contact-label">Current Status</span>
                  <span className="contact-value contact-value--open">Open for Opportunities</span>
                  <span className="contact-subdetail">Full-Time & Select Contracts</span>
                </div>
              </div>

              {/* Professional Profiles */}
              <div className="contact-socials-group">
                <span className="contact-socials-title">Professional Profiles & Code</span>
                <div className="contact-socials-grid">
                  <a
                    href={personalInfo.socials.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-card"
                    title="View GitHub Profile"
                  >
                    <div className="contact-social-card-icon github">
                      <Github size={17} />
                    </div>
                    <div className="contact-social-card-info">
                      <span className="contact-social-card-name">GitHub</span>
                      <span className="contact-social-card-handle">@ardhrubo</span>
                    </div>
                    <ArrowUpRight size={14} className="contact-social-card-arrow" aria-hidden="true" />
                  </a>

                  <a
                    href={personalInfo.socials.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-card"
                    title="Connect on LinkedIn"
                  >
                    <div className="contact-social-card-icon linkedin">
                      <Linkedin size={17} />
                    </div>
                    <div className="contact-social-card-info">
                      <span className="contact-social-card-name">LinkedIn</span>
                      <span className="contact-social-card-handle">/in/ardhrubo</span>
                    </div>
                    <ArrowUpRight size={14} className="contact-social-card-arrow" aria-hidden="true" />
                  </a>

                  <a
                    href={personalInfo.socials.peerlist}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-card"
                    title="View Peerlist Profile"
                  >
                    <div className="contact-social-card-icon peerlist">
                      <Globe size={16} />
                    </div>
                    <div className="contact-social-card-info">
                      <span className="contact-social-card-name">Peerlist</span>
                      <span className="contact-social-card-handle">@ardhrubo</span>
                    </div>
                    <ArrowUpRight size={14} className="contact-social-card-arrow" aria-hidden="true" />
                  </a>

                  <a
                    href={personalInfo.socials.facebook}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-card"
                    title="Follow Backbencher Chemist Channel"
                  >
                    <div className="contact-social-card-icon facebook">
                      <Facebook size={16} />
                    </div>
                    <div className="contact-social-card-info">
                      <span className="contact-social-card-name">Facebook Channel</span>
                      <span className="contact-social-card-handle">@backbencherchemist</span>
                    </div>
                    <ArrowUpRight size={14} className="contact-social-card-arrow" aria-hidden="true" />
                  </a>

                  <a
                    href={personalInfo.socials.youtube}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="contact-social-card"
                    title="Watch on YouTube"
                  >
                    <div className="contact-social-card-icon youtube">
                      <Youtube size={16} />
                    </div>
                    <div className="contact-social-card-info">
                      <span className="contact-social-card-name">YouTube Channel</span>
                      <span className="contact-social-card-handle">@randomdhrubo</span>
                    </div>
                    <ArrowUpRight size={14} className="contact-social-card-arrow" aria-hidden="true" />
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Quick-Inquiry Composer */}
          <div className="contact-form-box">
            <h3 className="form-title">Start a conversation</h3>
            <p className="form-subtitle">Prepare a draft to send from your email app, or copy my address to contact me directly.</p>

            {/* Quick Topic Chips */}
            <div className="contact-topic-chips">
              {topicPresets.map((preset, i) => (
                <button
                  key={i}
                  type="button"
                  aria-pressed={formData.projectType === preset.label}
                  onClick={() => handlePresetClick(preset)}
                  className={`topic-chip ${formData.projectType === preset.label ? 'active' : ''}`}
                >
                  {preset.label}
                </button>
              ))}
            </div>

            {submitted && (
              <div className="form-status-msg success">
                <CheckCircle2 size={16} aria-hidden="true" />
                <span>Your draft is ready. If your email app did not open, copy my address and send your message directly.</span>
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

              <Button type="submit" variant="primary" className="btn-submit">
                <span>Launch Email Client</span>
                <Send size={16} aria-hidden="true" />
              </Button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
