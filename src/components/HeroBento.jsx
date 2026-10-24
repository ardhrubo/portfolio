import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Check,
  Mail,
  Search,
  FlaskConical,
  MapPin,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const EASE = 'ease-[cubic-bezier(0.16,1,0.3,1)]';
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
const CARD = `relative overflow-hidden rounded-2xl border border-border bg-card/80 backdrop-blur-xl p-6 shadow-sm transition-all duration-300 ${EASE} hover:border-primary/30 hover:shadow-md`;
const BTN = `inline-flex h-10 items-center gap-2 rounded-xl border border-border bg-card/70 px-4 text-sm font-medium text-foreground transition-all duration-300 ${EASE} hover:border-primary/40 hover:bg-primary/10 cursor-pointer ${FOCUS}`;

const TERMINAL_LOG = [
  { t: 'info', s: 'puppeteer › launching headless chromium (stealth)' },
  { t: 'ok', s: 'stealth › webdriver flag masked · fingerprint spoofed' },
  { t: 'info', s: 'crawler › rotating proxy pool [12/12 healthy]' },
  { t: 'ok', s: 'crawler › 248 pages extracted · 0 captchas' },
  { t: 'info', s: 'monte-carlo › seeding PRNG · n = 100,000 iterations' },
  { t: 'warn', s: 'monte-carlo › σ variance 0.0213 → resampling tail' },
  { t: 'ok', s: 'monte-carlo › converged · 95% CI [0.482, 0.517]' },
  { t: 'ok', s: 'pipeline › results streamed to dashboard in 1.84s' },
];

const LOG_TONE = {
  info: 'text-muted-foreground',
  ok: 'text-primary',
  warn: 'text-amber-500',
};

const ZONES = [
  { code: 'US', tz: 'America/New_York' },
  { code: 'EU', tz: 'Europe/Berlin' },
  { code: 'APAC', tz: 'Asia/Singapore' },
];

const METRICS = [
  { value: '50+', label: 'Shipped Projects' },
  { value: '3+', label: 'Years Experience' },
  { value: '100k+', label: 'Simulation Runs' },
  { value: '100%', label: 'Client Satisfaction' },
];

function PeerlistIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M8 20V4h5.5a4.5 4.5 0 0 1 0 9H8" />
    </svg>
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

const SOCIALS = [
  { key: 'github', label: 'GitHub', icon: GithubIcon },
  { key: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon },
  { key: 'peerlist', label: 'Peerlist', icon: PeerlistIcon },
  { key: 'facebook', label: 'Backbencher Chemist on Facebook', icon: FacebookIcon },
  { key: 'youtube', label: 'YouTube (@randomdhrubo)', icon: YoutubeIcon },
];

function Pulse() {
  return (
    <span className="relative flex size-1.5 shrink-0" aria-hidden="true">
      <span className="absolute inline-flex size-full rounded-full bg-primary opacity-70 motion-safe:animate-ping" />
      <span className="relative inline-flex size-1.5 rounded-full bg-primary" />
    </span>
  );
}

function Eyebrow({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[0.6875rem] font-semibold uppercase tracking-[0.08em] text-muted-foreground">
      <Icon className="size-3.5 text-primary" aria-hidden="true" />
      {children}
    </span>
  );
}

