import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Check,
  Mail,
  MapPin,
  Code2,
  Terminal,
  Atom,
  Layers,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const EASE = 'ease-[cubic-bezier(0.16,1,0.3,1)]';
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
const CARD = `glass-panel relative overflow-hidden rounded-2xl p-6 transition-all duration-300 ${EASE} hover:-translate-y-0.5`;
const BTN = `glass-item inline-flex h-10 items-center gap-2 rounded-xl px-4 text-sm font-medium !text-foreground hover:-translate-y-px cursor-pointer ${FOCUS}`;

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

const SOCIALS = [
  { key: 'github', label: 'GitHub', icon: GithubIcon },
  { key: 'linkedin', label: 'LinkedIn', icon: LinkedinIcon },
  { key: 'peerlist', label: 'Peerlist', icon: PeerlistIcon },
  { key: 'facebook', label: 'Backbencher Chemist on Facebook', icon: FacebookIcon },
  { key: 'youtube', label: 'YouTube (@randomdhrubo)', icon: YoutubeIcon },
];

function Pulse() {
  return (
    <span className="relative flex size-2 shrink-0" aria-hidden="true">
      <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 motion-safe:animate-ping" />
      <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
    </span>
  );
}

function Eyebrow({ icon: Icon, children }) {
  return (
    <span className="inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">
      <Icon className="size-3.5 text-primary" aria-hidden="true" />
      {children}
    </span>
  );
}

