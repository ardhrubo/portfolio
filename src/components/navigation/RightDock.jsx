import React, { useState } from 'react';
import {
  Search,
  Sparkles,
  Moon,
  Sun,
  Mail,
  Send,
  Radio,
} from 'lucide-react';
import { personalInfo } from '../../data/portfolioData';
import CoolThemeSwitch from '../CoolThemeSwitch';

function Tooltip({ children, label }) {
  return (
    <div className="group relative flex items-center justify-center">
      {children}
      <div className="absolute right-full mr-3.5 hidden xl:flex items-center pointer-events-none opacity-0 -translate-x-1.5 transition-all duration-200 group-hover:opacity-100 group-hover:translate-x-0 z-50">
        <div className="glass-panel rounded-lg px-2.5 py-1 text-[0.6875rem] font-medium text-foreground whitespace-nowrap">
          {label}
        </div>
      </div>
    </div>
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

export default function RightDock({
  currentTheme,
  localTime,
  onToggleTheme,
  onOpenCmd,
  onOpenChat,
}) {
  const isDark = currentTheme === 'dark';

  return (
    <aside
      aria-label="Floating Quick Actions Dock"
      className="glass-panel hidden xl:flex fixed right-4 top-1/2 -translate-y-1/2 z-40 flex-col items-center gap-1.5 p-1.5 rounded-2xl"
    >
      {/* 1. Status Radar Orb */}
      <Tooltip label={`Dhaka ${localTime || 'GMT+6'} · Available for Hire`}>
        <div
          id="right-dock-status"
          className="relative flex size-9 items-center justify-center rounded-xl cursor-default"
        >
          <span className="relative flex size-2.5">
            <span className="absolute inline-flex size-full rounded-full bg-accent opacity-60 motion-safe:animate-ping" />
            <span className="relative inline-flex size-2.5 rounded-full bg-accent" />
          </span>
        </div>
      </Tooltip>

      <div className="w-5 h-px bg-[var(--glass-border)] my-0.5" />

      {/* 2. Ask AI Copilot */}
      <Tooltip label="Ask AI Copilot (⌘J)">
        <button
          id="right-dock-ai"
          type="button"
          onClick={onOpenChat}
          className="glass-item group flex size-9 items-center justify-center rounded-xl cursor-pointer"
        >
          <Sparkles className="size-4 text-accent transition-transform duration-300 group-hover:rotate-12" aria-hidden="true" />
        </button>
      </Tooltip>

      {/* 3. Quick Search */}
      <Tooltip label="Quick Search (⌘K)">
        <button
          id="right-dock-search"
          type="button"
          onClick={onOpenCmd}
          className="glass-item flex size-9 items-center justify-center rounded-xl cursor-pointer"
        >
          <Search className="size-4" aria-hidden="true" />
        </button>
      </Tooltip>

      {/* 4. Theme Switcher */}
      <Tooltip label={isDark ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
        <div className="flex size-9 items-center justify-center">
          <CoolThemeSwitch
            id="right-dock-theme"
            isDark={isDark}
            onToggle={onToggleTheme}
            size={6}
          />
        </div>
      </Tooltip>

      <div className="w-5 h-px bg-[var(--glass-border)] my-0.5" />

      {/* 5. Direct Contact CTA Button */}
      <Tooltip label="Let's Talk & Collaborate">
        <a
          id="right-dock-talk"
          href="#contact"
          className="glass-tint group flex size-9 items-center justify-center rounded-xl cursor-pointer"
        >
          <Send className="size-3.5 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" aria-hidden="true" />
        </a>
      </Tooltip>

      {/* 6. Social Links Strip */}
      <Tooltip label="GitHub Profile">
        <a
          href={personalInfo.socials.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:scale-110 cursor-pointer"
        >
          <GithubIcon className="size-3.5" aria-hidden="true" />
        </a>
      </Tooltip>

      <Tooltip label="LinkedIn">
        <a
          href={personalInfo.socials.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:scale-110 cursor-pointer"
        >
          <LinkedinIcon className="size-3.5" aria-hidden="true" />
        </a>
      </Tooltip>

      <Tooltip label="Peerlist">
        <a
          href={personalInfo.socials.peerlist}
          target="_blank"
          rel="noopener noreferrer"
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:scale-110 cursor-pointer"
        >
          <PeerlistIcon className="size-3.5" aria-hidden="true" />
        </a>
      </Tooltip>

      <Tooltip label="Direct Email">
        <a
          href={`mailto:${personalInfo.email}`}
          className="flex size-8 items-center justify-center rounded-lg text-muted-foreground transition-all duration-200 hover:bg-primary/10 hover:text-primary hover:scale-110 cursor-pointer"
        >
          <Mail className="size-3.5" aria-hidden="true" />
        </a>
      </Tooltip>
    </aside>
  );
}
