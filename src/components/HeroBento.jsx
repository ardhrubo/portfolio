import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  Mail,
  MapPin,
  Sparkles,
  Code2,
  Atom,
  Terminal,
} from 'lucide-react';
import { personalInfo } from '../data/portfolioData';

const FOCUS = 'focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary';

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
  { key: 'youtube', label: 'YouTube', icon: YoutubeIcon },
  { key: 'facebook', label: 'Facebook', icon: FacebookIcon },
];

export default function HeroBento({ onCopyEmail }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = (e) => {
    e.preventDefault();
    navigator.clipboard.writeText(personalInfo.email);
    setCopied(true);
    if (onCopyEmail) onCopyEmail('Email copied: ' + personalInfo.email);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <section id="hero" className="relative pt-6 pb-8 lg:pt-10 lg:pb-10 text-foreground">
      <div className="container">
        {/* Main Personal Showcase Glass Card */}
        <div className="glass-panel relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:p-10 border border-[var(--glass-border)]">
          {/* Dual Ambient Glow: Forest Green + Profile Pic Terracotta (#e26334) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -top-24 -left-24 size-72 rounded-full blur-3xl opacity-35"
            style={{ background: 'radial-gradient(circle, #22c55e 0%, transparent 70%)' }}
          />
          <div
            aria-hidden="true"
            className="pointer-events-none absolute -bottom-24 -right-16 size-80 rounded-full blur-3xl opacity-30"
            style={{ background: 'radial-gradient(circle, #e26334 0%, #22c55e 65%, transparent 100%)' }}
          />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            {/* Left Column: Bold Name, Identity & Actions (7 cols) */}
            <div className="lg:col-span-7 flex flex-col items-start">
              {/* Status & Location Pill */}
              <div className="inline-flex flex-wrap items-center gap-2 px-3.5 py-1.5 rounded-full bg-[var(--tint-bg)] border border-[var(--tint-border)] mb-5">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
                </span>
                <span className="text-xs font-semibold text-[var(--tint-text)]">
                  Available for Roles &amp; Projects
                </span>
                <span className="text-muted-foreground text-xs">&bull;</span>
                <span className="inline-flex items-center gap-1 text-xs font-mono text-muted-foreground">
                  <MapPin className="size-3 text-[#e26334]" />
                  Dhaka, BD
                </span>
              </div>

              {/* Greeting + Big Bold Name */}
              <p className="font-mono text-xs sm:text-sm uppercase tracking-widest text-primary font-semibold mb-1.5">
                Hi, I&apos;m
              </p>
              <h1 className="font-heading text-4xl sm:text-5xl lg:text-[3.5rem] font-black leading-[1.05] tracking-tight text-foreground">
                Alifur Rahman{' '}
                <span
                  className="bg-clip-text text-transparent"
                  style={{
                    backgroundImage: 'linear-gradient(135deg, #4ade80 0%, #22c55e 55%, #e26334 100%)',
                  }}
                >
                  Dhrubo
                </span>
              </h1>

              {/* Authentic Role Tags */}
              <div className="mt-4 flex flex-wrap items-center gap-2">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-[var(--glass-item)] border border-[var(--glass-border)] text-foreground">
                  <Code2 className="size-3.5 text-primary" />
                  Full-Stack Engineer
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-[var(--glass-item)] border border-[var(--glass-border)] text-foreground">
                  <Terminal className="size-3.5 text-[#e26334]" />
                  Web Automation &amp; Scraping
                </span>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl text-xs font-semibold bg-[var(--glass-item)] border border-[var(--glass-border)] text-foreground">
                  <Atom className="size-3.5 text-primary" />
                  Computational Chemistry
                </span>
              </div>

              {/* Crisp, Human Bio */}
              <p className="mt-4 max-w-xl text-sm sm:text-base leading-relaxed text-muted-foreground">
                I build fast <strong className="text-foreground font-semibold">React &amp; Next.js</strong> web products, high-concurrency <strong className="text-foreground font-semibold">Puppeteer</strong> scraping engines, and <strong className="text-foreground font-semibold">Python</strong> scientific simulations.
              </p>

              {/* Primary CTA & Social Bar */}
              <div className="mt-6 flex flex-wrap items-center gap-3">
                <a
                  href="#projects"
                  id="hero-cta-projects"
                  className={`btn-liquid-glass group h-11 px-5 text-sm font-semibold ${FOCUS}`}
                >
                  <span>Explore My Work</span>
                  <ArrowRight className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
                </a>

                <button
                  id="hero-copy-email"
                  type="button"
                  onClick={handleCopy}
                  className={`btn-liquid-frosted h-11 px-4 text-sm font-semibold ${FOCUS}`}
                >
                  {copied ? (
                    <>
                      <Check className="size-4 text-primary" />
                      <span>Copied Email!</span>
                    </>
                  ) : (
                    <>
                      <Mail className="size-4 text-[#e26334]" />
                      <span>Copy Email</span>
                    </>
                  )}
                </button>

                <div className="flex items-center gap-1.5 pl-1">
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
                      <Icon className="size-4" aria-hidden="true" />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Column: Featured Profile Portrait Harmonized with #e26334 & Forest Green (5 cols) */}
            <div className="lg:col-span-5 flex flex-col items-center lg:items-end">
              <div className="relative group">
                {/* Outer Glass Frame blending Forest Green (#22c55e) + Profile Terracotta (#e26334) */}
                <div
                  className="relative rounded-3xl p-2.5 border transition-transform duration-300 group-hover:-translate-y-1"
                  style={{
                    background: 'linear-gradient(145deg, rgba(34, 197, 94, 0.24) 0%, rgba(226, 99, 52, 0.28) 100%)',
                    borderColor: 'rgba(74, 222, 128, 0.45)',
                    boxShadow: '0 20px 44px -12px rgba(226, 99, 52, 0.25), 0 12px 32px -8px rgba(34, 197, 94, 0.25)',
                  }}
                >
                  <div className="relative w-56 h-56 sm:w-64 sm:h-64 overflow-hidden rounded-2xl border-2 border-white/25">
                    <img
                      src={personalInfo.avatar || '/dhrubo-profile.jpg'}
                      alt={personalInfo.fullName}
                      className="size-full object-cover"
                    />
                  </div>

                  {/* Floating Handle Badge at Bottom of Portrait */}
                  <div className="mt-2.5 flex items-center justify-between gap-2 px-3 py-2 rounded-xl bg-background/85 backdrop-blur-md border border-[var(--glass-border)]">
                    <div className="flex items-center gap-2">
                      <span
                        className="size-2.5 rounded-full"
                        style={{ background: 'linear-gradient(135deg, #22c55e, #e26334)' }}
                      />
                      <span className="font-mono text-xs font-bold text-foreground">@ardhrubo</span>
                    </div>
                    <span className="text-[0.68rem] font-mono text-muted-foreground">
                      B.Sc. Chemistry &bull; SWE
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Clean 3-Pill Highlight Strip */}
          <div className="relative z-10 mt-8 pt-6 border-t border-[var(--glass-border)] grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-[var(--glass-item)] border border-[var(--glass-border)]">
              <span className="font-mono text-2xl font-black text-primary">50+</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">Shipped Projects</span>
                <span className="text-[0.68rem] text-muted-foreground">Web Apps, Scrapers &amp; Extensions</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-[var(--glass-item)] border border-[var(--glass-border)]">
              <span className="font-mono text-2xl font-black text-[#e26334]">3+ Yrs</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">Production Experience</span>
                <span className="text-[0.68rem] text-muted-foreground">Full-Stack &amp; Automation Systems</span>
              </div>
            </div>

            <div className="flex items-center gap-3.5 px-4 py-3 rounded-2xl bg-[var(--glass-item)] border border-[var(--glass-border)]">
              <span className="font-mono text-2xl font-black text-primary">B.Sc.</span>
              <div className="flex flex-col">
                <span className="text-xs font-bold text-foreground">Chemistry &amp; Research</span>
                <span className="text-[0.68rem] text-muted-foreground">DFT, QSAR &amp; Monte Carlo Modeling</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
