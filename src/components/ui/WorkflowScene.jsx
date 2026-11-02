import { Braces, Check, Database, Layers3, LayoutTemplate, MousePointer2, ShieldCheck, Workflow, Zap } from 'lucide-react';

// A finite visual sequence per phase; all information is also in the adjacent copy.
export default function WorkflowScene({ phase }) {
  return (
    <div className={`workflow-scene workflow-scene--${phase}`} aria-hidden="true">
      <div className="workflow-stage" key={phase}>
        {phase === 0 && <div className="workflow-blueprint">
          <svg className="workflow-connectors" viewBox="0 0 320 200"><path d="M160 65V105H65V145M160 105H255V145" /></svg>
          <div className="workflow-node workflow-node--root"><Layers3 /><span>The idea</span></div>
          <div className="workflow-node workflow-node--left"><LayoutTemplate /><span>Experience</span></div>
          <div className="workflow-node workflow-node--right"><Database /><span>Foundation</span></div>
          <MousePointer2 className="workflow-pointer" size={24} />
        </div>}
        {phase === 1 && <div className="workflow-build">
          <div className="workflow-code"><Braces size={20} /><i /><i /><i /><i /></div>
          <div className="workflow-browser"><div className="workflow-browser-bar"><i /><i /><i /></div><div className="workflow-browser-content"><span /><strong /><i /><i /><div><b /><b /><b /></div></div></div>
          <span className="workflow-chip"><Layers3 size={14} /> Piece by piece</span>
        </div>}
        {phase === 2 && <div className="workflow-pipeline">
          <svg className="workflow-connectors" viewBox="0 0 320 200"><path d="M60 100H260M160 100V45H245M160 100V155H245" /><circle className="workflow-packet" cx="65" cy="100" r="5" /></svg>
          <div className="workflow-node workflow-input"><Database /><span>Input</span></div>
          <div className="workflow-node workflow-engine"><Workflow /><span>Connect</span></div>
          <div className="workflow-output workflow-output--top"><Check size={16} /></div>
          <div className="workflow-output workflow-output--middle"><Zap size={16} /></div>
          <div className="workflow-output workflow-output--bottom"><Check size={16} /></div>
        </div>}
        {phase === 3 && <div className="workflow-verify">
          <div className="workflow-checks">{['The details', 'The journey', 'The edge cases'].map((text, index) => <div key={text} style={{ '--item': index }}><span>{text}</span><Check size={18} /></div>)}</div>
          <div className="workflow-seal"><ShieldCheck size={38} /></div>
        </div>}
      </div>
    </div>
  );
}
