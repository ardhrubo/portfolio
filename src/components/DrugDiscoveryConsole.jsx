import React, { useState, useEffect } from 'react';
import {
  FlaskConical,
  Activity,
  CheckCircle2,
  Play,
  RotateCcw,
  Sparkles,
  Layers,
  ShieldCheck,
  Zap,
  ArrowRight
} from 'lucide-react';

const CANDIDATES = [
  {
    id: 'lead-01',
    code: 'DH-Lead-01',
    name: 'Pyridine-Triazole Carboxamide',
    target: 'SARS-CoV-2 Mpro (PDB: 7BQY)',
    deltaG: -9.8, // kcal/mol
    ki: '64 nM',
    rmsd: '0.82 Å',
    lipinski: '5/5 Compliant',
    mw: '392.4 g/mol',
    logP: '2.64',
    hbd: 2,
    hba: 5,
    tpsa: '78.3 Å²',
    qed: '0.84',
    interactions: [
      { residue: 'Glu166', type: 'H-Bond', distance: '1.92 Å', strength: 'Strong' },
      { residue: 'His41', type: 'π-π Stacking', distance: '3.41 Å', strength: 'Moderate' },
      { residue: 'Ser144', type: 'H-Bond', distance: '2.14 Å', strength: 'Strong' },
      { residue: 'Cys145', type: 'Catalytic Dyad Contact', distance: '2.78 Å', strength: 'High' },
    ],
    status: 'High Affinity Lead'
  },
  {
    id: 'analog-04',
    code: 'DH-Analog-04',
    name: 'Fluorinated Isoquinoline Derivative',
    target: 'SARS-CoV-2 Mpro (PDB: 7BQY)',
    deltaG: -8.9, // kcal/mol
    ki: '210 nM',
    rmsd: '1.14 Å',
    lipinski: '5/5 Compliant',
    mw: '418.5 g/mol',
    logP: '3.10',
    hbd: 1,
    hba: 6,
    tpsa: '84.1 Å²',
    qed: '0.78',
    interactions: [
      { residue: 'Cys145', type: 'H-Bond', distance: '2.08 Å', strength: 'Strong' },
      { residue: 'Gln189', type: 'Water-Mediated Polar', distance: '2.85 Å', strength: 'Moderate' },
      { residue: 'His41', type: 'π-Cation Interaction', distance: '3.62 Å', strength: 'Moderate' },
      { residue: 'Met165', type: 'Hydrophobic Pocket', distance: '3.90 Å', strength: 'Stabilizing' },
    ],
    status: 'Optimized Analog'
  },
  {
    id: 'scaffold-09',
    code: 'DH-Scaffold-09',
    name: 'Indole-3-Sulfonamide Core',
    target: 'SARS-CoV-2 Mpro (PDB: 7BQY)',
    deltaG: -8.2, // kcal/mol
    ki: '980 nM',
    rmsd: '1.45 Å',
    lipinski: '5/5 Compliant',
    mw: '365.4 g/mol',
    logP: '2.15',
    hbd: 2,
    hba: 4,
    tpsa: '72.6 Å²',
    qed: '0.73',
    interactions: [
      { residue: 'Gly143', type: 'H-Bond', distance: '2.35 Å', strength: 'Moderate' },
      { residue: 'Asn142', type: 'Polar Dipole Contact', distance: '3.12 Å', strength: 'Moderate' },
      { residue: 'Glu166', type: 'Backbone H-Bond', distance: '2.40 Å', strength: 'Moderate' },
    ],
    status: 'Initial Hit Scaffold'
  }
];

