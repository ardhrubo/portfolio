import { useEffect, useRef } from 'react';
import '../../styles/atmosphere.css';

/** Decorative light field. Pointer updates bypass React and settle to idle. */
export default function Atmosphere() {
  const field = useRef(null);

  useEffect(() => {
    const element = field.current;
    const motion = window.matchMedia('(prefers-reduced-motion: no-preference) and (hover: hover) and (pointer: fine)');
    let frame = 0;
    let lastTime = 0;
    let x = window.innerWidth * .6;
    let y = window.innerHeight * .35;
    let targetX = x;
    let targetY = y;

    const paint = (time) => {
      const elapsed = lastTime ? Math.min(time - lastTime, 50) : 16;
      lastTime = time;
      const easing = 1 - Math.exp(-elapsed / 95);
      x += (targetX - x) * easing;
      y += (targetY - y) * easing;
      element.style.setProperty('--pointer-x', `${x}px`);
      element.style.setProperty('--pointer-y', `${y}px`);
      element.style.setProperty('--field-x', `${(x / window.innerWidth - .5) * 36}px`);
      element.style.setProperty('--field-y', `${(y / window.innerHeight - .5) * 24}px`);
      if (Math.abs(targetX - x) + Math.abs(targetY - y) > .1) {
        frame = requestAnimationFrame(paint);
      } else {
        frame = 0;
        lastTime = 0;
      }
    };
    const stop = () => {
      cancelAnimationFrame(frame);
      frame = 0;
      lastTime = 0;
      element.dataset.active = 'false';
    };
    const move = (event) => {
      if (!motion.matches || document.hidden || event.pointerType === 'touch') return;
      targetX = event.clientX;
      targetY = event.clientY;
      element.dataset.active = 'true';
      if (!frame) frame = requestAnimationFrame(paint);
    };
    const visibility = () => { if (document.hidden) stop(); };
    const preference = () => {
      stop();
      element.style.removeProperty('--field-x');
      element.style.removeProperty('--field-y');
    };

    window.addEventListener('pointermove', move, { passive: true });
    window.addEventListener('blur', stop);
    document.documentElement.addEventListener('pointerleave', stop);
    document.addEventListener('visibilitychange', visibility);
    motion.addEventListener('change', preference);
    return () => {
      stop();
      window.removeEventListener('pointermove', move);
      window.removeEventListener('blur', stop);
      document.documentElement.removeEventListener('pointerleave', stop);
      document.removeEventListener('visibilitychange', visibility);
      motion.removeEventListener('change', preference);
    };
  }, []);

  return (
    <div ref={field} className="atmosphere" aria-hidden="true" data-active="false">
      <div className="atmosphere-color" />
      <svg className="atmosphere-contours" viewBox="0 0 1440 1000" preserveAspectRatio="xMidYMid slice" focusable="false">
        {Array.from({ length: 7 }, (_, index) => (
          <path key={index} d={`M ${-320 + index * 42} -120 C ${1150 + index * 38} 100, ${340 + index * 45} 530, ${1280 + index * 48} 1120`} />
        ))}
      </svg>
      <div className="atmosphere-dots" />
      <div className="atmosphere-pointer">
        <div className="atmosphere-pointer-light" />
      </div>
    </div>
  );
}
