import React from 'react';
import { ArrowUpRight, Code2, Workflow, ServerCog, FlaskConical } from 'lucide-react';
import { servicesData } from '../data/portfolioData';

const serviceIcons = [Code2, Workflow, ServerCog, FlaskConical];
const serviceColors = ['mint', 'violet', 'blue', 'peach'];

export default function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <span>06 / WORKING TOGETHER</span>
          </div>
          <h2 className="section-title">
            What can I help<br /><span className="gradient-text">you bring to life?</span>
          </h2>
          <p className="section-subtitle">
            Start with a product idea, a workflow that needs automating, or a research question. We can shape the right solution together.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {servicesData.map((service, idx) => {
            const Icon = serviceIcons[idx] || Code2;
            return <article key={service.title} className={`service-card service-card--${serviceColors[idx] || 'mint'}`}>
              <div className="service-card-top"><span className="service-icon-box"><Icon size={21} aria-hidden="true" /></span><span className="service-index">0{idx + 1}</span></div>
              <p className="service-kicker">{service.subtitle}</p>
              <h3 className="service-title">{service.title}</h3>
              <p className="service-desc">{service.description}</p>
              <ul className="service-points">{service.points.map((point) => <li className="service-point" key={point}><span className="service-check" aria-hidden="true">✓</span><span>{point}</span></li>)}</ul>
              <a href="#contact" className="service-next">Discuss this kind of work <ArrowUpRight size={16} aria-hidden="true" /></a>
            </article>;
          })}
        </div>
      </div>
    </section>
  );
}
