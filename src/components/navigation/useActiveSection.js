import { useEffect, useState } from 'react';
import { NAV_ITEMS } from './navConfig';

export default function useActiveSection(currentView) {
  const [activeSection, setActiveSection] = useState('hero');

  useEffect(() => {
    if (currentView === 'all-projects') {
      setActiveSection('projects');
      return undefined;
    }

    const ids = NAV_ITEMS.map((item) => item.id).reverse();
    let frame = 0;

    const compute = () => {
      frame = 0;
      const scrollPos = window.scrollY + window.innerHeight * 0.3;
      const nearBottom =
        window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;

      if (nearBottom) {
        setActiveSection('contact');
        return;
      }

      let found = 'hero';
      for (const id of ids) {
        const el = document.getElementById(id);
        if (el && scrollPos >= el.offsetTop) {
          found = id;
          break;
        }
      }
      setActiveSection(found);
    };

    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(compute);
    };

    compute();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [currentView]);

  return activeSection;
}