export default function HeroBento({ onCopyEmail }) {
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const [zoneTimes, setZoneTimes] = useState([]);

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
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

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    if (onCopyEmail) onCopyEmail('Email copied to clipboard: ' + personalInfo.email);
    setTimeout(() => setCopied(false), 2500);
  };

  const [clockMain, clockPeriod] = (localTime || '--:--:-- --').split(' ');

  return (
    <section id="hero" className="relative pt-6 pb-14 lg:pt-12 lg:pb-16 text-foreground">
      <div className="container">
        {/* Top Identity Header */}
        <div className="mb-8 flex flex-col gap-5">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="relative size-16 sm:size-20 shrink-0 rounded-2xl border border-[var(--glass-border-strong)] bg-[var(--glass-item)] p-1 shadow-md backdrop-blur-xl">
                <img
                  src={personalInfo.avatar || '/dhrubo-profile.jpg'}
                  alt={personalInfo.fullName}
                  className="size-full rounded-xl object-cover"
                />
                <span
                  className="absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-2 border-background bg-emerald-500"
                  title="Available for Hire"
                />
              </div>

              <div className="flex flex-col gap-1">
                <div className="flex flex-wrap items-center gap-2.5">
                  <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[0.65rem] font-mono font-semibold uppercase tracking-wider bg-[var(--tint-bg)] text-[var(--tint-text)] border border-[var(--tint-border)] backdrop-blur-md">
                    <span className="size-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    Available for Hire
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">@ardhrubo</span>
                </div>

                <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-extrabold leading-[1.08] tracking-tight text-foreground">
                  {personalInfo.fullName || 'Abdur Rahman Dhrubo'}
                </h1>

                <p className="text-sm sm:text-base font-medium text-primary">
                  {personalInfo.role}
                </p>
              </div>
            </div>

            {/* Social Glass Buttons */}
            <div className="flex flex-wrap items-center gap-1.5">
              {SOCIALS.filter((s) => personalInfo.socials?.[s.key]).map(({ key, label, icon: Icon }) => (
                <a
                  key={key}
                  href={personalInfo.socials[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className={`glass-item inline-flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-all duration-200 hover:text-primary hover:-translate-y-0.5 ${FOCUS}`}
                >
                  <Icon className="size-4.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Glass Bento Grid */}
        <div className="grid grid-cols-1 gap-5 xl:grid-cols-12">
          {/* Card 1: Engineering Focus & Primary Actions (7 cols) */}
          <article className={`${CARD} xl:col-span-7 flex flex-col justify-between gap-6`} id="hero-card-focus">
            <div className="flex flex-col gap-4">
              <Eyebrow icon={Layers}>Engineering &amp; Research Focus</Eyebrow>

              <h2 className="font-heading text-2xl sm:text-3xl font-bold leading-snug tracking-tight text-foreground">
                Scalable Web Systems, Distributed Automation &amp;{' '}
                <span className="text-primary">Scientific Computing</span>
              </h2>

              <p className="text-sm sm:text-base leading-relaxed text-muted-foreground">
                Engineering production <strong className="font-semibold text-foreground">React &amp; Next.js</strong> platforms, resilient <strong className="font-semibold text-foreground">Node.js &amp; Python</strong> backend services, high-concurrency <strong className="font-semibold text-foreground">Puppeteer</strong> scraping clusters, and stochastic <strong className="font-semibold text-foreground">Monte Carlo / DFT</strong> simulations.
              </p>

              {/* 3 Glass Capability Tiles */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 pt-1">
                <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-item)] p-3 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <Code2 className="size-3.5 text-primary shrink-0" />
                    <span>Full-Stack Web</span>
                  </div>
                  <p className="mt-1 font-mono text-[0.6875rem] text-muted-foreground">
                    React 19 &middot; Next.js &middot; Node
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-item)] p-3 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <Terminal className="size-3.5 text-primary shrink-0" />
                    <span>Web Automation</span>
                  </div>
                  <p className="mt-1 font-mono text-[0.6875rem] text-muted-foreground">
                    Puppeteer &middot; Headless Pools
                  </p>
                </div>

                <div className="rounded-xl border border-[var(--glass-border)] bg-[var(--glass-item)] p-3 backdrop-blur-md">
                  <div className="flex items-center gap-2 text-xs font-bold text-foreground">
                    <Atom className="size-3.5 text-primary shrink-0" />
                    <span>Scientific Lab</span>
                  </div>
                  <p className="mt-1 font-mono text-[0.6875rem] text-muted-foreground">
                    Python &middot; DFT &middot; Monte Carlo
                  </p>
                </div>
              </div>
            </div>

            {/* Action Bar */}
            <div className="flex flex-wrap items-center gap-2.5 pt-4 border-t border-[var(--glass-border)]">
              <a
                href="#experience"
                id="hero-cta-experience"
                className={`btn-liquid-glass group h-10 px-4 text-xs sm:text-sm font-semibold tracking-wide ${FOCUS}`}
              >
                <span>View Experience</span>
                <ArrowRight className={`size-4 text-white/95 transition-transform duration-200 ${EASE} group-hover:translate-x-1`} aria-hidden="true" />
              </a>
              <a
                href="#projects"
                id="hero-cta-projects"
                className={`btn-liquid-frosted h-10 px-4 text-xs sm:text-sm font-medium ${FOCUS}`}
              >
                Featured Projects
              </a>
              <button
                id="hero-copy-email"
                type="button"
                onClick={handleCopy}
                title="Copy email address"
                aria-label="Copy email"
                className={`${BTN} h-10 px-3.5 text-xs sm:text-sm ${copied ? 'border-primary text-primary' : ''}`}
              >
                {copied ? (
                  <>
                    <Check className="size-4 text-primary" aria-hidden="true" />
                    <span>Copied</span>
                  </>
                ) : (
                  <>
                    <Mail className="size-4 text-primary" aria-hidden="true" />
                    <span>Copy Email</span>
                  </>
                )}
              </button>
            </div>
          </article>

          {/* Card 2: Dhaka GMT+6 • Worldwide Remote (5 cols) */}
          <article className={`${CARD} xl:col-span-5 flex flex-col justify-between`} id="hero-card-remote">
            <div className="relative z-10">
              <Eyebrow icon={MapPin}>Dhaka GMT+6 &bull; Worldwide Remote</Eyebrow>
              <div className="mt-4 mb-1 flex items-baseline gap-2.5">
                <span className="font-mono text-4xl font-black leading-none tracking-tight tabular-nums text-foreground sm:text-5xl">
                  {clockMain}
                </span>
                <span className="font-mono text-sm font-semibold text-accent uppercase tracking-widest">{clockPeriod}</span>
              </div>
              <p className="text-xs sm:text-sm leading-relaxed text-muted-foreground mt-2">
                High-bandwidth asynchronous collaboration across US, European, and APAC timezones.
              </p>

              {/* Timezone Matrices */}
              <div className="mt-5 grid grid-cols-3 gap-2">
                {zoneTimes.map((z) => (
                  <div
                    key={z.code}
                    className={`rounded-xl border p-2.5 transition-all duration-300 ${
                      z.live
                        ? 'border-[var(--tint-border)] bg-[var(--tint-bg)]'
                        : 'border-[var(--glass-border)] bg-[var(--glass-item)]'
                    }`}
                  >
                    <div className="flex items-center justify-between text-[0.6875rem] font-bold text-foreground">
                      <span>{z.code}</span>
                      <span
                        className={`text-[0.5625rem] font-bold uppercase tracking-wider ${
                          z.live ? 'text-accent' : 'text-slate-500'
                        }`}
                      >
                        {z.live ? 'Overlap' : 'Async'}
                      </span>
                    </div>
                    <span className="mt-1 block font-mono text-xs font-semibold tabular-nums text-foreground/90">{z.time}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-4 flex items-center gap-2 border-t border-[var(--glass-border)] pt-3 text-xs text-muted-foreground">
              <Pulse />
              <span>
                <b className="font-bold text-foreground">Async-ready</b> &middot; Open for roles &middot; replies &lt; 12h
              </span>
            </div>
          </article>

          {/* Card 3: Key Telemetry Strip (12 cols) */}
          <article
            className={`${CARD} p-0 xl:col-span-12`}
            id="hero-card-telemetry"
            aria-label="Key metrics"
          >
            <div className="grid grid-cols-2 divide-[var(--glass-border)] sm:grid-cols-4 sm:divide-x">
              {METRICS.map((m, i) => (
                <div
                  key={m.label}
                  className={`border-[var(--glass-border)] px-6 py-5 ${i % 2 === 0 ? 'border-r sm:border-r-0' : ''} ${
                    i < 2 ? 'border-b sm:border-b-0' : ''
                  }`}
                >
                  <span className="block font-mono text-3xl sm:text-4xl font-black tracking-tight tabular-nums text-foreground">
                    {m.value}
                  </span>
                  <span className="mt-1 block text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}
