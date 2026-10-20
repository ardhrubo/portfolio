import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBento from './components/HeroBento';
import ProjectsShowcase from './components/ProjectsShowcase';
import AllProjectsView from './components/AllProjectsView';
import Strategy from './components/Strategy';
import AutomationPlayground from './components/AutomationPlayground';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectDrawer from './components/ProjectDrawer';
import CommandPalette from './components/CommandPalette';
import Toast from './components/Toast';

export default function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light';
  });
  const [currentView, setCurrentView] = useState(() => {
    return window.location.hash === '#all-projects' ? 'all-projects' : 'home';
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
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
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    setToastMessage(`Switched to ${nextTheme === 'light' ? 'Light' : 'Dark'} mode`);
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
        <div className="ambient-grid"></div>
      </div>

      {/* Floating Island Navigation */}
      <Navbar
        currentTheme={theme}
        currentView={currentView}
        onToggleTheme={toggleTheme}
        onOpenCmd={() => setIsCmdOpen(true)}
        onNavigateToAllProjects={navigateToAllProjects}
        onNavigateToHome={navigateToHome}
      />

      {/* Main Content Area */}
      <main>
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
            <Experience />
            <ProjectsShowcase
              onSelectProject={(project) => setSelectedProject(project)}
              onNavigateToAllProjects={navigateToAllProjects}
            />
            <Skills />
            <Strategy />
            <AutomationPlayground
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
    </div>
  );
}
