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
  const ring = useRef(null);

  useEffect(() => {
    const fineQuery = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    let isBound = false;
    let frame = 0;
    let x = -100, y = -100, rx = x, ry = y, visible = false;
    const root = document.documentElement;

    const render = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      }
      frame = Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1 ? requestAnimationFrame(render) : 0;
    };

    const setVisible = (value) => {
      visible = value;
      if (wrap.current) {
        wrap.current.dataset.visible = String(value);
      }
    };

    const move = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      }
      if (!visible) {
        rx = x;
        ry = y;
        setVisible(true);
      }
      const target = event.target instanceof Element ? event.target : null;
      const state = target?.closest(TEXT_ENTRY) ? 'text' : target?.closest(INTERACTIVE) ? 'hover' : 'default';
      if (wrap.current && wrap.current.dataset.state !== state) {
        wrap.current.dataset.state = state;
      }
      if (!frame) frame = requestAnimationFrame(render);
    };

    const hide = () => setVisible(false);
    const leave = (event) => { if (!event.relatedTarget) setVisible(false); };
    const down = () => { if (wrap.current) wrap.current.dataset.pressed = 'true'; };
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
      cancelAnimationFrame(frame);
      frame = 0;
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
      <div ref={ring} className="custom-cursor-ring"><span /></div>
      <div ref={dot} className="custom-cursor-dot"><span /></div>
    </div>
  );
}
