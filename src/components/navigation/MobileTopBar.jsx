import React from 'react';
import { Search, Menu } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import ThemeToggle from './ThemeToggle';
import Logo from '../Logo';

export default function MobileTopBar({ currentTheme, onToggleTheme, onOpenCmd, onBrandClick, onOpenMenu }) {
  return (
    <header
      aria-label="Mobile header"
      className="mobile-topbar lg:hidden sticky top-0 z-40 w-full sidebar-glass border-b border-[var(--glass-border)] text-foreground"
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

      <div className="mobile-theme-slot">
        <ThemeToggle id="mobile-theme-btn" currentTheme={currentTheme} onToggleTheme={onToggleTheme} />
      </div>

      <div className="mobile-header-actions">
        <button
          id="mobile-cmd-btn"
          type="button"
          onClick={onOpenCmd}
          aria-label="Open quick search"
          className="mobile-search-trigger inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
        >
          <Search className="size-4" aria-hidden="true" />
        </button>
        <button type="button" className="mobile-menu-trigger" onClick={onOpenMenu} aria-label="Open navigation menu"><Menu size={19} aria-hidden="true" /></button>
      </div>
    </header>
  );
}
