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
    const fine = window.matchMedia('(hover: hover) and (pointer: fine)');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (!fine.matches || reduced.matches || !wrap.current) return undefined;

    const root = document.documentElement;
    const el = wrap.current;
    let x = -100, y = -100, rx = x, ry = y, frame = 0, visible = false;

    const render = () => {
      rx += (x - rx) * 0.2;
      ry += (y - ry) * 0.2;
      ring.current.style.transform = `translate3d(${rx}px, ${ry}px, 0)`;
      frame = Math.abs(x - rx) > 0.1 || Math.abs(y - ry) > 0.1 ? requestAnimationFrame(render) : 0;
    };

    const setVisible = (value) => {
      visible = value;
      el.dataset.visible = String(value);
    };

    const move = (event) => {
      if (event.pointerType && event.pointerType !== 'mouse') return;
      x = event.clientX;
      y = event.clientY;
      dot.current.style.transform = `translate3d(${x}px, ${y}px, 0)`;
      if (!visible) { rx = x; ry = y; setVisible(true); }
      const target = event.target instanceof Element ? event.target : null;
      const state = target?.closest(TEXT_ENTRY) ? 'text' : target?.closest(INTERACTIVE) ? 'hover' : 'default';
      if (el.dataset.state !== state) el.dataset.state = state;
      if (!frame) frame = requestAnimationFrame(render);
    };
    const leave = (event) => { if (!event.relatedTarget) setVisible(false); };
    const hide = () => setVisible(false);
    const down = () => { el.dataset.pressed = 'true'; };
    const up = () => { el.dataset.pressed = 'false'; };

    root.classList.add('has-custom-cursor');
    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('pointerdown', down, { passive: true });
    window.addEventListener('pointerup', up, { passive: true });
    window.addEventListener('blur', hide);
    document.addEventListener('mouseout', leave);

    return () => {
      cancelAnimationFrame(frame);
      root.classList.remove('has-custom-cursor');
      window.removeEventListener('pointermove', move);
      window.removeEventListener('pointerdown', down);
      window.removeEventListener('pointerup', up);
      window.removeEventListener('blur', hide);
      document.removeEventListener('mouseout', leave);
    };
  }, []);

  return (
    <div ref={wrap} className="custom-cursor" data-visible="false" data-state="default" aria-hidden="true">
      <div ref={ring} className="custom-cursor-ring"><span /></div>
      <div ref={dot} className="custom-cursor-dot"><span /></div>
    </div>
  );
}
