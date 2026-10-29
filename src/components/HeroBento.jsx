import { useEffect, useState } from 'react';
import { ArrowUpRight, Check, Mail, MapPin, Code2, Workflow, Atom, Search } from 'lucide-react';
import { Github, Linkedin } from './ui/BrandIcons';
import { personalInfo } from '../data/portfolioData';
import Button from './ui/Button';
import Card from './ui/Card';

const capabilities = [
  { icon: Code2, label: 'Full-stack development', detail: 'React / Next.js / Node.js' },
  { icon: Workflow, label: 'Intelligent automation', detail: 'Python / Puppeteer / Data' },
  { icon: Atom, label: 'Scientific computing', detail: 'Simulation / Monte Carlo / DFT' },
];

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
          <span>Dhrubo’s studio <span className="topbar-divider">/</span> Engineering & curiosity</span>
          <Button variant="ghost" size="small" onClick={onOpenCmd} aria-label="Search portfolio"><Search size={15} /><span>Quick search</span><kbd>⌘ K</kbd></Button>
        </div>
        <div className="overview-intro"><span className="eyebrow"><span className="status-dot" /> OPEN TO SELECT OPPORTUNITIES</span><span className="overview-location"><MapPin size={13} /> Dhaka, Bangladesh</span></div>
        <div className="overview-grid">
          <Card as="article" className="overview-profile">
            <div className="profile-topline"><span className="eyebrow">THE PERSON BEHIND THE CODE</span><ArrowUpRight size={16} aria-hidden="true" /></div>
            <div className="profile-identity"><div className="profile-photo"><img src={personalInfo.avatar} alt={personalInfo.fullName} /><span className="status-dot" /></div><span className="profile-handle">@ardhrubo</span></div>
            <h2>Abdur Rahman<br />Dhrubo<span>.</span></h2>
            <p className="profile-role">Full-stack engineer.<br />Computational researcher.</p>
            <div className="profile-socials">
              <Button asChild variant="secondary" size="icon"><a href={personalInfo.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a></Button>
              <Button asChild variant="secondary" size="icon"><a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a></Button>
              <Button variant="secondary" size="icon" onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email'}>{copied ? <Check size={17} /> : <Mail size={17} />}</Button>
            </div>
            <div className="profile-local-time"><span><MapPin size={13} /> LOCAL TIME / GMT+6</span><time>{time || 'Dhaka'}</time></div>
          </Card>
          <Card as="article" className="overview-main">
            <span className="eyebrow">HELLO, I’M DHRUBO</span>
            <h1>A curious mind.<br /><span>A builder at heart.</span></h1>
            <p className="overview-description">I’m Dhrubo, a full-stack engineer and computational researcher. I build web platforms, automate data workflows, and model complex systems.</p>
            <div className="overview-actions">
              <Button asChild className="studio-action"><a href="#projects"><span className="action-icon action-icon--mint"><ArrowUpRight size={18} aria-hidden="true" /></span>View selected work</a></Button>
              <Button asChild variant="secondary" className="studio-action"><a href="#contact"><span className="action-icon action-icon--peach"><Mail size={18} aria-hidden="true" /></span>Start a conversation</a></Button>
            </div>
            <div className="overview-capabilities">
              {capabilities.map(({icon: Icon, label, detail}) => <div key={label}><Icon size={17} aria-hidden="true" /><div><strong>{label}</strong><span>{detail}</span></div></div>)}
            </div>
            <div className="studio-note"><span className="status-dot" /> Between code, experiments, and possibility.</div>
          </Card>
        </div>
        <div className="overview-metrics" aria-label="Career highlights">
          {personalInfo.stats.map(stat => <div key={stat.label}><strong>{stat.value}</strong><span>{stat.label}</span></div>)}
        </div>
      </div>
    </section>
  );
}
