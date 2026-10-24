import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Check,
  Mail,
  Search,
  FlaskConical,
  MapPin,
  Sparkles,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';
import DrugDiscoveryConsole from './DrugDiscoveryConsole';

const EASE = 'ease-[cubic-bezier(0.16,1,0.3,1)]';
const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';
const CARD = `relative overflow-hidden rounded-2xl border border-[var(--glass-border)] bg-[var(--glass-bg)] backdrop-blur-xl p-6 shadow-[var(--surface-highlight)] transition-all duration-300 ${EASE} hover:border-[var(--glass-border-strong)] hover:-translate-y-0.5 hover:shadow-[0_16px_40px_-8px_rgba(0,0,0,0.5),_inset_0_1px_0_0_rgba(255,255,255,0.15)]`;
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
      <span className="absolute inline-flex size-full rounded-full bg-orange-400 opacity-75 motion-safe:animate-ping" />
      <span className="relative inline-flex size-2 rounded-full bg-orange-500" />
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

export default function HeroBento({ onCopyEmail, onOpenCmd }) {
  const [copied, setCopied] = useState(false);
  const [localTime, setLocalTime] = useState('');
  const [zoneTimes, setZoneTimes] = useState([]);

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

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    if (onCopyEmail) onCopyEmail('Email copied to clipboard: ' + personalInfo.email);
    setTimeout(() => setCopied(false), 2500);
  };

  const [clockMain, clockPeriod] = (localTime || '--:--:-- --').split(' ');

  return (
    <section id="hero" className="relative px-4 pt-8 pb-16 sm:px-6 lg:px-8 lg:pt-12 text-foreground">
      <div className="mx-auto w-full max-w-5xl">
        {/* Intro Header */}
        <div className="mb-8 flex flex-col gap-5">
          <div className="flex items-center gap-3.5">
            <div className="relative size-12 shrink-0">
              <img
                src={personalInfo.avatar || '/dhrubo-profile.jpg'}
                alt={personalInfo.name}
                className="size-full rounded-2xl border-2 border-primary/30 object-cover shadow-sm"
              />
              <span
                className="absolute -right-0.5 -bottom-0.5 size-3.5 rounded-full border-2 border-background bg-orange-500"
                title="Active & Available"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold uppercase tracking-wider text-primary">Portfolio &amp; Research</span>
              <p className="text-sm font-medium text-muted-foreground">{personalInfo.role}</p>
            </div>
          </div>

          <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-extrabold leading-[1.05] tracking-tight text-foreground">
            Hi, I'm{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-orange-500 bg-clip-text text-transparent">
              {personalInfo.name}
            </span>
            .
          </h1>

          <p className="max-w-2xl text-base sm:text-lg leading-relaxed text-muted-foreground">
            Full-Stack Software Engineer &amp; Computational Researcher with{' '}
            <strong className="font-semibold text-foreground underline decoration-orange-500/50 underline-offset-4">50+ shipped projects</strong>.
            I engineer scalable React/Next.js web applications, resilient backend microservices, and high-performance scientific simulations.
          </p>

          <div className="flex flex-wrap items-center gap-2.5 pt-1">
            <a
              href="#experience"
              id="hero-cta-experience"
              className={`group inline-flex h-11 items-center gap-2.5 rounded-xl px-5 text-sm font-semibold text-white bg-blue-600 hover:bg-blue-700 shadow-md shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-0.5 transition-all duration-200 cursor-pointer ${FOCUS}`}
            >
              <span>View Experience</span>
              <ArrowRight className={`size-4 text-white/90 transition-transform duration-200 ${EASE} group-hover:translate-x-1`} aria-hidden="true" />
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
              className={`${BTN} w-11 justify-center px-0 ${copied ? 'border-primary text-primary' : ''}`}
            >
              {copied ? <Check className="size-4 text-blue-500 dark:text-blue-400" aria-hidden="true" /> : <Mail className="size-4" aria-hidden="true" />}
            </button>
            {/* Social links */}
            <div className="flex flex-wrap items-center gap-1 sm:ml-auto">
              {SOCIALS.filter((s) => personalInfo.socials?.[s.key]).map(({ key, label, icon: Icon }) => (
                <a
                  key={key}
                  href={personalInfo.socials[key]}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={label}
                  aria-label={label}
                  className={`inline-flex size-10 items-center justify-center rounded-xl text-muted-foreground transition-all duration-300 hover:bg-primary/10 hover:text-primary hover:-translate-y-0.5 ${FOCUS}`}
                >
                  <Icon className="size-4.5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-12">
          {/* Card 1: Drug Discovery & Molecular Docking Simulation (7 cols) */}
          <article className={`${CARD} lg:col-span-7 flex flex-col justify-between`} id="hero-card-lab">
            <DrugDiscoveryConsole onShowToast={onCopyEmail} />
          </article>

          {/* Card 2: Dhaka GMT+6 • Worldwide Remote (5 cols) */}
          <article className={`${CARD} lg:col-span-5 flex flex-col justify-between`} id="hero-card-remote">
            <div>
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

            <div className="mt-4 flex items-center gap-2 border-t border-border/80 pt-3 text-xs text-muted-foreground">
              <Pulse />
              <span>
                <b className="font-bold text-foreground">Async-ready</b> &middot; Open for roles &middot; replies &lt; 12h
              </span>
            </div>
          </article>

          {/* Card 3: Key Telemetry Strip (12 cols) */}
          <article
            className={`${CARD} p-0 lg:col-span-12`}
            id="hero-card-telemetry"
            aria-label="Key metrics"
          >
            <div className="grid grid-cols-2 divide-border/80 sm:grid-cols-4 sm:divide-x">
              {METRICS.map((m, i) => (
                <div
                  key={m.label}
                  className={`border-border/80 px-6 py-5 ${i % 2 === 0 ? 'border-r sm:border-r-0' : ''} ${
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
