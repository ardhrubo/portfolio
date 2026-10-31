import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Mail, MapPin, FlaskConical, Layers3, Clock3, Atom, HeartHandshake } from 'lucide-react';
import { Github, Linkedin } from './ui/BrandIcons';
import { personalInfo } from '../data/portfolioData';
import Button from './ui/Button';
import '../styles/metrics.css';
import '../styles/hero.css';

const metricIcons = [Layers3, Clock3, Atom, HeartHandshake];

export default function HeroBento({ onCopyEmail }) {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const timer = setTimeout(() => setCopied(false), 2500);
    return () => clearTimeout(timer);
  }, [copied]);

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(personalInfo.email);
      setCopied(true);
      onCopyEmail?.('Email copied: ' + personalInfo.email);
    } catch {
      onCopyEmail?.('Email me at ' + personalInfo.email);
    }
  };

  return (
    <section id="hero" className="overview-section hero-redesign">
      <div className="container">
        <div className="hero-shell">
          <div className="hero-stage">
            <div className="hero-copy">
              <p className="hero-status">
                <span className="status-dot" aria-hidden="true" />
                Open to opportunities
                <span className="hero-status-sep" aria-hidden="true" />
                <span className="hero-status-place"><MapPin size={12} aria-hidden="true" />{personalInfo.location}</span>
              </p>

              <h1>
                <span>{personalInfo.heroHeadline}</span>
                <em>{personalInfo.heroHeadlineAccent}</em>
              </h1>
              <p className="hero-story-intro">{personalInfo.heroIntro}</p>

              <div className="overview-actions hero-actions">
                <Button asChild>
                  <a id="hero-explore-work" href="#projects">Explore my work <ArrowUpRight size={18} aria-hidden="true" /></a>
                </Button>
                <Button asChild variant="secondary">
                  <a id="hero-lets-talk" href="#contact">Let’s talk <ArrowUpRight size={17} aria-hidden="true" /></a>
                </Button>
              </div>

              <div className="hero-tools">
                <span>BUILT WITH</span>
                <div>
                  {personalInfo.heroTechnologies.map(tech => (
                    <a key={tech.logo} href="#skills" aria-label={`${tech.name}: explore my tech stack`} title={tech.name}>
                      <img src={`/tech/${tech.logo}.svg`} alt="" width="20" height="20" loading="lazy" />
                      <span>{tech.name}</span>
                    </a>
                  ))}
                </div>
              </div>
            </div>

            <div className="hero-portrait">
              <div className="hero-portrait-frame">
                <img src={personalInfo.avatar} alt={personalInfo.fullName} width="1024" height="1024" fetchPriority="high" />
                <span className="hero-sticker"><FlaskConical size={14} aria-hidden="true" /> CODE + CURIOSITY</span>
              </div>
              <div className="hero-name-chip">
                <span className="status-dot" aria-hidden="true" />
                <span>
                  <strong>{personalInfo.name}</strong>
                  <span>{personalInfo.headline}</span>
                </span>
              </div>
              <div className="hero-socials">
                <span>FIND ME</span>
                <div>
                  <a id="hero-github" href={personalInfo.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
                  <a id="hero-linkedin" className="hero-socials-linkedin" href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
                  <button id="hero-copy-email" type="button" onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email'}>
                    {copied ? <Check size={18} /> : <Mail size={18} />}
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="overview-metrics" aria-label="Career highlights">
          {personalInfo.stats.map((stat, i) => {
            const Icon = metricIcons[i];
            return (
              <div key={stat.label} className="metric-card">
                <span className="metric-icon"><Icon size={18} aria-hidden="true" /></span>
                <div className="metric-copy"><strong>{stat.value}</strong><span>{stat.label}</span></div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
