import React, { useEffect, useState } from 'react';
import Sidebar from './navigation/Sidebar';
import RightDock from './navigation/RightDock';
import MobileTopBar from './navigation/MobileTopBar';
import MobileBottomNav from './navigation/MobileBottomNav';
import useActiveSection from './navigation/useActiveSection';
import MobileMenu from './navigation/MobileMenu';

function useDhakaTime() {
  const [time, setTime] = useState('');
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat('en-US', {
      timeZone: 'Asia/Dhaka',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const timer = setInterval(tick, 30000);
    return () => clearInterval(timer);
  }, []);
  return time;
}

export default function Navbar({
  currentTheme,
  currentView,
  onToggleTheme,
  onOpenCmd,
  onOpenChat,
  onNavigateToHome,
}) {
  const activeSection = useActiveSection(currentView);
  const localTime = useDhakaTime();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleNavClick = (e, item) => {
    setMobileMenuOpen(false);
    if (currentView === 'all-projects' || item.id === 'hero') {
      e.preventDefault();
      onNavigateToHome(item.href);
    }
  };

  const handleBrandClick = (e) => {
    e.preventDefault();
    onNavigateToHome('#hero');
  };

  const shared = { currentTheme, localTime, onToggleTheme, onOpenCmd, onBrandClick: handleBrandClick };

  return (
    <>
      <Sidebar
        {...shared}
        activeSection={activeSection}
        onOpenChat={onOpenChat}
        onNavClick={handleNavClick}
      />
      <RightDock
        {...shared}
        onOpenChat={onOpenChat}
        onNavigateToHome={onNavigateToHome}
      />
      <MobileTopBar {...shared} onOpenMenu={() => setMobileMenuOpen(true)} />
      <MobileMenu open={mobileMenuOpen} onOpenChange={setMobileMenuOpen} activeSection={activeSection} onNavClick={handleNavClick} onOpenGuide={() => { setMobileMenuOpen(false); onOpenChat(); }} />
      <MobileBottomNav activeSection={activeSection} onNavClick={handleNavClick} />
    </>
  );
}
