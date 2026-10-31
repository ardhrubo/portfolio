import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Mail, MapPin, FlaskConical, Layers3, Clock3, Atom, HeartHandshake } from 'lucide-react';
import { Github, Linkedin } from './ui/BrandIcons';
import { personalInfo } from '../data/portfolioData';
import Button from './ui/Button';
import ReactionScene from './ui/ReactionScene';
import '../styles/metrics.css';
import '../styles/hero.css';

const metricIcons = [Layers3, Clock3, Atom, HeartHandshake];
export default function HeroBento({ onCopyEmail }) {
  const [copied, setCopied] = useState(false);
  useEffect(() => { if (!copied) return; const timer = setTimeout(() => setCopied(false), 2500); return () => clearTimeout(timer); }, [copied]);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(personalInfo.email); setCopied(true); onCopyEmail?.('Email copied: ' + personalInfo.email); }
    catch { onCopyEmail?.('Email me at ' + personalInfo.email); }
  };
  return <section id="hero" className="overview-section hero-redesign"><div className="container">
    <div className="hero-heading-line"><span className="eyebrow"><span className="status-dot" /> OPEN TO OPPORTUNITIES</span><span><MapPin size={13} aria-hidden="true" />{personalInfo.location}</span></div>
    <div className="hero-composition">
      <article className="hero-portrait-panel">
        <div className="hero-portrait-frame"><img src={personalInfo.avatar} alt={personalInfo.fullName} width="400" height="480" fetchPriority="high" /><span className="portrait-corner portrait-corner--one" /><span className="portrait-corner portrait-corner--two" /><span className="portrait-sticker"><FlaskConical size={18} aria-hidden="true" /> CODE + CURIOSITY</span></div>
        <div className="hero-person"><div><h2>{personalInfo.name}</h2><p>{personalInfo.headline}</p></div><div className="hero-socials">
          <a href={personalInfo.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={18} /></a>
          <a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={18} /></a>
          <button onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email'}>{copied ? <Check size={18} /> : <Mail size={18} />}</button>
        </div></div>
      </article>
      <article className="hero-story-panel">
        <span className="eyebrow">SOFTWARE ENGINEERING × SCIENTIFIC CURIOSITY</span>
        <h1>{personalInfo.heroHeadline}<em>{personalInfo.heroHeadlineAccent}</em></h1>
        <p className="hero-story-intro">{personalInfo.heroIntro}</p>
        <div className="hero-actions"><Button asChild><a href="#projects">Explore my work <ArrowUpRight size={18} aria-hidden="true" /></a></Button><a className="hero-contact-link" href="#contact">Let’s talk <ArrowUpRight size={17} aria-hidden="true" /></a></div>
        <ReactionScene compact />
      </article>
    </div>
    <div className="hero-tools"><span>BUILT WITH</span><div>{personalInfo.heroTechnologies.map(tech => <a key={tech.logo} href="#skills" aria-label={`${tech.name} — explore my tech stack`} title={tech.name}><img src={`/tech/${tech.logo}.svg`} alt="" width="25" height="25" /><span>{tech.name}</span></a>)}</div></div>
    <div className="overview-metrics" aria-label="Career highlights">{personalInfo.stats.map((stat, i) => { const Icon = metricIcons[i]; return <div key={stat.label} className="metric-card"><span className="metric-icon"><Icon size={18} aria-hidden="true" /></span><div className="metric-copy"><strong>{stat.value}</strong><span>{stat.label}</span></div></div>; })}</div>
  </div></section>;
}
