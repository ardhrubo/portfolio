import React from 'react';
import {
  Search,
  Sparkles,
  Moon,
  Sun,
  ArrowRight,
  Mail,
  Globe,
  Clock,
} from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';

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

function FacebookIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
    </svg>
  );
}

function YoutubeIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function PeerlistIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 20V4h5.5a4.5 4.5 0 0 1 0 9H8" />
    </svg>
  );
}

const SOCIAL_LINKS = [
  { key: 'github', label: 'GitHub', icon: GithubIcon, href: personalInfo.socials.github },
  { key: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon, href: personalInfo.socials.linkedin },
  { key: 'peerlist', label: 'Peerlist', icon: PeerlistIcon, href: personalInfo.socials.peerlist },
  { key: 'facebook', label: 'Facebook', icon: FacebookIcon, href: personalInfo.socials.facebook },
  { key: 'youtube', label: 'YouTube', icon: YoutubeIcon, href: personalInfo.socials.youtube },
];

export default function RightDock({
  currentTheme,
  localTime,
  onToggleTheme,
  onOpenCmd,
  onOpenChat,
  onNavigateToHome,
}) {
  const isLight = currentTheme === 'light';

  return (
    <aside
      aria-label="Utilities & Actions Dock"
      className="hidden xl:flex fixed right-6 top-6 z-40 w-60 flex-col gap-4 text-foreground"
    >
      <div className="rounded-2xl border border-border bg-card/85 backdrop-blur-xl p-4 shadow-sm flex flex-col gap-4">
        {/* Availability & Dhaka Live Time */}
        <div className="flex flex-col gap-2 pb-3 border-b border-border">
          <div className="flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-primary">
              <span className="relative flex size-2">
                <span className="absolute inline-flex size-full rounded-full bg-primary opacity-75 motion-safe:animate-ping" />
                <span className="relative inline-flex size-2 rounded-full bg-primary" />
              </span>
              Available for Hire
            </span>
            <span className="text-[0.6875rem] font-mono text-muted-foreground flex items-center gap-1">
              <Globe className="size-3" />
              Worldwide
            </span>
          </div>

          <div className="flex items-center justify-between rounded-xl bg-background/60 px-3 py-2 border border-border/60">
            <div className="flex items-center gap-2">
              <Clock className="size-3.5 text-primary" />
              <span className="font-mono text-xs font-semibold text-foreground">
                {localTime || 'Dhaka GMT+6'}
              </span>
            </div>
            <span className="text-[0.625rem] font-medium uppercase tracking-wider text-muted-foreground">
              Dhaka
            </span>
          </div>
        </div>

        {/* Quick Tools */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[0.6875rem] font-semibold uppercase tracking-wider text-muted-foreground px-1">
            Quick Tools
          </span>

          <button
            id="right-dock-cmd"
            type="button"
            onClick={onOpenCmd}
            className="flex h-9 w-full items-center justify-between rounded-xl border border-border bg-background/60 px-3 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-foreground hover:border-primary/30 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Search className="size-3.5 text-primary" />
              <span>Quick Search</span>
            </span>
            <kbd className="rounded border border-border bg-background px-1 py-0.5 font-mono text-[0.625rem]">⌘K</kbd>
          </button>

          <button
            id="right-dock-ai"
            type="button"
            onClick={onOpenChat}
            className="flex h-9 w-full items-center justify-between rounded-xl border border-border bg-background/60 px-3 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-foreground hover:border-primary/30 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              <Sparkles className="size-3.5 text-primary" />
              <span>Ask AI Copilot</span>
            </span>
            <kbd className="rounded border border-border bg-background px-1 py-0.5 font-mono text-[0.625rem]">⌘J</kbd>
          </button>

          <button
            id="right-dock-theme"
            type="button"
            onClick={onToggleTheme}
            className="flex h-9 w-full items-center justify-between rounded-xl border border-border bg-background/60 px-3 text-xs font-medium text-muted-foreground transition-colors duration-200 hover:bg-primary/10 hover:text-foreground hover:border-primary/30 cursor-pointer"
          >
            <span className="flex items-center gap-2">
              {isLight ? <Moon className="size-3.5 text-primary" /> : <Sun className="size-3.5 text-primary" />}
              <span>{isLight ? 'Dark Mode' : 'Light Mode'}</span>
            </span>
            <span className="text-[0.625rem] text-muted-foreground font-mono">{isLight ? '☾' : '☼'}</span>
          </button>
        </div>

        {/* CTA & Socials */}
        <div className="flex flex-col gap-3 pt-3 border-t border-border">
          <a
            href="#contact"
            onClick={(e) => {
              if (onNavigateToHome) {
                e.preventDefault();
                onNavigateToHome('#contact');
              }
            }}
            className="group flex h-9 w-full items-center justify-center gap-2 rounded-xl bg-primary px-3 text-xs font-semibold text-primary-foreground shadow-sm transition-all duration-300 hover:shadow-md cursor-pointer"
          >
            <span>Let's Talk</span>
            <ArrowRight className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
          </a>

          <div className="flex items-center justify-between px-1">
            {SOCIAL_LINKS.filter(s => s.href).map(({ key, label, icon: Icon, href }) => (
              <a
                key={key}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                title={label}
                aria-label={label}
                className="inline-flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
              >
                <Icon className="size-3.5" />
              </a>
            ))}
            <a
              href={`mailto:${personalInfo.email}`}
              title="Direct Email"
              aria-label="Direct Email"
              className="inline-flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:bg-primary/10 hover:text-primary"
            >
              <Mail className="size-3.5" />
            </a>
          </div>
        </div>
      </div>
    </aside>
  );
}
