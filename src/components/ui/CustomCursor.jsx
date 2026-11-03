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
      const state = target?.closest(TEXT_ENTRY) ? 'text' : target?.closest(INTERACTIVE) ? 'hover' : 'default';
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
      <div ref={dot} className="custom-cursor-dot"><span><svg viewBox="0 0 44 52" focusable="false"><defs><linearGradient id="pipette-glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#d8fff8" stopOpacity=".95"/><stop offset=".5" stopColor="#87dfff" stopOpacity=".8"/><stop offset="1" stopColor="#b993ff" stopOpacity=".86"/></linearGradient><linearGradient id="pipette-fluid" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#39edba"/><stop offset=".55" stopColor="#28b8ec"/><stop offset="1" stopColor="#8b68f6"/></linearGradient></defs><path className="pipette-bulb" d="M15 4Q15 2 18 2h8q3 0 3 2l2 9q0 4-4 5H17q-4-1-4-5z"/><path className="pipette-shaft" d="M17 17h10v20l-5 12-5-12z"/><path className="pipette-fluid" d="M18.5 28h7v9l-3.5 8-3.5-8z"/><path className="pipette-glint" d="M16.5 6l1.5 8m1 6v6m5 1v10"/><path className="pipette-collar" d="M15 16h14"/></svg></span></div>
    </div>
  );
}
