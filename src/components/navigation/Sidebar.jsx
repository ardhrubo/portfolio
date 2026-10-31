import { personalInfo } from '../../data/portfolioData';
import { NAV_ITEMS } from './navConfig';
import Logo from '../Logo';
import '../../styles/sidebar.css';

export default function Sidebar({ activeSection, onNavClick, onBrandClick }) {
  return (
    <aside id="portfolio-sidebar" aria-label="Primary navigation" className="desktop-sidebar">
      <a id="sidebar-brand" href="#hero" onClick={onBrandClick} className="sidebar-brand"><Logo size={46} /><span><strong>{personalInfo.name}</strong><small>{personalInfo.headline}</small></span></a>
      <div className="sidebar-divider" />
      <p className="sidebar-section-label">EXPLORE</p>
      <nav aria-label="Sections"><ul>{NAV_ITEMS.map(item => {
        const Icon = item.icon;
        return <li key={item.id}><a id={`sidebar-link-${item.id}`} href={item.href} onClick={event => onNavClick(event, item)} aria-current={activeSection === item.id ? 'page' : undefined} className="sidebar-nav-link"><Icon size={18} aria-hidden="true" /><span>{item.label}</span><span className="nav-active-dot" /></a></li>;
      })}</ul></nav>
      <div className="sidebar-availability"><span className="status-dot" /><span>Available for opportunities</span></div>
    </aside>
  );
}
