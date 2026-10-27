import React from 'react';
import { Search, Menu } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import ThemeToggle from './ThemeToggle';
import StatusIndicator from './StatusIndicator';
import Logo from '../Logo';

export default function MobileTopBar({ currentTheme, localTime, onToggleTheme, onOpenCmd, onBrandClick, onOpenMenu }) {
  return (
    <header
      aria-label="Mobile header"
      className="lg:hidden sticky top-0 z-40 w-full sidebar-glass border-b border-[var(--glass-border)] px-4 py-3 flex items-center justify-between text-foreground"
    >
      <a
        id="mobile-brand"
        href="#hero"
        onClick={onBrandClick}
        className="flex min-w-0 items-center gap-2.5 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <Logo size={32} />
        <span className="truncate text-sm font-semibold tracking-tight text-foreground">
          {personalInfo.name}
        </span>
      </a>

      <div className="flex items-center gap-2">
        <button type="button" className="mobile-menu-trigger" onClick={onOpenMenu} aria-label="Open navigation menu"><Menu size={19} /></button>
        <span className="mobile-header-status"><StatusIndicator compact label="Available" title={`${personalInfo.status} · Dhaka ${localTime || 'GMT+6'}`} /></span>
        <button
          id="mobile-cmd-btn"
          type="button"
          onClick={onOpenCmd}
          aria-label="Open quick search"
          className="mobile-search-trigger inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
        >
          <Search className="size-4" aria-hidden="true" />
        </button>
        <ThemeToggle id="mobile-theme-btn" currentTheme={currentTheme} onToggleTheme={onToggleTheme} />
      </div>
    </header>
  );
}
