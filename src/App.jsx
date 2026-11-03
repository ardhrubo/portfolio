import React, { lazy, Suspense, useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBento from './components/HeroBento';
import ProjectsShowcase from './components/ProjectsShowcase';
const AllProjectsView = lazy(() => import('./components/AllProjectsView'));
const ReactionLabView = lazy(() => import('./components/ReactionLabView'));
const PromoReel = lazy(() => import('./components/PromoReel'));
import Strategy from './components/Strategy';
import DeferredLab from './components/DeferredLab';
import Experience from './components/Experience';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDrawer from './components/ProjectDrawer';
import CommandPalette from './components/CommandPalette';
import Toast from './components/Toast';
import CustomCursor from './components/ui/CustomCursor';
import Atmosphere from './components/ui/Atmosphere';
const AiChatModal = lazy(() => import('./components/AiChatModal'));

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });
  const [currentView, setCurrentView] = useState(() => {
    if (window.location.hash === '#promo') return 'promo';
    if (window.location.hash === '#all-projects') return 'all-projects';
    if (window.location.hash === '#reaction-lab') return 'reaction-lab';
    return 'home';
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    const shortcuts = event => {
      if (!(event.metaKey || event.ctrlKey)) return;
      if (event.key.toLowerCase() === 'j') { event.preventDefault(); setIsChatOpen(value => !value); setIsCmdOpen(false); }
    };
    window.addEventListener('keydown', shortcuts);
    return () => window.removeEventListener('keydown', shortcuts);
  }, []);

  useEffect(() => {
    if (currentView !== 'home') return;
    const target = window.location.hash === '#skills' ? 'projects' : window.location.hash.slice(1);
    if (!target) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(target)?.scrollIntoView({ behavior: 'instant', block: 'start' });
    });
    return () => cancelAnimationFrame(frame);
  }, [currentView]);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Listen to hash changes for deep linking between Home, All Projects, and Reaction Lab views
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#skills') { window.location.replace('#projects'); return; }
      if (window.location.hash === '#promo') {
        setCurrentView('promo');
        window.scrollTo({ top: 0, behavior: 'instant' });
      } else if (window.location.hash === '#all-projects') {
        setCurrentView('all-projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (window.location.hash === '#reaction-lab') {
        setCurrentView('reaction-lab');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (currentView !== 'home') {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const handleShowToast = (msg) => {
    setToastMessage(msg);
  };

  const navigateToPromo = () => {
    setCurrentView('promo');
    window.location.hash = '#promo';
    window.scrollTo({ top: 0, behavior: 'instant' });
  };

  const navigateToAllProjects = () => {
    setCurrentView('all-projects');
    window.location.hash = '#all-projects';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToReactionLab = () => {
    setCurrentView('reaction-lab');
    window.location.hash = '#reaction-lab';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToHome = (targetHash = '#hero') => {
    setCurrentView('home');
    window.location.hash = targetHash;
    if (targetHash === '#hero') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <div className="portfolio-app">
      <Atmosphere />

      {/* Desktop Sidebar + Mobile Top/Bottom Bars */}
      <Navbar
        currentTheme={theme}
        currentView={currentView}
        onToggleTheme={toggleTheme}
        onOpenCmd={() => setIsCmdOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onNavigateToAllProjects={navigateToAllProjects}
        onNavigateToReactionLab={navigateToReactionLab}
        onNavigateToPromo={navigateToPromo}
        onNavigateToHome={navigateToHome}
      />

      {/* Main Content Area (Side-by-side: left primary nav rail + right floating action dock) */}
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="app-content-wrapper relative z-10 min-h-screen text-foreground">
        <main id="main-content" className="min-w-0 w-full max-w-6xl mx-auto">
          {currentView === 'promo' ? (
            <Suspense fallback={<p role="status" className="section container">Loading promo reel…</p>}><PromoReel
              onExit={() => navigateToHome('#hero')}
              onNavigateToHome={navigateToHome}
            /></Suspense>
          ) : currentView === 'all-projects' ? (
            <Suspense fallback={<p role="status" className="section container">Loading projects…</p>}><AllProjectsView
              onBackToHome={() => navigateToHome('#hero')}
              onSelectProject={(project) => setSelectedProject(project)}
            /></Suspense>
          ) : currentView === 'reaction-lab' ? (
            <Suspense fallback={<p role="status" className="section container">Loading reaction lab…</p>}><ReactionLabView
              onBackToHome={() => navigateToHome('#simulation-lab')}
            /></Suspense>
          ) : (
            <>
              <HeroBento
                onCopyEmail={handleShowToast}
                onOpenCmd={() => setIsCmdOpen(true)}
                onNavigateToPromo={navigateToPromo}
              />
              <ProjectsShowcase
                onSelectProject={(project) => setSelectedProject(project)}
                onNavigateToAllProjects={navigateToAllProjects}
              />
              <Experience />
              <Strategy />
              <DeferredLab
                onShowToast={handleShowToast}
                onNavigateToReactionLab={navigateToReactionLab}
              />
              <Services />
              <Contact
                onShowToast={handleShowToast}
              />
            </>
          )}
        </main>

        {/* Footer */}
        <Footer
          currentView={currentView}
          onNavigateToAllProjects={navigateToAllProjects}
          onNavigateToReactionLab={navigateToReactionLab}
          onNavigateToPromo={navigateToPromo}
          onNavigateToHome={navigateToHome}
        />
      </div>

      {/* Slide-Over Project Inspector Drawer */}
      {selectedProject && (
        <ProjectDrawer
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
          onSelectProject={(p) => setSelectedProject(p)}
        />
      )}

      {/* Quick Search & Command Palette */}
      <CommandPalette
        isOpen={isCmdOpen}
        onClose={setIsCmdOpen}
        onSelectProject={(p) => setSelectedProject(p)}
        onShowToast={handleShowToast}
        onNavigateToAllProjects={navigateToAllProjects}
        onNavigateToReactionLab={navigateToReactionLab}
        onNavigateToPromo={navigateToPromo}
        onNavigateToHome={navigateToHome}
      />

      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      <CustomCursor />

      {/* Interactive AI Assistant Modal */}
      {isChatOpen && <Suspense fallback={<p role="status" className="dialog-loading">Opening portfolio guide…</p>}><AiChatModal
        isOpen={isChatOpen}
        onClose={setIsChatOpen}
        onSelectProject={(p) => setSelectedProject(p)}
      /></Suspense>}

    </div>
  );
}
