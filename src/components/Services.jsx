import React from 'react';
import { ArrowUpRight, Code2, Workflow, ServerCog, FlaskConical, Handshake } from 'lucide-react';
import { servicesData } from '../data/portfolioData';
import '../styles/services.css';

const serviceIcons = [Code2, Workflow, ServerCog, FlaskConical];
const serviceColors = ['mint', 'violet', 'blue', 'peach'];

export default function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <Handshake size={15} aria-hidden="true" />
            <span>06 / Working together</span>
          </div>
          <h2 className="section-title">
            Let’s build <span className="gradient-text">what’s next.</span>
          </h2>
          <p className="section-subtitle">
            Your idea. A clear path to something real.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {servicesData.map((service, idx) => {
            const Icon = serviceIcons[idx] || Code2;
            return <article key={service.title} className={`service-card service-card--${serviceColors[idx] || 'mint'}`}>
              <div className="service-art" aria-hidden="true">
                <span className="service-orbit service-orbit--outer" /><span className="service-orbit service-orbit--inner" />
                <span className="service-art-line" /><span className="service-art-node service-art-node--one" /><span className="service-art-node service-art-node--two" />
                <span className="service-icon-box"><Icon size={38} strokeWidth={1.4} /></span>
                <span className="service-index">0{idx + 1}</span>
              </div>
              <h3 className="service-title">{service.shortTitle}</h3>
              <p className="service-desc">{service.summary}</p>
              <a href="#contact" className="service-next" aria-label={`Let’s talk about ${service.title}`}>Let’s talk <ArrowUpRight size={18} aria-hidden="true" /></a>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}
