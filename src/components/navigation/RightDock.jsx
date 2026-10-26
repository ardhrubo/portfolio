import { Search, Sparkles, Mail } from 'lucide-react';
import { Github } from '../ui/BrandIcons';
import * as Tooltip from '@radix-ui/react-tooltip';
import { personalInfo } from '../../data/portfolioData';
import CoolThemeSwitch from '../CoolThemeSwitch';
import Button from '../ui/Button';

function Tool({ label, children }) {
  return <Tooltip.Root><Tooltip.Trigger asChild>{children}</Tooltip.Trigger><Tooltip.Portal><Tooltip.Content side="left" sideOffset={12} className="dock-tooltip">{label}<Tooltip.Arrow /></Tooltip.Content></Tooltip.Portal></Tooltip.Root>;
}

export default function RightDock({ currentTheme, onToggleTheme, onOpenCmd, onOpenChat, onNavigateToHome }) {
  return <Tooltip.Provider delayDuration={200}><aside aria-label="Quick actions" className="right-dock">
    <Tool label="Search portfolio"><Button id="right-dock-search" variant="ghost" size="icon" onClick={onOpenCmd} aria-label="Search portfolio"><Search size={18} /></Button></Tool>
    <Tool label="Ask my assistant"><Button id="right-dock-ai" variant="ghost" size="icon" onClick={onOpenChat} aria-label="Ask my assistant"><Sparkles size={18} /></Button></Tool>
    <span className="dock-divider" />
    <Tool label="GitHub profile"><Button asChild variant="ghost" size="icon"><a href={personalInfo.socials.github} target="_blank" rel="noreferrer" aria-label="GitHub profile"><Github size={18} /></a></Button></Tool>
    <Tool label="Get in touch"><Button id="right-dock-talk" variant="ghost" size="icon" onClick={() => onNavigateToHome('#contact')} aria-label="Get in touch"><Mail size={18} /></Button></Tool>
    <span className="dock-divider" />
    <Tool label={currentTheme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}><CoolThemeSwitch id="right-dock-theme" isDark={currentTheme === 'dark'} onToggle={onToggleTheme} /></Tool>
  </aside></Tooltip.Provider>;
}
