import React, { useState, useEffect } from 'react';
import {
  Cpu,
  Globe,
  Bot,
  Atom,
  Activity,
  Play,
  Sparkles,
  Terminal,
  ArrowUpRight,
  Layers,
  Database,
  ShieldCheck,
  Workflow,
  Binary,
} from 'lucide-react';

const BLUEPRINTS = [
  {
    id: 'edge-web',
    code: 'SYS-01',
    label: 'Edge Web',
    title: 'Next.js SSR & Distributed API Mesh',
    badge: '99.98% Uptime',
    icon: Globe,
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-400/30',
    metricLabel: 'P95 Latency',
    baseMetric: 18,
    metricUnit: 'ms',
    throughput: '14.2k req/s',
    command: 'npx turbo run build --filter=@edge/gateway && docker compose up -d',
    nodes: [
      {
        id: 'client',
        name: 'React 19 / Next.js',
        role: 'Edge SSR & RSC Stream',
        stat: '100 Lighthouse',
        icon: Layers,
        detail: 'Zero-CLS streaming hydration with optimistic UI state and atomic glass design tokens.',
      },
      {
        id: 'gateway',
        name: 'Node / Express API',
        role: 'JWT & Rate Limiter',
        stat: '< 19ms P95',
        icon: ShieldCheck,
        detail: 'Stateless microservice router with Redis token buckets, schema validation, and circuit breakers.',
      },
      {
        id: 'storage',
        name: 'PostgreSQL + Redis',
        role: 'Read Replicas & Cache',
        stat: '94% Cache Hit',
        icon: Database,
        detail: 'Indexed relational schemas paired with sub-millisecond in-memory query caching.',
      },
    ],
  },
  {
    id: 'crawler-cluster',
    code: 'SYS-02',
    label: 'Crawler Mesh',
    title: 'Autonomous Headless Browser Grid',
    badge: 'Anti-Bot Evasion',
    icon: Bot,
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-500/12',
    accentBorder: 'border-emerald-400/35',
    metricLabel: 'Extraction Rate',
    baseMetric: 420,
    metricUnit: 'pages/m',
    throughput: '2.4M+ records',
    command: 'node cluster/orchestrator.js --workers=16 --stealth --proxy-pool=rotating',
    nodes: [
      {
        id: 'queue',
        name: 'Job Scheduler',
        role: 'Distributed Work Queue',
        stat: '16 Workers',
        icon: Workflow,
        detail: 'Priority URL frontier with automatic exponential backoff, deduplication, and dead-letter recovery.',
      },
      {
        id: 'puppeteer',
        name: 'Puppeteer Stealth',
        role: 'Headless Chromium Pool',
        stat: '99.4% Bypass',
        icon: Bot,
        detail: 'Fingerprinted browser contexts with residential proxy rotation and DOM mutation observers.',
      },
      {
        id: 'pipeline',
        name: 'ETL Normalizer',
        role: 'JSON / Webhook Sink',
        stat: 'Zero Data Loss',
        icon: Terminal,
        detail: 'Real-time schema sanitization streaming structured payloads directly to client webhooks & S3.',
      },
    ],
  },
  {
    id: 'quantum-sim',
    code: 'SYS-03',
    label: 'Quantum Lab',
    title: 'Monte Carlo & Quantum DFT Pipeline',
    badge: '100k+ Iterations',
    icon: Atom,
    accentText: 'text-emerald-400',
    accentBg: 'bg-emerald-500/10',
    accentBorder: 'border-emerald-400/30',
    metricLabel: 'Convergence',
    baseMetric: 99.6,
    metricUnit: '% conf',
    throughput: '10⁵ samples/run',
    command: 'python3 sim_engine.py --iterations=100000 --method=monte-carlo --threads=auto',
    nodes: [
      {
        id: 'dft',
        name: 'ORCA / Gaussian',
        role: 'Molecular Geometry',
        stat: 'B3LYP / def2-TZVP',
        icon: Atom,
        detail: 'Ab initio quantum mechanical optimization extracting frontier orbital energies and dipole moments.',
      },
      {
        id: 'sampler',
        name: 'Monte Carlo Core',
        role: 'Stochastic Matrix Engine',
        stat: '100,000 Runs',
        icon: Binary,
        detail: 'Vectorized NumPy/SciPy probabilistic sampling across multi-variable uncertainty distributions.',
      },
      {
        id: 'telemetry',
        name: 'Risk & QSAR Model',
        role: 'Sensitivity Readout',
        stat: 'p < 0.001',
        icon: Activity,
        detail: 'Automated percentile confidence intervals, Sobol sensitivity indices, and interactive 3D plots.',
      },
    ],
  },
];

