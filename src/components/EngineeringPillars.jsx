import React, { useState } from 'react';
import {
  Cpu,
  Globe,
  Bot,
  Atom,
  Play,
  Layers,
  Database,
  ShieldCheck,
  Workflow,
  Terminal,
  Binary,
  Activity,
} from 'lucide-react';

const BLUEPRINTS = [
  {
    id: 'edge-web',
    label: 'Full-Stack Web',
    icon: Globe,
    latency: '18ms P95',
    command: 'npx turbo run build --filter=@web/app && docker compose up -d',
    nodes: [
      { id: 'client', name: 'React 19 / Next.js', role: 'SSR & Glass UI', stat: '100 Perf', icon: Layers },
      { id: 'gateway', name: 'Node / Express API', role: 'REST & Auth Mesh', stat: '< 19ms', icon: ShieldCheck },
      { id: 'storage', name: 'PostgreSQL + Redis', role: 'Indexed Storage', stat: '99.9% Up', icon: Database },
    ],
  },
  {
    id: 'crawler-cluster',
    label: 'Scraping Engine',
    icon: Bot,
    latency: '420 pages/m',
    command: 'node cluster/orchestrator.js --workers=16 --stealth --proxy-pool',
    nodes: [
      { id: 'queue', name: 'Task Scheduler', role: 'Priority Queue', stat: '16 Workers', icon: Workflow },
      { id: 'puppeteer', name: 'Puppeteer Stealth', role: 'Headless Chromium', stat: '99.4% Pass', icon: Bot },
      { id: 'pipeline', name: 'JSON / CSV Sink', role: 'Webhook Stream', stat: '2.4M+ Rows', icon: Terminal },
    ],
  },
  {
    id: 'quantum-sim',
    label: 'Scientific Lab',
    icon: Atom,
    latency: '100k Runs',
    command: 'python3 monte_carlo.py --iterations=100000 --dft=orca-b3lyp',
    nodes: [
      { id: 'dft', name: 'ORCA / Gaussian', role: 'DFT Geometry', stat: 'B3LYP', icon: Atom },
      { id: 'sampler', name: 'Monte Carlo Core', role: 'Stochastic Engine', stat: '10⁵ Runs', icon: Binary },
      { id: 'telemetry', name: 'Risk Telemetry', role: '95% Confidence', stat: 'p < 0.001', icon: Activity },
    ],
  },
];

export default function EngineeringPillars() {
  const [activeIdx, setActiveIdx] = useState(0);
  const [selectedNodeIdx, setSelectedNodeIdx] = useState(1);
  const [isSimulating, setIsSimulating] = useState(false);

  const blueprint = BLUEPRINTS[activeIdx];

  const handlePulseTest = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSelectedNodeIdx(0);
    setTimeout(() => setSelectedNodeIdx(1), 400);
    setTimeout(() => setSelectedNodeIdx(2), 800);
    setTimeout(() => setIsSimulating(false), 1250);
  };

  return (
    <div className="flex flex-col justify-between h-full gap-4 text-foreground select-none">
      {/* Header Row: Title + Pill Switcher */}
      <div className="flex flex-wrap items-center justify-between gap-2">
        <span className="inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-wider text-muted-foreground">
          <Cpu className="size-3.5 text-primary" aria-hidden="true" />
          System Architecture
        </span>

        <div
          role="tablist"
          aria-label="System blueprints"
          className="inline-flex items-center gap-1 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-item)] p-1"
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
                onClick={() => {
                  setActiveIdx(idx);
                  setSelectedNodeIdx(1);
                }}
                className={`inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-xs font-semibold transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? 'bg-[var(--tint-bg)] text-[var(--tint-text)] border border-[var(--tint-border)]'
                    : 'text-muted-foreground hover:text-foreground border border-transparent'
                }`}
              >
                <Icon className="size-3.5" aria-hidden="true" />
                <span>{bp.label}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* 3-Node Visual Pipeline */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
        {blueprint.nodes.map((node, idx) => {
          const NodeIcon = node.icon;
          const isNodeActive = idx === selectedNodeIdx;
          return (
            <button
              key={node.id}
              type="button"
              onClick={() => setSelectedNodeIdx(idx)}
              className={`group text-left rounded-xl p-3.5 transition-all duration-200 cursor-pointer ${
                isNodeActive
                  ? 'bg-[var(--tint-bg)] border border-[var(--tint-border)] shadow-xs -translate-y-0.5'
                  : 'bg-[var(--glass-item)] border border-[var(--glass-border)] hover:border-[var(--glass-border-strong)]'
              }`}
            >
              <div className="flex items-center justify-between mb-2.5">
                <div
                  className={`flex size-8 items-center justify-center rounded-lg border ${
                    isNodeActive
                      ? 'bg-emerald-500/20 border-emerald-400/40 text-primary'
                      : 'bg-white/5 border-[var(--glass-border)] text-muted-foreground'
                  }`}
                >
                  <NodeIcon className="size-4" aria-hidden="true" />
                </div>
                <span className="font-mono text-[0.65rem] font-semibold text-primary">
                  {node.stat}
                </span>
              </div>
              <div className="font-heading text-xs sm:text-sm font-bold text-foreground truncate">
                {node.name}
              </div>
              <div className="text-[0.7rem] text-muted-foreground truncate mt-0.5">
                {node.role}
              </div>
            </button>
          );
        })}
      </div>

      {/* Compact Command & Trace Bar */}
      <div className="flex items-center justify-between gap-2 rounded-xl border border-[var(--glass-border)] bg-black/20 dark:bg-black/40 px-3 py-2 font-mono text-xs">
        <div className="flex items-center gap-2 min-w-0 text-slate-300">
          <span className="text-primary font-bold shrink-0">$</span>
          <code className="truncate text-[0.7rem]">{blueprint.command}</code>
        </div>
        <button
          type="button"
          onClick={handlePulseTest}
          className="shrink-0 inline-flex items-center gap-1.5 rounded-lg bg-[var(--tint-bg)] border border-[var(--tint-border)] px-2.5 py-1 text-[0.6875rem] font-sans font-semibold text-[var(--tint-text)] hover:bg-[var(--tint-bg-hover)] transition-colors cursor-pointer"
        >
          <Play className={`size-3 fill-current ${isSimulating ? 'animate-spin' : ''}`} aria-hidden="true" />
          <span>{isSimulating ? 'Tracing' : 'Trace'}</span>
        </button>
      </div>
    </div>
  );
}
