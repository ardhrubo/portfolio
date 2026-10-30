import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react';
import { Atom } from 'lucide-react';
import ReactionLoader from './ui/ReactionLoader';
const MotionLab = lazy(() => import('./InteractiveMotionLab'));
class LabBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() {
    return this.state.failed ? (
      <section id="simulation-lab" className="section container">
        <div className="section-header">
          <div className="section-tag">
            <Atom size={15} aria-hidden="true" />
            <span>05 / 3D playground</span>
          </div>
          <h2 className="section-title">Science, <span className="gradient-text">in motion.</span></h2>
          <p className="section-subtitle">The interactive lab could not load on this device. You can still explore the projects and research.</p>
        </div>
      </section>
    ) : this.props.children;
  }
}
export default function DeferredLab(props) {
  const marker = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setReady(true); observer.disconnect(); } }, { rootMargin: '400px' });
    observer.observe(marker.current);
    return () => observer.disconnect();
  }, []);
  const placeholder = (
    <section id="simulation-lab" className="section container lab-placeholder">
      <div className="section-header">
        <div className="section-tag">
          <Atom size={15} aria-hidden="true" />
          <span>05 / 3D playground</span>
        </div>
        <h2 className="section-title">Science, <span className="gradient-text">in motion.</span></h2>
        {ready ? <ReactionLoader label="Preparing the interactive experiments…" /> : <p className="section-subtitle">Illustrative experiments in motion.</p>}
      </div>
    </section>
  );
  return <div ref={marker}><LabBoundary>{ready ? <Suspense fallback={placeholder}><MotionLab {...props} /></Suspense> : placeholder}</LabBoundary></div>;
}
