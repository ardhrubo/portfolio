import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Mail, MapPin, Search, Layers3, Clock3, Atom, HeartHandshake } from 'lucide-react';
import { Github, Linkedin } from './ui/BrandIcons';
import { personalInfo } from '../data/portfolioData';
import Button from './ui/Button';
import Card from './ui/Card';
import '../styles/metrics.css';

const metricIcons = [Layers3, Clock3, Atom, HeartHandshake];

export default function HeroBento({ onCopyEmail, onOpenCmd }) {
  const [copied, setCopied] = useState(false);
  const [time, setTime] = useState('');
  useEffect(() => {
    const formatter = new Intl.DateTimeFormat('en-US', { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', hour12: true });
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const interval = setInterval(tick, 30000);
    return () => clearInterval(interval);
  }, []);
  useEffect(() => {
    if (!copied) return;
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
    <section id="hero" className="overview-section">
      <div className="container">
        <div className="page-topbar">
          <span>{personalInfo.name} <span className="topbar-divider">/</span> Products & engineering</span>
          <Button variant="ghost" size="small" onClick={onOpenCmd} aria-label="Search portfolio"><Search size={15} /><span>Quick search</span><kbd>⌘ K</kbd></Button>
        </div>
        <div className="overview-intro"><span className="eyebrow"><span className="status-dot" /> OPEN TO SELECT OPPORTUNITIES</span><span className="overview-location"><MapPin size={13} /> Dhaka, Bangladesh</span></div>
        <div className="overview-grid">
          <Card as="article" className="overview-profile">
            <div className="profile-topline"><span className="eyebrow">THE PERSON BEHIND THE CODE</span><ArrowUpRight size={16} aria-hidden="true" /></div>
            <div className="profile-identity"><div className="profile-photo"><img src={personalInfo.avatar} alt={personalInfo.fullName} /><span className="status-dot" /></div><span className="profile-handle">@ardhrubo</span></div>
            <h2>{personalInfo.name}</h2>
            <p className="profile-role">{personalInfo.headline}</p>
            <div className="profile-socials">
              <Button asChild variant="secondary" size="icon"><a href={personalInfo.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a></Button>
              <Button asChild variant="secondary" size="icon"><a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a></Button>
              <Button variant="secondary" size="icon" onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email'}>{copied ? <Check size={17} /> : <Mail size={17} />}</Button>
            </div>
            <div className="profile-local-time"><span><MapPin size={13} /> LOCAL TIME / GMT+6</span><time>{time || 'Dhaka'}</time></div>
          </Card>
          <Card as="article" className="overview-main">
            <span className="eyebrow">HELLO, I’M {personalInfo.name.toUpperCase()}</span>
            <h1>{personalInfo.headline}</h1>
            <p className="overview-description">{personalInfo.heroIntro}</p>
            <div className="overview-actions">
              <Button asChild className="studio-action"><a href="#projects"><span className="action-icon action-icon--mint"><ArrowUpRight size={18} aria-hidden="true" /></span>View selected work</a></Button>
              <Button asChild variant="secondary" className="studio-action"><a href="#contact"><span className="action-icon action-icon--peach"><Mail size={18} aria-hidden="true" /></span>Start a conversation</a></Button>
            </div>
            <div className="hero-technologies" aria-label="Technologies I build with">
              <span className="hero-technologies-label">TOOLS I BUILD WITH</span>
              <div>{personalInfo.heroTechnologies.map(tech => <a key={tech.logo} href="#skills" className="hero-tech-tile"><span className={`hero-tech-mark hero-tech-mark--${tech.logo}`}><img src={`/tech/${tech.logo}.svg`} alt="" width="28" height="28" /></span><span>{tech.name}</span></a>)}</div>
            </div>
            <div className="studio-note">Web applications · APIs · Automation</div>
          </Card>
        </div>
        <div className="overview-metrics" aria-label="Career highlights">
          {personalInfo.stats.map((stat, index) => { const Icon = metricIcons[index]; return <div key={stat.label} className="metric-card"><span className="metric-icon"><Icon size={20} aria-hidden="true" /></span><div className="metric-copy"><strong>{stat.value}</strong><span>{stat.label}</span></div><span className="metric-index" aria-hidden="true">0{index + 1}</span></div>; })}
        </div>
      </div>
    </section>
  );
}
