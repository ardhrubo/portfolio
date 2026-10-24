import React from 'react';
import { Search } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import ThemeToggle from './ThemeToggle';
import StatusIndicator from './StatusIndicator';

export default function MobileTopBar({ currentTheme, localTime, onToggleTheme, onOpenCmd, onBrandClick }) {
  return (
    <header
      aria-label="Mobile header"
      className="lg:hidden sticky top-0 z-40 w-full border-b border-border bg-card/80 backdrop-blur-xl px-4 py-3 flex items-center justify-between text-foreground"
    >
      <a
        id="mobile-brand"
        href="#hero"
        onClick={onBrandClick}
        className="flex min-w-0 items-center gap-2.5 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
      >
        <div className="relative size-8 shrink-0">
          <img
            src={personalInfo.avatar || '/dhrubo-profile.jpg'}
            alt={personalInfo.name}
            className="size-full rounded-xl object-cover border border-emerald-500/40 shadow-xs"
          />
          <span className="absolute -right-0.5 -bottom-0.5 size-2.5 rounded-full border border-background bg-emerald-500" />
        </div>
        <span className="truncate text-sm font-semibold tracking-tight text-foreground">
          {personalInfo.name}
        </span>
      </a>

      <div className="flex items-center gap-2">
        <StatusIndicator compact label="Available" title={`${personalInfo.status} · Dhaka ${localTime || 'GMT+6'}`} />
        <button
          id="mobile-cmd-btn"
          type="button"
          onClick={onOpenCmd}
          aria-label="Open quick search"
          className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-border bg-background/60 text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
        >
          <Search className="size-4" aria-hidden="true" />
        </button>
        <ThemeToggle id="mobile-theme-btn" currentTheme={currentTheme} onToggleTheme={onToggleTheme} />
      </div>
    </header>
  );
}
