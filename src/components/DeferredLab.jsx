import { Component, lazy, Suspense, useEffect, useRef, useState } from 'react';
const MotionLab = lazy(() => import('./InteractiveMotionLab'));
class LabBoundary extends Component {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  render() { return this.state.failed ? <section id="simulation-lab" className="section container"><h2 className="section-title">Science in motion</h2><p>The interactive lab could not load on this device. You can still explore the projects and research.</p></section> : this.props.children; }
}
export default function DeferredLab(props) {
  const marker = useRef(null);
  const [ready, setReady] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { setReady(true); observer.disconnect(); } }, { rootMargin: '400px' });
    observer.observe(marker.current);
    return () => observer.disconnect();
  }, []);
  const placeholder = <section id="simulation-lab" className="section container lab-placeholder"><h2 className="section-title">Science in motion</h2><p role="status">Preparing the interactive experiments…</p></section>;
  return <div ref={marker}><LabBoundary>{ready ? <Suspense fallback={placeholder}><MotionLab {...props} /></Suspense> : placeholder}</LabBoundary></div>;
}