export default function HeroBento({ onCopyEmail, onOpenCmd }) {
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const [zoneTimes, setZoneTimes] = useState([]);
  const [logIndex, setLogIndex] = useState(0);
  const [iterations, setIterations] = useState(0);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      // Dhaka is GMT+6
      const options = { timeZone: 'Asia/Dhaka', hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true };
      setLocalTime(new Intl.DateTimeFormat('en-US', options).format(now));

      setZoneTimes(
        ZONES.map((z) => {
          const hour = Number(
            new Intl.DateTimeFormat('en-US', { timeZone: z.tz, hour: 'numeric', hour12: false }).format(now)
          ) % 24;
          const time = new Intl.DateTimeFormat('en-US', { timeZone: z.tz, hour: '2-digit', minute: '2-digit', hour12: false }).format(now);
          return { ...z, time, live: hour >= 8 && hour < 20 };
        })
      );
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const logTimer = setInterval(() => setLogIndex((i) => (i + 1) % TERMINAL_LOG.length), 1600);
    const iterTimer = setInterval(
      () => setIterations((n) => (n >= 100000 ? 0 : Math.min(100000, n + 1873))),
      60
    );
    return () => {
      clearInterval(logTimer);
      clearInterval(iterTimer);
    };
  }, []);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    if (onCopyEmail) onCopyEmail('Email copied to clipboard: ' + personalInfo.email);
    setTimeout(() => setCopied(false), 2500);
  };

  const [clockMain, clockPeriod] = (localTime || '--:--:-- --').split(' ');
  const visibleLines = [0, 1, 2].map((o) => ({
    ...TERMINAL_LOG[(logIndex + o) % TERMINAL_LOG.length],
    key: logIndex + o,
  }));

  return (
    <section id="hero" className="relative px-4 pt-8 pb-16 sm:px-6 lg:px-10 lg:pt-14 text-foreground">
      <div className="mx-auto w-full max-w-5xl">
        {/* Intro */}
        <div className="mb-8 flex flex-col gap-5">
          <div className="flex items-center gap-3.5">
            <div className="relative size-12 shrink-0">
              <img
                src={personalInfo.avatar || '/dhrubo-profile.jpg'}
                alt={personalInfo.name}
                className="size-full rounded-2xl border border-border object-cover"
              />
              <span
                className="absolute -right-0.5 -bottom-0.5 size-3 rounded-full border-2 border-background bg-primary"
                title="Active & Available"
              />
            </div>
            <p className="text-sm font-medium text-muted-foreground">{personalInfo.role}</p>
          </div>

          <h1 className="font-sans text-4xl font-semibold leading-[1.05] tracking-[-0.035em] text-foreground sm:text-5xl lg:text-[3.25rem]">
            Hi, I'm{' '}
            <span className="bg-linear-to-br from-foreground to-primary bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
            .
          </h1>

          <p className="max-w-2xl text-base leading-relaxed text-muted-foreground">
            Full-Stack Software Engineer &amp; Computational Researcher with{' '}
            <strong className="font-semibold text-foreground">50+ shipped projects</strong>. I engineer scalable
            React/Next.js web applications, resilient backend microservices, and high-performance scientific
            simulations.
          </p>

          <div className="flex flex-wrap items-center gap-2">
            <a
              href="#experience"
              id="hero-cta-experience"
              className={`group inline-flex h-10 items-center gap-2 rounded-xl bg-primary px-4 text-sm font-semibold text-primary-foreground shadow-sm transition-all duration-300 ${EASE} hover:-translate-y-px hover:shadow-[0_8px_24px_-8px_var(--color-primary)] ${FOCUS}`}
            >
              <span>View Experience</span>
              <ArrowRight className={`size-4 transition-transform duration-300 ${EASE} group-hover:translate-x-0.5`} aria-hidden="true" />
            </a>
            <a href="#projects" id="hero-cta-projects" className={BTN}>
              Featured Projects
            </a>
            <button
              id="hero-copy-email"
              type="button"
              onClick={handleCopy}
              title="Copy email address"
              aria-label="Copy email"
              className={`${BTN} w-10 justify-center px-0 ${copied ? 'border-primary/50 text-primary' : ''}`}
            >
              {copied ? <Check className="size-4" aria-hidden="true" /> : <Mail className="size-4" aria-hidden="true" />}
            </button>
            <button id="hero-cmd" type="button" onClick={onOpenCmd} className={BTN} title="Open Command Palette (⌘K)">
              <Search className="size-4 text-muted-foreground" aria-hidden="true" />
              <span>Quick Search</span>
              <kbd className="rounded-md border border-border bg-background px-1.5 py-0.5 font-mono text-[0.6875rem] text-muted-foreground">
                ⌘K
              </kbd>
            </button>

            <div className="flex flex-wrap gap-1">
              {SOCIALS.filter((s) => personalInfo.socials?.[s.key]).map(({ key, label, icon: Icon }) => (
                <a
                  key={key}
                  href={personalInfo.socials[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className={`inline-flex size-9 items-center justify-center rounded-xl text-muted-foreground transition-colors duration-300 hover:bg-primary/10 hover:text-primary ${FOCUS}`}
                >
                  <Icon className="size-4" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-12">
          {/* Card 1: Live Simulator & Scientific Lab */}
          <article className={`${CARD} lg:col-span-7`} id="hero-card-lab">
            <Eyebrow icon={FlaskConical}>Interactive Playground</Eyebrow>
            <h2 className="mt-2 mb-1 font-sans text-lg font-semibold tracking-tight text-foreground">
              Live Simulator &amp; Scientific Lab
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground">
              Headless stealth crawling pipelines and Monte Carlo uncertainty simulations, running in your browser.
            </p>

            <div className="mt-5 overflow-hidden rounded-xl border border-border bg-background/80" aria-label="Simulator log preview">
              <div className="flex items-center gap-1.5 border-b border-border px-3 py-2">
                <i className="size-2 rounded-full bg-muted-foreground/30" />
                <i className="size-2 rounded-full bg-muted-foreground/30" />
                <i className="size-2 rounded-full bg-muted-foreground/30" />
                <span className="ml-2 font-mono text-[0.6875rem] text-muted-foreground">~/lab — sim.run</span>
                <span className="ml-auto inline-flex items-center gap-1.5 font-mono text-[0.625rem] font-semibold text-primary">
                  <Pulse />
                  LIVE
                </span>
              </div>
              <div className="h-[4.875rem] overflow-hidden px-3.5 py-2.5 font-mono text-xs leading-[1.375rem]" aria-live="off">
                {visibleLines.map((line, i) => (
                  <div key={line.key} className="flex gap-2 overflow-hidden whitespace-nowrap motion-safe:animate-line-in">
                    <span className="text-muted-foreground/60">$</span>
                    <span className={`truncate ${LOG_TONE[line.t]}`}>{line.s}</span>
                    {i === 2 && <span className="text-primary motion-safe:animate-blink" aria-hidden="true">▋</span>}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
              <span className="font-mono text-xs tabular-nums text-muted-foreground">
                iterations <b className="font-medium text-foreground">{iterations.toLocaleString('en-US')}</b> / 100,000
              </span>
              <a
                href="#playground"
                id="hero-launch-sim"
                className={`group inline-flex h-9 items-center gap-2 rounded-xl bg-primary px-3.5 text-sm font-semibold text-primary-foreground shadow-[0_0_24px_-6px_var(--color-primary)] transition-all duration-300 ${EASE} hover:-translate-y-px hover:shadow-[0_0_32px_-4px_var(--color-primary)] ${FOCUS}`}
              >
                <span>Launch Simulator</span>
                <ArrowRight className={`size-3.5 transition-transform duration-300 ${EASE} group-hover:translate-x-0.5`} aria-hidden="true" />
              </a>
            </div>
          </article>

          {/* Card 2: Dhaka GMT+6 • Worldwide Remote */}
          <article className={`${CARD} lg:col-span-5`} id="hero-card-remote">
            <Eyebrow icon={MapPin}>Dhaka GMT+6 &bull; Worldwide Remote</Eyebrow>
            <div className="mt-5 mb-1 flex items-baseline gap-2">
              <span className="font-mono text-4xl font-semibold leading-none tracking-[-0.04em] tabular-nums text-foreground sm:text-5xl">
                {clockMain}
              </span>
              <span className="font-mono text-sm text-muted-foreground">{clockPeriod}</span>
            </div>
            <p className="text-sm leading-relaxed text-muted-foreground">
              High-bandwidth collaboration across US, European, and APAC timezones.
            </p>

            <div className="mt-5 grid grid-cols-3 gap-2">
              {zoneTimes.map((z) => (
                <div
                  key={z.code}
                  className={`rounded-xl border px-2.5 py-2 transition-colors duration-300 ${
                    z.live ? 'border-primary/30 bg-primary/10' : 'border-border bg-background/50'
                  }`}
                >
                  <div className="flex items-center justify-between text-[0.6875rem] font-semibold text-foreground">
                    <span>{z.code}</span>
                    <span
                      className={`text-[0.5625rem] font-medium uppercase tracking-wider ${
                        z.live ? 'text-primary' : 'text-muted-foreground'
                      }`}
                    >
                      {z.live ? 'Overlap' : 'Async'}
                    </span>
                  </div>
                  <span className="mt-0.5 block font-mono text-xs tabular-nums text-muted-foreground">{z.time}</span>
                </div>
              ))}
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-border pt-4 text-xs text-muted-foreground">
              <Pulse />
              <span>
                <b className="font-medium text-foreground">Async-ready</b> &middot; Open for roles &middot; replies &lt; 12h
              </span>
            </div>
          </article>

          {/* Card 3: Telemetry */}
          <article
            className={`${CARD} p-0 lg:col-span-12`}
            id="hero-card-telemetry"
            aria-label="Key metrics"
          >
            <div className="grid grid-cols-2 divide-border sm:grid-cols-4 sm:divide-x">
              {METRICS.map((m, i) => (
                <div
                  key={m.label}
                  className={`border-border px-6 py-5 ${i % 2 === 0 ? 'border-r sm:border-r-0' : ''} ${
                    i < 2 ? 'border-b sm:border-b-0' : ''
                  }`}
                >
                  <span className="block font-mono text-3xl font-semibold tracking-tight tabular-nums text-foreground">
                    {m.value}
                  </span>
                  <span className="mt-1 block text-xs text-muted-foreground">{m.label}</span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
