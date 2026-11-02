import { useCallback, useEffect, useRef, useState } from 'react';
import { ArrowLeft, FlaskConical, RotateCcw, Sparkles, TriangleAlert, Lock } from 'lucide-react';
import Button from './ui/Button';
import { personalInfo } from '../data/portfolioData';
import { reagents, findReaction, reactionCount, reactions } from '../data/reactionLabData';
import '../styles/reaction-lab.css';

const STORAGE_KEY = 'reaction-lab-discoveries';
const POUR_MS = 650;
const byId = Object.fromEntries(reagents.map(r => [r.id, r]));
const allReactions = Object.values(reactions);
const missions = [
  { target: 'fizz', goal: 'Release carbon dioxide', hint: 'Combine the weak acid with the mild base.' },
  { target: 'pink', goal: 'Turn the indicator pink', hint: 'The cabbage indicator detects an acid.' },
  { target: 'teal', goal: 'Turn the indicator blue-green', hint: 'Try the cabbage indicator with a mild base.' },
  { target: 'neutral', goal: 'Keep the indicator purple', hint: 'A neutral solvent preserves this colour.' },
  { target: 'foam', goal: 'Release oxygen with an enzyme', hint: 'Catalase breaks down hydrogen peroxide.' },
  { target: 'layers', goal: 'Create two separate liquid layers', hint: 'Choose a polar and a non-polar liquid.' },
];

