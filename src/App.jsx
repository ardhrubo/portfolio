import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import HeroBento from './components/HeroBento';
import ProjectsShowcase from './components/ProjectsShowcase';
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
  const [selectedProject, setSelectedProject] = useState(null);
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    setToastMessage(`Switched to ${nextTheme === 'light' ? 'Light' : 'Dark'} mode`);
  };

  const handleShowToast = (msg) => {
    setToastMessage(msg);
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
        onToggleTheme={toggleTheme}
        onOpenCmd={() => setIsCmdOpen(true)}
      />

      {/* Main Content Sections */}
      <main>
        <HeroBento
          onCopyEmail={handleShowToast}
          onOpenCmd={() => setIsCmdOpen(true)}
        />
        <ProjectsShowcase
          onSelectProject={(project) => setSelectedProject(project)}
        />
        <Strategy />
        <AutomationPlayground
          onShowToast={handleShowToast}
        />
        <Experience />
        <Skills />
        <Services />
        <Contact
          onShowToast={handleShowToast}
        />
      </main>

      {/* Footer */}
      <Footer />

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
      />

      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
