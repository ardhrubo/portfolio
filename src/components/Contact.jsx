import { useEffect, useState } from 'react';
import { Mail, Copy, Check, MapPin, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from './ui/BrandIcons';
import Button from './ui/Button';
import { personalInfo } from '../data/portfolioData';
import '../styles/contact.css';

const topics = ['Build a product', 'Join a team', 'Automation', 'Research collaboration', 'Something else'];
export default function Contact({ onShowToast }) {
  const [form, setForm] = useState({ name: '', email: '', topic: topics[0], message: '' });
  const [copied, setCopied] = useState(false);
  const [prepared, setPrepared] = useState(false);
  useEffect(() => { if (!copied) return; const timer = setTimeout(() => setCopied(false), 2500); return () => clearTimeout(timer); }, [copied]);
  const copyEmail = async () => {
    try { await navigator.clipboard.writeText(personalInfo.email); setCopied(true); }
    catch { onShowToast?.('Email me at ' + personalInfo.email); }
  };
  const change = event => { setForm(previous => ({ ...previous, [event.target.name]: event.target.value })); setPrepared(false); };
  const submit = event => {
    event.preventDefault();
    const subject = encodeURIComponent(form.topic + ' — ' + form.name);
    const body = encodeURIComponent('Hi ' + personalInfo.name + ',\n\n' + form.message + '\n\n' + form.name + '\n' + form.email);
    window.location.href = 'mailto:' + personalInfo.email + '?subject=' + subject + '&body=' + body;
    setPrepared(true);
  };
  return <section id="contact" className="section contact-studio"><div className="container">
    <div className="section-header"><div className="section-tag"><Mail size={15} aria-hidden="true" /><span>07 / Let’s build</span></div><h2 className="section-title">Let’s make something.</h2><p className="section-subtitle">Have an idea? Let’s talk.</p></div>
    <div className="contact-studio-shell">
      <aside className="contact-studio-profile" aria-label="Contact details">
        <div className="contact-portrait-art"><span className="contact-orbit contact-orbit--outer" aria-hidden="true" /><span className="contact-orbit contact-orbit--inner" aria-hidden="true" /><span className="contact-orbit-node" aria-hidden="true" /><img src={personalInfo.avatar} alt="" width="112" height="112" /><span className="contact-art-icon" aria-hidden="true"><Mail size={19} /></span></div>
        <div className="contact-studio-person"><div><h3>{personalInfo.name}</h3><p>{personalInfo.headline}</p></div></div>
        <p className="contact-studio-availability">{personalInfo.status}</p>
        <div className="contact-studio-email"><span>Email me directly</span><a href={'mailto:' + personalInfo.email}>{personalInfo.email}</a><button type="button" onClick={copyEmail} aria-label={copied ? 'Email copied' : 'Copy email address'}>{copied ? <Check size={17} /> : <Copy size={17} />}</button></div>
        <p className="contact-studio-location"><MapPin size={16} aria-hidden="true" /><span>{personalInfo.location}<small>{personalInfo.timezone}</small></span></p>
        <div className="contact-studio-links"><a href={personalInfo.socials.github} target="_blank" rel="noreferrer"><Github size={18} /> GitHub <ArrowUpRight size={14} /></a><a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer"><Linkedin size={18} /> LinkedIn <ArrowUpRight size={14} /></a></div>
        <details className="contact-studio-more"><summary>Elsewhere online</summary><div>{['peerlist', 'facebook', 'youtube'].map(key => <a key={key} href={personalInfo.socials[key]} target="_blank" rel="noreferrer">{{peerlist:'Peerlist',facebook:'Facebook',youtube:'YouTube'}[key]}<ArrowUpRight size={14} /></a>)}</div></details>
      </aside>
      <form className="contact-studio-form" onSubmit={submit}>
        <div><span className="contact-studio-kicker">START A CONVERSATION</span><h3>Tell me about it</h3></div>
        <label>What brings you here?<select name="topic" value={form.topic} onChange={change}>{topics.map(topic => <option key={topic}>{topic}</option>)}</select></label>
        <div className="contact-studio-fields"><label>Your name<input name="name" autoComplete="name" required placeholder="Alex Morgan" value={form.name} onChange={change} /></label><label>Email address<input name="email" type="email" autoComplete="email" required placeholder="alex@company.com" value={form.email} onChange={change} /></label></div>
        <label>A little about your idea<textarea name="message" required rows={5} placeholder="What are you building, and how could I help?" value={form.message} onChange={change} /></label>
        <div className="contact-studio-send"><Button type="submit">Prepare email <ArrowUpRight size={17} aria-hidden="true" /></Button><p>Opens a draft in your email app.</p></div>
        {prepared && <p className="contact-studio-feedback" role="status">Draft prepared. If your email app didn’t open, use the email address beside this form.</p>}
      </form>
    </div>
  </div></section>;
}
