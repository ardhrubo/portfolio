import { useEffect, useRef } from 'react';
import '../../styles/cursor.css';

const INTERACTIVE = 'a, button, [role="button"], [role="tab"], [role="option"], summary, label, select, [data-cursor="hover"]';
const TEXT_ENTRY = 'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="button"]):not([type="submit"]):not([type="reset"]), textarea, [contenteditable="true"]';

/**
 * Decorative, colorful glass dropper pointer. Only enabled for fine,
 * hover-capable pointers without a reduced-motion preference; text fields keep the
 * native I-beam. Purely visual (aria-hidden, pointer-events: none).
 */
export default function CustomCursor() {
  const wrap = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    const root = document.documentElement;
    const pointer = window.matchMedia('(hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
    let actionTimer;

    const setVisible = (value) => {
      if (wrap.current) {
        wrap.current.dataset.visible = String(value);
      }
      root.classList.toggle('has-custom-cursor', value);
    };

    const move = (event) => {
      if (!pointer.matches) { setVisible(false); return; }
      if (dot.current) {
        dot.current.style.transform = `translate3d(${event.clientX}px, ${event.clientY}px, 0)`;
      }
      if (wrap.current?.dataset.visible !== 'true') setVisible(true);
      const target = event.target instanceof Element ? event.target : null;
      const state = target?.closest('video') ? 'text' : target?.closest(TEXT_ENTRY) ? 'text' : target?.closest(INTERACTIVE) ? 'hover' : 'default';
      if (wrap.current && wrap.current.dataset.state !== state) {
        wrap.current.dataset.state = state;
      }
    };

    const hide = () => setVisible(false);
    const preference = () => { if (!pointer.matches) hide(); };
    const leave = (event) => { if (!event.relatedTarget) setVisible(false); };
    const down = () => { if (wrap.current) wrap.current.dataset.pressed = 'true'; };
    const up = () => { if (wrap.current) wrap.current.dataset.pressed = 'false'; };
    const animateAction = (action) => {
      if (!wrap.current) return;
      window.clearTimeout(actionTimer);
      wrap.current.dataset.action = action;
      actionTimer = window.setTimeout(() => {
        if (wrap.current) delete wrap.current.dataset.action;
      }, 620);
    };
    const absorb = () => animateAction('absorb');
    const squeeze = () => animateAction('squeeze');

    window.addEventListener('mousemove', move, { passive: true });
    pointer.addEventListener('change', preference);
    window.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });
    document.addEventListener('copy', absorb);
    document.addEventListener('paste', squeeze);
    document.addEventListener('drop', squeeze);
    window.addEventListener('blur', hide);
    document.addEventListener('mouseleave', hide);
    document.addEventListener('mouseout', leave);

    return () => {
      hide();
      window.clearTimeout(actionTimer);
      window.removeEventListener('mousemove', move);
      pointer.removeEventListener('change', preference);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      document.removeEventListener('copy', absorb);
      document.removeEventListener('paste', squeeze);
      document.removeEventListener('drop', squeeze);
      window.removeEventListener('blur', hide);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseout', leave);
    };
  }, []);

  return (
    <div ref={wrap} className="custom-cursor" data-visible="false" data-state="default" aria-hidden="true">
      <div ref={dot} className="custom-cursor-dot"><span>
        <svg viewBox="0 0 40 60" focusable="false">
          <defs>
            <linearGradient id="pipette-glass" x1="0" y1="0" x2="1" y2="0"><stop stopColor="#ddfff7" stopOpacity=".92"/><stop offset=".35" stopColor="#78cbd5" stopOpacity=".28"/><stop offset=".7" stopColor="#b8a5e8" stopOpacity=".38"/><stop offset="1" stopColor="#e5faff" stopOpacity=".86"/></linearGradient>
            <linearGradient id="pipette-fluid" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#63efba"/><stop offset="1" stopColor="#38b9d9"/></linearGradient>
            <linearGradient id="pipette-cap" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#8ae0d3"/><stop offset=".5" stopColor="#387b85"/><stop offset="1" stopColor="#293c59"/></linearGradient>
          </defs>
          <path className="pipette-bulb" d="M12 18V11a8 8 0 0 1 16 0v7z"/>
          <path className="pipette-shaft" d="M14 22h12v19l-4 10v6h-4v-6l-4-10z"/>
          <path className="pipette-fluid" d="M16 33q4 2 8 0v8l-4 10-4-10z"/>
          <rect className="pipette-collar" x="10" y="17" width="20" height="7" rx="2.5"/>
          <path className="pipette-glint" d="M15 9q1-4 5-4M16.5 26v14M18.5 44l1.5 4"/>
          <path className="pipette-measure" d="M22 28h2m-2 4h2m-2 4h2"/>
          <circle cx="20" cy="57" r="1.1" fill="#d6fff5"/>
        </svg>
      </span></div>
    </div>
  );
}
