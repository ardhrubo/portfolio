import React from 'react';
import { Search, Sparkles } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import Logo from '../Logo';
import ThemeToggle from './ThemeToggle';
import StatusIndicator from './StatusIndicator';
import { NAV_ITEMS } from './navConfig';

function Kbd({ children }) {
  return (
    <kbd className="ml-auto rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted-foreground">
      {children}
    </kbd>
  );
}

export default function Sidebar({
  currentTheme,
  activeSection,
  localTime,
  onToggleTheme,
  onOpenCmd,
  onOpenChat,
  onNavClick,
  onBrandClick,
}) {
  return (
    <aside
      aria-label="Primary"
      className="hidden lg:flex fixed left-0 top-0 h-screen w-72 border-r border-border bg-card/80 backdrop-blur-xl z-40 flex-col text-foreground"
    >
      <div className="flex flex-col gap-4 px-5 pt-6 pb-5 border-b border-border">
        <a
          id="sidebar-brand"
          href="#hero"
          onClick={onBrandClick}
          className="group flex items-center gap-3 rounded-xl focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary"
        >
          <span className="transition-transform duration-300 group-hover:scale-105">
            <Logo size={38} showGlow={true} />
          </span>
          <span className="flex min-w-0 flex-col">
            <span className="truncate text-base font-semibold tracking-tight text-foreground">
              {personalInfo.fullName || personalInfo.name}
            </span>
            <span className="truncate text-xs text-muted-foreground">Full-Stack Engineer</span>
          </span>
        </a>
        <StatusIndicator
          label={`Available · Dhaka ${localTime || 'GMT+6'}`}
          title={personalInfo.status}
        />
      </div>

      <nav aria-label="Sections" className="flex-1 overflow-y-auto px-3 py-5">
        <p className="px-3 pb-2 text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground">
          Navigate
        </p>
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            return (
              <li key={item.id}>
                <a
                  id={`sidebar-link-${item.id}`}
                  href={item.href}
                  onClick={(e) => onNavClick(e, item)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative flex h-10 items-center gap-3 rounded-xl px-3 text-sm font-medium transition-colors duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${
                    isActive
                      ? 'bg-primary/10 text-primary'
                      : 'text-muted-foreground hover:bg-background/70 hover:text-foreground'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-full bg-primary transition-opacity duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <Icon
                    className="size-4 shrink-0 transition-transform duration-200 group-hover:scale-110"
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="flex flex-col gap-2 border-t border-border px-3 py-4">
        <button
          id="sidebar-cmd-btn"
          type="button"
          onClick={onOpenCmd}
          title="Quick Search (⌘K)"
          className="flex h-10 w-full items-center gap-3 rounded-xl border border-border bg-background/60 px-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
        >
          <Search className="size-4 shrink-0" aria-hidden="true" />
          <span>Quick Search</span>
          <Kbd>⌘K</Kbd>
        </button>

        <button
          id="sidebar-ai-btn"
          type="button"
          onClick={onOpenChat}
          title="Chat with Dhrubo (⌘J / Ctrl+J)"
          className="flex h-10 w-full items-center gap-3 rounded-xl border border-border bg-background/60 px-3 text-sm font-medium text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary cursor-pointer"
        >
          <Sparkles className="size-4 shrink-0 text-primary" aria-hidden="true" />
          <span>Ask AI</span>
          <Kbd>⌘J</Kbd>
        </button>

        <ThemeToggle
          id="sidebar-theme-btn"
          currentTheme={currentTheme}
          onToggleTheme={onToggleTheme}
          showLabel
        />
      </div>
    </aside>
  );
}
