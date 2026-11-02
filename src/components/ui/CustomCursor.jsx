import { useEffect, useRef } from 'react';
import '../../styles/cursor.css';

const INTERACTIVE = 'a, button, [role="button"], [role="tab"], [role="option"], summary, label, select, [data-cursor="hover"]';
const TEXT_ENTRY = 'input:not([type="checkbox"]):not([type="radio"]):not([type="range"]):not([type="button"]):not([type="submit"]):not([type="reset"]), textarea, [contenteditable="true"]';

/**
 * Decorative pointer: an emerald dot that tracks the mouse exactly and a glass ring
 * that trails it and expands over interactive elements. Only enabled for fine,
 * hover-capable pointers without a reduced-motion preference; text fields keep the
 * native I-beam. Purely visual (aria-hidden, pointer-events: none).
 */
export default function CustomCursor() {
  const wrap = useRef(null);
  const dot = useRef(null);

  useEffect(() => {
    const fineQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let isBound = false;
    let visible = false;
    const root = document.documentElement;

    const setVisible = (value) => {
      visible = value;
      if (wrap.current) {
        wrap.current.dataset.visible = String(value);
      }
    };

    const move = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${event.clientX - 13}px, ${event.clientY - 35}px, 0)`;
      }
      if (!visible) {
        setVisible(true);
      }
      const target = event.target instanceof Element ? event.target : null;
      const state = target?.closest(TEXT_ENTRY) ? 'text' : target?.closest(INTERACTIVE) ? 'hover' : 'default';
      if (wrap.current && wrap.current.dataset.state !== state) {
        wrap.current.dataset.state = state;
      }
    };

    const hide = () => setVisible(false);
    const leave = (event) => { if (!event.relatedTarget) setVisible(false); };
    const down = () => {
      if (wrap.current) wrap.current.dataset.pressed = 'true';
    };
    const up = () => { if (wrap.current) wrap.current.dataset.pressed = 'false'; };

    const bind = () => {
      if (isBound || !wrap.current) return;
      isBound = true;
      root.classList.add('has-custom-cursor');
      window.addEventListener('pointermove', move, { passive: true });
      window.addEventListener('pointerdown', down, { passive: true });
      window.addEventListener('pointerup', up, { passive: true });
      window.addEventListener('blur', hide);
      document.addEventListener('mouseleave', hide);
      document.addEventListener('mouseout', leave);
    };

    const unbind = () => {
      if (!isBound) return;
      isBound = false;
      hide();
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('blur', hide);
      document.removeEventListener('mouseleave', hide);
      document.removeEventListener('mouseout', leave);
    };

    const evaluatePreferences = () => {
      const eligible = fineQuery.matches && !reducedQuery.matches;
      if (eligible) {
        bind();
      } else {
        unbind();
      }
    };

    evaluatePreferences();

    fineQuery.addEventListener('change', evaluatePreferences);
    reducedQuery.addEventListener('change', evaluatePreferences);

    return () => {
      fineQuery.removeEventListener('change', evaluatePreferences);
      reducedQuery.removeEventListener('change', evaluatePreferences);
      unbind();
    };
  }, []);

  return (
    <div ref={wrap} className="custom-cursor" data-visible="false" data-state="default" aria-hidden="true">
      <div ref={dot} className="custom-cursor-dot"><span><svg viewBox="0 0 32 38" focusable="false"><defs><linearGradient id="flask-glass" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#c1fff2" stopOpacity=".9"/><stop offset="1" stopColor="#7ba8ff" stopOpacity=".3"/></linearGradient><linearGradient id="flask-liquid" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#42f5c5"/><stop offset=".52" stopColor="#35b5f4"/><stop offset="1" stopColor="#a16cff"/></linearGradient></defs><path className="flask-outline" d="M10 2h12M12 2v11L4 29a5 5 0 0 0 4.6 7h14.8a5 5 0 0 0 4.6-7l-8-16V2"/><path className="flask-liquid" d="M7 24h18l3 6a3 3 0 0 1-2.8 4H6.8A3 3 0 0 1 4 30z"/><path className="flask-glint" d="M13 5v8L6.5 27"/><path className="flask-rim" d="M9 2h14"/></svg></span></div>
    </div>
  );
}