export default function EngineeringPillars() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedNodeIdx, setSelectedNodeIdx] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);
  const [liveJitter, setLiveJitter] = useState(0);

  const blueprint = BLUEPRINTS[activeIdx];
  const activeNode = blueprint.nodes[selectedNodeIdx] || blueprint.nodes[0];

  useEffect(() => {
    const timer = setInterval(() => {
      setLiveJitter(Number(((Math.random() - 0.5) * 1.4).toFixed(1)));
    }, 2200);
    return () => clearInterval(timer);
  }, []);

  const handleSelectBlueprint = (idx) => {
    setActiveIdx(idx);
    setSelectedNodeIdx(1);
  };

  const handlePulseTest = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSelectedNodeIdx(0);
    setTimeout(() => setSelectedNodeIdx(1), 450);
    setTimeout(() => setSelectedNodeIdx(2), 900);
    setTimeout(() => setIsSimulating(false), 1500);
  };

  const displayedMetric =
    blueprint.baseMetric > 90 && blueprint.metricUnit.includes('%')
      ? Math.min(99.9, Math.max(98.5, Number((blueprint.baseMetric + liveJitter * 0.1).toFixed(1))))
      : Math.max(1, Math.round(blueprint.baseMetric + liveJitter));

  return (
    <div className="relative flex flex-col justify-between h-full text-foreground select-none">
      <div className="relative z-10">
        {/* Top Bar: Eyebrow + Neutral Frosted Blueprint Switcher */}
        <div className="flex flex-wrap items-center justify-between gap-2.5 mb-4">
          <span className="inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.12em] text-muted-foreground">
            <Cpu className="size-3.5 text-primary" aria-hidden="true" />
            Interactive System Blueprint
          </span>

          {/* Glass Pill Mode Switcher */}
          <div
            role="tablist"
            aria-label="System architecture blueprints"
            className="inline-flex items-center gap-1 rounded-full border border-[var(--glass-border)] bg-[var(--glass-item)] p-1 backdrop-blur-xl"
          >
            {BLUEPRINTS.map((bp, idx) => {
              const Icon = bp.icon;
              const isSelected = idx === activeIdx;
              return (
                <button
                  key={bp.id}
                  role="tab"
                  type="button"
                  aria-selected={isSelected}
                  onClick={() => handleSelectBlueprint(idx)}
                  className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-[0.6875rem] font-semibold transition-all duration-300 cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-300 border border-emerald-400/40 shadow-xs'
                      : 'text-muted-foreground hover:text-foreground border border-transparent'
                  }`}
                >
                  <Icon className={`size-3 ${isSelected ? bp.accentText : ''}`} aria-hidden="true" />
                  <span>{bp.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Dynamic Blueprint Header + Live Telemetry Readout */}
        <div className="flex flex-wrap items-end justify-between gap-3 pb-4 border-b border-[var(--glass-border)]">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className={`rounded-md ${blueprint.accentBg} border ${blueprint.accentBorder} px-1.5 py-0.5 font-mono text-[0.625rem] font-bold ${blueprint.accentText}`}>
                {blueprint.code}
              </span>
              <span className="text-xs font-mono text-muted-foreground">&bull; {blueprint.badge}</span>
            </div>
            <h2 className="font-heading text-xl sm:text-2xl font-bold tracking-tight text-foreground">
              {blueprint.title}
            </h2>
          </div>

          <div className="flex items-center gap-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-item)] px-3.5 py-2 backdrop-blur-md">
            <div>
              <span className="block text-[0.625rem] font-mono uppercase tracking-wider text-muted-foreground">
                {blueprint.metricLabel}
              </span>
              <div className="flex items-baseline gap-1">
                <span className={`font-mono text-lg font-black tabular-nums ${blueprint.accentText}`}>
                  {displayedMetric}
                </span>
                <span className="font-mono text-[0.6875rem] font-semibold text-muted-foreground">
                  {blueprint.metricUnit}
                </span>
              </div>
            </div>
            <div className="h-6 w-px bg-[var(--glass-border)]" />
            <div>
              <span className="block text-[0.625rem] font-mono uppercase tracking-wider text-muted-foreground">
                Throughput
              </span>
              <span className="font-mono text-xs font-bold text-foreground">
                {blueprint.throughput}
              </span>
            </div>
          </div>
        </div>

        {/* Interactive 3-Node Glass Topology Pipeline */}
        <div className="mt-4">
          <div className="flex items-center justify-between text-[0.6875rem] font-mono text-muted-foreground mb-2">
            <span>SELECT ANY NODE TO INSPECT</span>
            <span className="text-foreground/80 flex items-center gap-1.5">
              <span className="size-1.5 rounded-full bg-emerald-400 animate-pulse" />
              LIVE TOPOLOGY
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 relative">
            {blueprint.nodes.map((node, idx) => {
              const NodeIcon = node.icon;
              const isNodeActive = idx === selectedNodeIdx;
              return (
                <button
                  key={node.id}
                  type="button"
                  onClick={() => setSelectedNodeIdx(idx)}
                  className={`group relative text-left rounded-xl p-3.5 transition-all duration-300 backdrop-blur-xl cursor-pointer ${
                    isNodeActive
                      ? 'bg-emerald-500/10 border border-emerald-400/40 shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_10px_24px_-8px_rgba(34,197,94,0.18)] -translate-y-0.5'
                      : 'bg-[var(--glass-item)] border border-[var(--glass-border)] hover:border-[var(--glass-border-strong)] hover:bg-[var(--glass-item-hover)]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-1 mb-2.5">
                    <div
                      className={`flex size-8 items-center justify-center rounded-lg border transition-transform duration-300 group-hover:scale-105 ${
                        isNodeActive
                          ? `${blueprint.accentBg} ${blueprint.accentBorder} ${blueprint.accentText}`
                          : 'bg-white/5 border-[var(--glass-border)] text-muted-foreground'
                      }`}
                    >
                      <NodeIcon className="size-4" aria-hidden="true" />
                    </div>
                    <span
                      className={`rounded-full px-2 py-0.5 font-mono text-[0.625rem] font-semibold ${
                        isNodeActive
                          ? `${blueprint.accentBg} ${blueprint.accentText} border ${blueprint.accentBorder}`
                          : 'bg-white/5 text-muted-foreground border border-transparent'
                      }`}
                    >
                      {node.stat}
                    </span>
                  </div>

                  <div className="font-heading text-xs sm:text-sm font-bold text-foreground flex items-center justify-between">
                    <span>{node.name}</span>
                    <span className="font-mono text-[0.625rem] text-muted-foreground">0{idx + 1}</span>
                  </div>
                  <div className="text-[0.6875rem] text-muted-foreground mt-0.5 truncate">
                    {node.role}
                  </div>
                </button>
              );
            })}
          </div>
        </div>

        {/* Frosted Crystal Inspector Console for Selected Node */}
        <div className="mt-3 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-item)] p-3.5 backdrop-blur-xl shadow-[inset_0_1px_0_rgba(255,255,255,0.1)]">
          <div className="flex flex-wrap items-center justify-between gap-2 mb-1.5">
            <div className="flex items-center gap-2">
              <span className={`inline-flex size-2 rounded-full bg-current ${blueprint.accentText}`} />
              <span className="font-mono text-xs font-bold text-foreground">
                {activeNode.name}
              </span>
              <span className={`text-[0.6875rem] font-mono ${blueprint.accentText}`}>
                // {activeNode.role}
              </span>
            </div>
            <span className="font-mono text-[0.625rem] uppercase tracking-wider text-muted-foreground">
              Node 0{selectedNodeIdx + 1}
            </span>
          </div>

          <p className="text-xs leading-relaxed text-muted-foreground">
            {activeNode.detail}
          </p>

          {/* Command Line Strip */}
          <div className="mt-2.5 flex items-center justify-between gap-2 rounded-lg border border-[var(--glass-border)] bg-black/20 dark:bg-black/35 px-3 py-1.5 font-mono text-[0.6875rem] text-slate-300 overflow-x-auto">
            <div className="flex items-center gap-2 min-w-0">
              <span className={`${blueprint.accentText} font-bold shrink-0`}>$</span>
              <code className="truncate">{blueprint.command}</code>
            </div>
            <span className="shrink-0 text-[0.625rem] text-muted-foreground uppercase tracking-wider">
              {isSimulating ? 'Tracing...' : 'Ready'}
            </span>
          </div>
        </div>
      </div>

      {/* Footer Action Bar */}
      <div className="relative z-10 mt-4 flex flex-wrap items-center justify-between gap-2.5 pt-3 border-t border-[var(--glass-border)]">
        <button
          type="button"
          onClick={handlePulseTest}
          className="btn-liquid-glass h-9 px-3.5 text-xs font-semibold cursor-pointer"
        >
          <Play className={`size-3.5 fill-current ${isSimulating ? 'animate-spin' : ''}`} aria-hidden="true" />
          <span>{isSimulating ? 'Tracing Packet Flow...' : 'Simulate Packet Flow'}</span>
        </button>

        <div className="flex items-center gap-3">
          <a
            href="#simulation-lab"
            className="inline-flex items-center gap-1 text-xs font-semibold text-muted-foreground hover:text-foreground transition-colors"
          >
            <Sparkles className="size-3.5 text-primary" aria-hidden="true" />
            <span>3D Quantum Lab</span>
            <ArrowUpRight className="size-3.5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </div>
  );
}