function loadDiscoveries() {
  try { return new Set(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')); }
  catch { return new Set(); }
}

/** Erlenmeyer flask whose liquid level, colour, and effect follow the game phase. */
function Flask({ phase, first, second, result, runId }) {
  const level = phase === 'idle' ? 0 : phase === 'pour1' ? 70 : 128;
  const mixed = first && second ? `color-mix(in srgb, ${first.color}, ${second.color})` : first?.color;
  const liquid = phase === 'react' ? (result.liquid || mixed) : phase === 'pour1' ? first?.color : mixed;
  const stream = phase === 'pour1' ? first?.color : phase === 'pour2' ? second?.color : null;
  const effect = phase === 'react' ? result.effect : 'none';

  return (
    <div className="rl-flask" data-effect={effect} data-phase={phase} style={{ '--liquid': liquid || 'transparent', '--top': result?.top || 'transparent' }}>
      <svg viewBox="0 0 200 250" role="img" aria-label={phase === 'react' ? `Flask: ${result.title}` : 'Empty flask'}>
        <defs>
          <clipPath id="rl-flask-clip"><path d="M83 26 H117 V92 L169 204 Q175 219 160 221 H40 Q25 219 31 204 L83 92 Z" /></clipPath>
          <linearGradient id="rl-glass" x1="0" x2="1"><stop offset="0" stopColor="#fff" stopOpacity=".35" /><stop offset=".25" stopColor="#fff" stopOpacity=".05" /><stop offset="1" stopColor="#fff" stopOpacity=".18" /></linearGradient>
        </defs>
        {stream && <rect key={`s-${phase}-${runId}`} className="rl-stream" x="96" y="-10" width="8" height="200" rx="4" fill={stream} />}
        <g clipPath="url(#rl-flask-clip)">
          <rect className="rl-liquid" x="0" y="0" width="200" height="250" style={{ transform: `translateY(${222 - level}px)` }} />
          <rect className="rl-layer-top" x="0" y="0" width="200" height="34" style={{ transform: `translateY(${222 - level}px)` }} />
          <g key={`b-${runId}`} className="rl-bubbles">
            {[48, 70, 92, 110, 128, 146, 60, 120].map((x, i) => <circle key={i} cx={x} cy={214} r={3 + (i % 3) * 2} style={{ '--i': i }} />)}
          </g>
        </g>
        <path className="rl-glass" d="M83 26 H117 V92 L169 204 Q175 219 160 221 H40 Q25 219 31 204 L83 92 Z" fill="url(#rl-glass)" />
        <rect className="rl-rim" x="77" y="18" width="46" height="10" rx="5" />
        <g key={`fx-${runId}`}>
          <g className="rl-foam">{[[86, 30, 16], [104, 18, 20], [120, 34, 15], [96, 2, 14], [112, -8, 12], [78, 48, 12], [126, 52, 11]].map(([x, y, r], i) => <circle key={i} cx={x} cy={y} r={r} style={{ '--i': i }} />)}</g>
          <g className="rl-smoke">{[[92, 6], [108, -4], [100, -18]].map(([x, y], i) => <circle key={i} cx={x} cy={y} r={14} style={{ '--i': i }} />)}</g>
          <circle className="rl-shock" cx="100" cy="40" r="20" />
          <g className="rl-warn"><circle cx="100" cy="150" r="70" /></g>
        </g>
      </svg>
    </div>
  );
}

const MOOD_AVATARS = {
  idle: personalInfo.avatar,
  watching: personalInfo.avatar,
  ready: personalInfo.avatar,
  calm: personalInfo.avatar,
  excited: '/reactions/excited.jpg',
  blush: '/reactions/curious.jpg',
  curious: '/reactions/curious.jpg',
  confused: '/reactions/bored.jpg',
  shocked: '/reactions/shocked.jpg',
  singed: '/reactions/singed.jpg',
  bored: '/reactions/bored.jpg',
  worried: '/reactions/worried.jpg',
};

/** Real portrait with reactive facial expressions matching the chemistry outcome. */
function Portrait({ mood, quote, runId }) {
  const avatarSrc = MOOD_AVATARS[mood] || personalInfo.avatar;
  return (
    <figure className="rl-face" data-mood={mood}>
      <div className="rl-face-frame" key={`f-${runId}`}>
        <img
          key={avatarSrc}
          src={avatarSrc}
          alt={`${personalInfo.name}, reacting: ${mood}`}
          width="320"
          height="320"
        />
        <span className="rl-fx rl-tint" aria-hidden="true" />
        <span className="rl-fx rl-blush" aria-hidden="true"><i /><i /></span>
        <span className="rl-fx rl-sweat" aria-hidden="true"><i /><i /></span>
        <span className="rl-fx rl-soot" aria-hidden="true"><i /><i /><i /><i /></span>
        <span className="rl-fx rl-foamface" aria-hidden="true"><i /><i /><i /><i /><i /></span>
        <span className="rl-fx rl-sparkle" aria-hidden="true"><i /><i /><i /></span>
        <span className="rl-fx rl-mark" aria-hidden="true" />
      </div>
      <figcaption className="rl-quote" key={`q-${runId}`}>{quote}</figcaption>
    </figure>
  );
}

export default function ReactionLabView({ onBackToHome }) {
  const [selected, setSelected] = useState([]);
  const [phase, setPhase] = useState('idle');
  const [result, setResult] = useState(null);
  const [runId, setRunId] = useState(0);
  const [discovered, setDiscovered] = useState(loadDiscoveries);
  const timers = useRef([]);
  const [missionIndex, setMissionIndex] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [score, setScore] = useState(0);
  const [solved, setSolved] = useState(false);
  const [hintOpen, setHintOpen] = useState(false);
  const [freePlay, setFreePlay] = useState(false);
  const mission = missions[missionIndex];
  const complete = missionIndex >= missions.length;


  const clearTimers = () => { timers.current.forEach(clearTimeout); timers.current = []; };
  useEffect(() => {
    window.scrollTo({ top: 0 });
    // Preload dynamic reaction avatars into browser memory
    Object.values(MOOD_AVATARS).forEach(src => {
      const img = new Image();
      img.src = src;
    });
    return clearTimers;
  }, []);

  const busy = phase === 'pour1' || phase === 'pour2';
  const [first, second] = selected.map(id => byId[id]);

  const finish = useCallback((reaction) => {
    setResult(reaction);
    setPhase('react');
    if (reaction.id === 'none') return;
    setDiscovered(prev => {
      if (prev.has(reaction.id)) return prev;
      const next = new Set(prev).add(reaction.id);
      try { localStorage.setItem(STORAGE_KEY, JSON.stringify([...next])); } catch { /* storage unavailable */ }
      return next;
    });
  }, []);

  const toggleReagent = id => {
    if (busy) return;
    if (phase === 'react') { setPhase('idle'); setResult(null); setSelected([id]); return; }
    setSelected(prev => prev.includes(id) ? prev.filter(x => x !== id) : prev.length >= 2 ? [prev[0], id] : [...prev, id]);
  };

  const mix = () => {
    if (selected.length !== 2 || busy || (!freePlay && (solved || complete))) return;
    clearTimers();
    const reaction = findReaction(...selected);
    if (!freePlay) {
      setAttempts(n => n + 1);
      if (reaction.id === mission.target) {
        setSolved(true);
        setScore(n => n + Math.max(25, 100 - attempts * 20 - (hintOpen ? 15 : 0)));
      }
    }
    setRunId(n => n + 1);
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { finish(reaction); return; }
    setResult(null);
    setPhase('pour1');
    timers.current.push(setTimeout(() => setPhase('pour2'), POUR_MS));
    timers.current.push(setTimeout(() => finish(reaction), POUR_MS * 2 + 150));
  };

  const clear = () => { clearTimers(); setSelected([]); setResult(null); setPhase('idle'); };
  const resetProgress = () => {
    setDiscovered(new Set());
    try { localStorage.removeItem(STORAGE_KEY); } catch { /* storage unavailable */ }
  };

  const mood = phase === 'react' ? result.mood : busy ? 'watching' : selected.length ? 'ready' : 'idle';
  const quote = phase === 'react' ? result.quote : busy ? 'Careful… pouring.' : selected.length === 2 ? 'Go on, mix them.' : selected.length === 1 ? 'And the second one?' : 'Pick two reagents.';

  return (
    <div className="reaction-lab-page">
      <div className="all-projects-topbar">
        <div className="container">
          <button type="button" onClick={onBackToHome} className="btn-back-home"><ArrowLeft size={16} aria-hidden="true" /><span>Back to Home</span></button>
          <div className="all-projects-breadcrumbs">
            <button type="button" onClick={onBackToHome} className="breadcrumb-link">Home</button>
            <span className="breadcrumb-sep">/</span>
            <span className="breadcrumb-active">Reaction lab</span>
          </div>
        </div>
      </div>

      <section className="container rl-section" aria-labelledby="rl-title">
        <header className="section-header">
          <div className="section-tag"><FlaskConical size={15} aria-hidden="true" /><span>Reaction lab · game</span></div>
          <h1 id="rl-title" className="section-title">Mix it. <span className="gradient-text">Watch me react.</span></h1>
          <p className="section-subtitle">Pick two reagents, pour them in, and see how the reaction — and my face — turns out.</p>
          <p className="rl-disclaimer">Scripted, simplified chemistry for fun — not a simulator. Don’t try the hazardous mixes at home.</p>
        </header>

        <div className="rl-mission" aria-live="polite">
          <div><small>{freePlay ? 'FREE PLAY' : complete ? 'ALL CHALLENGES COMPLETE' : `CHALLENGE ${missionIndex + 1} / ${missions.length}`} · {score} points</small>
            <h2>{freePlay ? 'Discover your own combinations' : complete ? 'Lab complete. Well done!' : mission.goal}</h2>
            <p>{!freePlay && solved && phase === 'react' ? 'Correct reaction! Continue to the next challenge.' : !freePlay && phase === 'react' && !solved ? 'That outcome does not meet the goal. Use what you learned and try another pair.' : 'Select two bottles, then mix. Observe the flask and the reaction result.'}</p>
            {!freePlay && hintOpen && mission && <p>{mission.hint}</p>}
          </div>
          <div className="rl-actions">
            {!freePlay && !complete && !solved && <Button variant="secondary" disabled={busy} onClick={() => setHintOpen(true)}>Hint (−15 points)</Button>}
            {!freePlay && solved && !busy && <Button onClick={() => { clear(); setMissionIndex(n => n + 1); setSolved(false); setAttempts(0); setHintOpen(false); }}>Next challenge</Button>}
            <Button variant="secondary" disabled={busy} onClick={() => { clear(); setFreePlay(v => !v); }}>{freePlay ? 'Challenges' : 'Free play'}</Button>
            {complete && !freePlay && <Button onClick={() => { clear(); setMissionIndex(0); setScore(0); setAttempts(0); setHintOpen(false); setSolved(false); }}>Play again</Button>}
          </div>
        </div>
        <div className="rl-layout">
          <div className="rl-stage">
            <Flask phase={phase} first={first} second={second} result={result} runId={runId} />
            <Portrait mood={mood} quote={quote} runId={runId} />
          </div>

          <div className="rl-panel">
            <div className="rl-mixbar" aria-label="Selected reagents">
              {[0, 1].map(i => {
                const r = selected[i] && byId[selected[i]];
                return <span key={i} className={`rl-slot ${r ? 'is-filled' : ''}`} style={r ? { '--swatch': r.color } : undefined}>{r ? r.name : `Reagent ${i + 1}`}</span>;
              })}
            </div>

            <div className="rl-shelf" role="group" aria-label="Reagent shelf">
              {reagents.map(r => (
                <button key={r.id} type="button" className="rl-reagent" aria-pressed={selected.includes(r.id)} disabled={busy} onClick={() => toggleReagent(r.id)} style={{ '--swatch': r.color }}>
                  <span className="rl-swatch" aria-hidden="true" />
                  <span className="rl-reagent-text"><strong>{r.name}</strong><small>{r.formula} · {r.note}</small></span>
                </button>
              ))}
            </div>

            <div className="rl-actions">
              <Button onClick={mix} disabled={selected.length !== 2 || busy || (!freePlay && (solved || complete))}><FlaskConical size={17} aria-hidden="true" />{busy ? 'Pouring…' : 'Mix'}</Button>
              <Button variant="secondary" onClick={clear} disabled={busy || (!selected.length && !result)}><RotateCcw size={16} aria-hidden="true" />Clear</Button>
            </div>

            <div className="rl-result" aria-live="polite">
              {phase === 'react' ? (
                <>
                  <p className="rl-result-title">{result.effect === 'warn' || result.effect === 'boom' ? <TriangleAlert size={16} aria-hidden="true" /> : <Sparkles size={16} aria-hidden="true" />}{result.title}</p>
                  <p>{result.text}</p>
                  <code>{result.equation}</code>
                </>
              ) : <p className="rl-result-hint">{busy ? 'Reacting…' : 'Results appear here.'}</p>}
            </div>
          </div>
        </div>

        <div className="rl-log">
          <div className="rl-log-head">
            <h2>Discovery log <span>{discovered.size} / {reactionCount}</span></h2>
            {discovered.size > 0 && <button type="button" className="rl-log-reset" onClick={resetProgress}>Reset progress</button>}
          </div>
          <ul>
            {allReactions.map(r => {
              const found = discovered.has(r.id);
              return (
                <li key={r.id} className={found ? 'is-found' : ''} style={found ? { '--swatch': r.liquid } : undefined}>
                  {found ? <><span className="rl-swatch" aria-hidden="true" /><span><strong>{r.title}</strong><small>{r.pair.map(id => byId[id].name).join(' + ')}</small></span></>
                    : <><Lock size={14} aria-hidden="true" /><span><strong>Undiscovered</strong><small>Keep mixing</small></span></>}
                </li>
              );
            })}
          </ul>
        </div>
      </section>
    </div>
  );
}
