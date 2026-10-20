import React from 'react';
import { servicesData } from '../data/portfolioData';

export default function Services() {
  return (
    <section id="services" className="section services-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-handshake"></i>
            <span>Solutions & Value</span>
          </div>
          <h2 className="section-title">
            How I Can <span className="gradient-text">Help Your Team</span>
          </h2>
          <p className="section-subtitle">
            Whether you need a high-converting web presence, a distributed scraping engine, or custom computational
            modeling, I deliver production-ready software built to last.
          </p>
        </div>

        {/* Services Grid */}
        <div className="services-grid">
          {servicesData.map((service, idx) => (
            <div key={idx} className="service-card">
              <div className="service-icon-box">
                <i className={service.icon}></i>
              </div>

              <h3 className="service-title">{service.title}</h3>
              <div className="service-subtitle">{service.subtitle}</div>
              <p className="service-desc">{service.description}</p>

              <ul className="service-points">
                {service.points.map((pt, pIdx) => (
                  <li key={pIdx} className="service-point">
                    <i className="fa-solid fa-circle-check"></i>
                    <span>{pt}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
