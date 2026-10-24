import React from 'react';
import { Search, Sparkles, Mail, Moon, Sun } from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import { NAV_ITEMS } from './navConfig';

const FOCUS =
  'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[var(--accent)]';

const BADGES = { experience: '3+ yrs', projects: '50+', contact: 'Open' };

function Kbd({ children }) {
  return (
    <kbd className="rounded-md border border-[var(--glass-border)] bg-[var(--glass-item)] px-1.5 py-0.5 font-mono text-[0.625rem] text-muted-foreground">
      {children}
    </kbd>
  );
}

function GithubIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  );
}

function LinkedinIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
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
  const isLight = currentTheme === 'light';
  const ThemeIcon = isLight ? Moon : Sun;

  return (
    <aside
      aria-label="Primary Navigation"
      className="glass-panel hidden lg:flex fixed left-4 top-4 bottom-4 z-40 w-80 xl:w-84 2xl:w-88 flex-col overflow-hidden rounded-3xl text-foreground"
    >
      {/* Profile header */}
      <div className="px-5 pt-5 pb-4">
        <a
          id="sidebar-brand"
          href="#hero"
          onClick={onBrandClick}
          className={`group flex items-center gap-3.5 rounded-2xl p-2 -m-2 transition-colors hover:bg-[var(--glass-item)] cursor-pointer ${FOCUS}`}
        >
          <div className="relative size-12 shrink-0">
            <img
              src={personalInfo.avatar || '/dhrubo-profile.jpg'}
              alt={personalInfo.name}
              className="size-full rounded-2xl object-cover ring-1 ring-[var(--glass-border-strong)]"
            />
            <span
              className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-background bg-accent"
              title="Online"
            />
          </div>
          <span className="flex min-w-0 flex-col">
            <span className="truncate font-heading text-lg font-bold tracking-tight text-foreground">
              {personalInfo.fullName || personalInfo.name}
            </span>
            <span className="truncate text-xs text-muted-foreground">
              Full-Stack Engineer &middot; Researcher
            </span>
          </span>
        </a>

        <div className="mt-4 flex items-center justify-between rounded-xl border border-[var(--glass-border)] bg-[var(--glass-item)] px-3 py-2 text-xs">
          <span className="inline-flex items-center gap-2 font-medium text-foreground">
            <span className="relative flex size-2" aria-hidden="true">
              <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
              <span className="relative inline-flex size-2 rounded-full bg-accent" />
            </span>
            Open for roles
          </span>
          <span className="font-mono tabular-nums text-muted-foreground">
            Dhaka {localTime || 'GMT+6'}
          </span>
        </div>
      </div>

      <div className="mx-5 h-px bg-[var(--glass-border)]" />

      {/* Navigation */}
      <nav aria-label="Sections" className="flex-1 overflow-y-auto px-3 py-4">
        <p className="px-3 pb-2 font-mono text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground">
          Menu
        </p>
        <ul className="flex flex-col gap-1">
          {NAV_ITEMS.map((item) => {
            const Icon = item.icon;
            const isActive = activeSection === item.id;
            const badge = BADGES[item.id];
            return (
              <li key={item.id}>
                <a
                  id={`sidebar-link-${item.id}`}
                  href={item.href}
                  onClick={(e) => onNavClick(e, item)}
                  aria-current={isActive ? 'page' : undefined}
                  className={`group relative flex h-11 items-center gap-3 rounded-xl border px-3 text-sm font-medium transition-all duration-200 cursor-pointer ${FOCUS} ${
                    isActive
                      ? 'border-[var(--glass-border-strong)] bg-[var(--glass-item-hover)] text-foreground shadow-[var(--glass-highlight)]'
                      : 'border-transparent text-muted-foreground hover:bg-[var(--glass-item)] hover:text-foreground'
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`absolute -left-3 top-1/2 h-5 w-[3px] -translate-y-1/2 rounded-r-full bg-accent transition-opacity duration-200 ${
                      isActive ? 'opacity-100' : 'opacity-0'
                    }`}
                  />
                  <Icon
                    className={`size-[1.15rem] shrink-0 transition-colors duration-200 ${
                      isActive ? 'text-accent' : 'group-hover:text-foreground'
                    }`}
                    aria-hidden="true"
                  />
                  <span>{item.label}</span>
                  {badge && (
                    <span className="ml-auto rounded-md border border-[var(--glass-border)] px-1.5 py-0.5 font-mono text-[0.625rem] text-muted-foreground">
                      {badge}
                    </span>
                  )}
                </a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Footer tools */}
      <div className="flex flex-col gap-2.5 border-t border-[var(--glass-border)] p-4">
        <button
          id="sidebar-cmd-btn"
          type="button"
          onClick={onOpenCmd}
          title="Quick Search (⌘K)"
          className={`glass-item flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm cursor-pointer ${FOCUS}`}
        >
          <Search className="size-4 shrink-0" aria-hidden="true" />
          <span className="flex-1 text-left">Search portfolio…</span>
          <Kbd>⌘K</Kbd>
        </button>

        <button
          id="sidebar-ai-btn"
          type="button"
          onClick={onOpenChat}
          title="Chat with Dhrubo (⌘J / Ctrl+J)"
          className={`glass-tint flex h-10 w-full items-center gap-2.5 rounded-xl px-3 text-sm font-medium cursor-pointer ${FOCUS}`}
        >
          <Sparkles className="size-4 shrink-0 text-accent" aria-hidden="true" />
          <span className="flex-1 text-left">Ask my AI assistant</span>
          <Kbd>⌘J</Kbd>
        </button>

        <div className="flex items-center gap-1.5 pt-1">
          <button
            id="sidebar-theme-btn"
            type="button"
            onClick={onToggleTheme}
            aria-label={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            title={`Switch to ${isLight ? 'dark' : 'light'} mode`}
            className={`glass-item flex h-9 flex-1 items-center justify-center gap-2 rounded-xl text-xs font-medium cursor-pointer ${FOCUS}`}
          >
            <ThemeIcon className="size-4" aria-hidden="true" />
            {isLight ? 'Dark' : 'Light'}
          </button>
          <a
            href={personalInfo.socials.github}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            title="GitHub"
            className={`glass-item flex size-9 items-center justify-center rounded-xl cursor-pointer ${FOCUS}`}
          >
            <GithubIcon className="size-4" aria-hidden="true" />
          </a>
          <a
            href={personalInfo.socials.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn"
            title="LinkedIn"
            className={`glass-item flex size-9 items-center justify-center rounded-xl cursor-pointer ${FOCUS}`}
          >
            <LinkedinIcon className="size-4" aria-hidden="true" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Email"
            title="Email"
            className={`glass-item flex size-9 items-center justify-center rounded-xl cursor-pointer ${FOCUS}`}
          >
            <Mail className="size-4" aria-hidden="true" />
          </a>
        </div>
      </div>
    </aside>
  );
}
