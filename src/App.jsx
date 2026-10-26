import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBento from './components/HeroBento';
import ProjectsShowcase from './components/ProjectsShowcase';
import AllProjectsView from './components/AllProjectsView';
import Strategy from './components/Strategy';
import InteractiveMotionLab from './components/InteractiveMotionLab';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDrawer from './components/ProjectDrawer';
import CommandPalette from './components/CommandPalette';
import Toast from './components/Toast';
import AiChatModal from './components/AiChatModal';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'dark';
  });
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === '#all-projects' ? 'all-projects' : 'home';
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    document.documentElement.classList.toggle('dark', theme === 'dark');
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  // Listen to hash changes for deep linking between Home and All Projects view
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === '#all-projects') {
        setCurrentView('all-projects');
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (currentView === 'all-projects') {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, [currentView]);

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'light' ? 'dark' : 'light';
      setToastMessage(`Switched to ${nextTheme === 'light' ? 'Light' : 'Dark'} mode`);
      return nextTheme;
    });
  };

  const handleShowToast = (msg) => {
    setToastMessage(msg);
  };

  const navigateToAllProjects = () => {
    setCurrentView('all-projects');
    window.location.hash = '#all-projects';
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
      {/* Dynamic Ambient Background */}
      <div className="ambient-background" aria-hidden="true">
        <div className="ambient-blob-1"></div>
        <div className="ambient-blob-2"></div>
        <div className="ambient-blob-3"></div>
        <div className="sidebar-ambient-glow"></div>
        <div className="ambient-grid"></div>
      </div>

      {/* Desktop Sidebar + Mobile Top/Bottom Bars */}
      <Navbar
        currentTheme={theme}
        currentView={currentView}
        onToggleTheme={toggleTheme}
        onOpenCmd={() => setIsCmdOpen(true)}
        onOpenChat={() => setIsChatOpen(true)}
        onNavigateToAllProjects={navigateToAllProjects}
        onNavigateToHome={navigateToHome}
      />

      {/* Main Content Area (Side-by-side: left primary nav rail + right floating action dock) */}
      <a className="skip-link" href="#main-content">Skip to content</a>
      <div className="app-content-wrapper relative z-10 min-h-screen text-foreground">
        <main id="main-content" className="min-w-0 w-full max-w-6xl mx-auto">
          {currentView === 'all-projects' ? (
            <AllProjectsView
              onBackToHome={() => navigateToHome('#hero')}
              onSelectProject={(project) => setSelectedProject(project)}
            />
          ) : (
            <>
              <HeroBento
                onCopyEmail={handleShowToast}
                onOpenCmd={() => setIsCmdOpen(true)}
              />
              <ProjectsShowcase
                onSelectProject={(project) => setSelectedProject(project)}
                onNavigateToAllProjects={navigateToAllProjects}
              />
              <Experience />
              <Skills />
              <Strategy />
              <InteractiveMotionLab
                onShowToast={handleShowToast}
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
      />

      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />

      {/* Interactive AI Assistant Modal */}
      <AiChatModal
        isOpen={isChatOpen}
        onClose={setIsChatOpen}
        onSelectProject={(p) => setSelectedProject(p)}
      />

      {/* Floating Chat with Dhrubo Launcher */}
      <button
        onClick={() => setIsChatOpen(prev => !prev)}
        className="floating-ai-launcher"
        title="Chat with Dhrubo (⌘J / Ctrl+J)"
        aria-label="Chat with Dhrubo"
      >
        <div className="floating-ai-avatar-box">
          <img src="/dhrubo-profile.jpg" alt="Dhrubo" className="floating-ai-avatar-img" />
          <span className="floating-ai-online-dot"></span>
        </div>
        <span className="floating-ai-text">Chat with Dhrubo</span>
        <span className="floating-ai-ping"></span>
      </button>
    </div>
  );
}