export default function DrugDiscoveryConsole({ onShowToast }) {
  const [selectedIdx, setSelectedIdx] = useState(0);
  const [isSimulating, setIsSimulating] = useState(false);
  const [simStep, setSimStep] = useState(10);
  const [liveDeltaG, setLiveDeltaG] = useState(CANDIDATES[0].deltaG);

  const current = CANDIDATES[selectedIdx];

  useEffect(() => {
    setLiveDeltaG(current.deltaG);
    setSimStep(10);
    setIsSimulating(false);
  }, [selectedIdx, current.deltaG]);

  const handleRunSimulation = () => {
    if (isSimulating) return;
    setIsSimulating(true);
    setSimStep(1);

    const baseG = current.deltaG;
    let step = 1;
    const interval = setInterval(() => {
      step++;
      setSimStep(step);
      // Realistic Monte Carlo energy minimization fluctuation settling to minimum
      const fluctuation = (Math.random() - 0.45) * 0.3 * (1 - step / 10);
      setLiveDeltaG(Number((baseG + fluctuation).toFixed(2)));

      if (step >= 10) {
        clearInterval(interval);
        setIsSimulating(false);
        setLiveDeltaG(baseG);
        if (onShowToast) {
          onShowToast(`Docking converged for ${current.code}: ΔG = ${baseG} kcal/mol (Ki = ${current.ki})`);
        }
      }
    }, 220);
  };

  return (
    <div className="flex flex-col justify-between h-full text-foreground select-none">
      <div>
        {/* Header Eyebrow */}
        <div className="flex flex-wrap items-center justify-between gap-2 mb-2.5">
          <span className="inline-flex items-center gap-2 text-[0.6875rem] font-bold uppercase tracking-[0.1em] text-muted-foreground">
            <FlaskConical className="size-3.5 text-accent" aria-hidden="true" />
            Computer-Aided Drug Design (CADD) &bull; Molecular Docking
          </span>
          <span className="text-[0.625rem] font-mono uppercase tracking-wider font-semibold text-emerald-700 dark:text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 px-2.5 py-0.5 rounded-full">
            AutoDock Vina Engine
          </span>
        </div>

        {/* Title */}
        <h2 className="font-heading text-xl font-bold tracking-tight text-foreground">
          In Silico Drug Discovery &amp; Receptor Docking
        </h2>
        <p className="mt-1 text-xs sm:text-sm text-muted-foreground leading-relaxed">
          Screening small molecule inhibitors against target active binding pockets. Evaluating binding free energy (&Delta;G), Ki inhibition, and conformational pose stability.
        </p>

        {/* Candidate Selector Tabs */}
        <div className="mt-4 flex flex-wrap gap-1.5 p-1 rounded-xl border border-[var(--glass-border)] bg-[var(--glass-item)]">
          {CANDIDATES.map((cand, idx) => (
            <button
              key={cand.id}
              onClick={() => setSelectedIdx(idx)}
              className={`flex-1 min-w-[110px] flex items-center justify-between px-3 py-1.5 rounded-lg text-xs font-mono transition-all duration-200 cursor-pointer ${
                selectedIdx === idx
                  ? 'bg-[var(--tint-bg)] text-[var(--tint-text)] border border-[var(--tint-border)] shadow-xs font-bold'
                  : 'text-muted-foreground hover:text-foreground hover:bg-[var(--glass-item-hover)]'
              }`}
            >
              <span>{cand.code}</span>
              <span className="text-[0.6875rem] opacity-80">{cand.deltaG} kcal</span>
            </button>
          ))}
        </div>

        {/* Docking Telemetry Dashboard */}
        <div className="mt-3.5 rounded-xl border border-[var(--border-subtle)] bg-[var(--bg-secondary)] p-4 shadow-xs">
          {/* Top Row: Target & Affinity Score */}
          <div className="flex flex-wrap items-center justify-between gap-3 pb-3 border-b border-[var(--border-subtle)]">
            <div>
              <div className="text-[0.6875rem] font-mono uppercase tracking-wider text-muted-foreground">
                Target Macromolecule
              </div>
              <div className="text-xs sm:text-sm font-semibold text-foreground flex items-center gap-1.5">
                <span className="size-2 rounded-full bg-accent animate-pulse" />
                {current.target}
              </div>
            </div>

            {/* Binding Free Energy Gauge */}
            <div className="text-right">
              <div className="text-[0.6875rem] font-mono uppercase tracking-wider text-muted-foreground">
                Binding Free Energy (&Delta;G)
              </div>
              <div className="font-mono text-lg sm:text-xl font-black text-accent tracking-tight">
                {liveDeltaG} <span className="text-xs font-medium text-muted-foreground">kcal/mol</span>
              </div>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 my-3 text-xs font-mono">
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2">
              <span className="text-[0.625rem] text-muted-foreground block">Inhibition Ki</span>
              <span className="font-bold text-foreground text-sm">{current.ki}</span>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2">
              <span className="text-[0.625rem] text-muted-foreground block">Pose RMSD</span>
              <span className="font-bold text-foreground text-sm">{current.rmsd}</span>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2">
              <span className="text-[0.625rem] text-muted-foreground block">Druglikeness</span>
              <span className="font-bold text-accent text-sm">5/5 Rule-of-5</span>
            </div>
            <div className="rounded-lg border border-[var(--border-subtle)] bg-[var(--bg-card)] p-2">
              <span className="text-[0.625rem] text-muted-foreground block">QED Score</span>
              <span className="font-bold text-foreground text-sm">{current.qed}</span>
            </div>
          </div>

          {/* Active Pocket Residue Interactions */}
          <div className="pt-2 border-t border-[var(--border-subtle)]">
            <div className="flex items-center justify-between text-[0.6875rem] font-mono text-muted-foreground mb-1.5">
              <span>Binding Pocket Key Residue Contacts</span>
              <span className="text-primary font-semibold">{current.interactions.length} Active H-Bonds / Contacts</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5">
              {current.interactions.map((inter, i) => (
                <div
                  key={i}
                  className="flex items-center justify-between px-2.5 py-1 rounded-md bg-[var(--bg-card)] border border-[var(--border-subtle)] text-[0.6875rem] font-mono"
                >
                  <span className="font-semibold text-foreground flex items-center gap-1.5">
                    <span className="size-1.5 rounded-full bg-accent" />
                    {inter.residue}
                  </span>
                  <span className="text-muted-foreground">{inter.type} ({inter.distance})</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action Footer */}
      <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-[var(--glass-border)]">
        <button
          type="button"
          onClick={handleRunSimulation}
          disabled={isSimulating}
          className={`h-9 px-4 text-xs font-semibold font-mono transition-all duration-200 cursor-pointer ${
            isSimulating
              ? 'btn-liquid-amber'
              : 'btn-liquid-frosted border-emerald-500/25 text-foreground hover:border-emerald-500/50'
          }`}
        >
          <Play className={`size-3.5 ${isSimulating ? 'animate-spin text-white' : 'text-primary'}`} />
          <span>
            {isSimulating ? `Minimizing Conformation (Cycle ${simStep}/10)...` : 'Run Energy Minimization'}
          </span>
        </button>

        <a
          href="#projects"
          className="btn-liquid-glass h-9 px-4 text-xs font-semibold"
        >
          <span>Inspect Research &amp; Simulations</span>
          <ArrowRight className="size-3.5 text-white/90" />
        </a>
      </div>
    </div>
  );
}
