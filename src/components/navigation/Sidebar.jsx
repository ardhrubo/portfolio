import { Search, Sparkles, ArrowUpRight } from 'lucide-react';
import { Github, Linkedin } from '../ui/BrandIcons';
import { personalInfo } from '../../data/portfolioData';
import { NAV_ITEMS } from './navConfig';
import Logo from '../Logo';
import CoolThemeSwitch from '../CoolThemeSwitch';
import Button from '../ui/Button';

export default function Sidebar({ currentTheme, activeSection, onToggleTheme, onOpenCmd, onOpenChat, onNavClick, onBrandClick }) {
  return (
    <aside aria-label="Primary navigation" className="desktop-sidebar">
      <a id="sidebar-brand" href="#hero" onClick={onBrandClick} className="sidebar-brand"><Logo size={38} /><span><strong>Dhrubo<span>.</span></strong><small>Engineer & researcher</small></span></a>
      <div className="sidebar-divider" />
      <p className="sidebar-section-label">WORKSPACE</p>
      <nav aria-label="Sections"><ul>{NAV_ITEMS.map(item => {
        const Icon = item.icon;
        return <li key={item.id}><a id={`sidebar-link-${item.id}`} href={item.href} onClick={event => onNavClick(event, item)} aria-current={activeSection === item.id ? 'page' : undefined} className="sidebar-nav-link"><Icon size={18} aria-hidden="true" /><span>{item.label}</span><span className="nav-active-dot" /></a></li>;
      })}</ul></nav>
      <div className="sidebar-tools">
        <Button id="sidebar-cmd-btn" variant="ghost" onClick={onOpenCmd}><Search size={16} /><span>Search anything</span><kbd>⌘ K</kbd></Button>
        <Button id="sidebar-ai-btn" variant="ghost" onClick={onOpenChat}><Sparkles size={16} /><span>Ask my assistant</span><ArrowUpRight size={14} /></Button>
      </div>
      <div className="sidebar-availability"><span className="status-dot" /><span>Available for opportunities</span></div>
      <div className="sidebar-footer"><div className="sidebar-socials"><a href={personalInfo.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub"><Github size={17} /></a><a href={personalInfo.socials.linkedin} target="_blank" rel="noreferrer" aria-label="LinkedIn"><Linkedin size={17} /></a></div><CoolThemeSwitch id="sidebar-cool-switch" isDark={currentTheme === 'dark'} onToggle={onToggleTheme} /></div>
    </aside>
  );
}
