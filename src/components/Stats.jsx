import React from 'react';
import { personalInfo } from '../data/portfolioData';

export default function Stats() {
  return (
    <section className="stats-section">
      <div className="container">
        <div className="stats-grid">
          {personalInfo.stats.map((stat, idx) => (
            <div key={idx} className="stat-item">
              <div className="stat-icon-wrapper">
                <i className={stat.icon}></i>
              </div>
              <div className="stat-content">
                <span className="stat-number">{stat.value}</span>
                <span className="stat-label">{stat.label}</span>
                <span className="stat-desc">{stat.desc}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
