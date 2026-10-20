import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Stats from './components/Stats';
import Strategy from './components/Strategy';
import AutomationPlayground from './components/AutomationPlayground';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Skills from './components/Skills';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import ProjectModal from './components/ProjectModal';
import Toast from './components/Toast';

export default function App() {
  // Default is 'light' (The requested Greenish-White aesthetic)
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem('portfolio-theme') || 'light';
  });
  const [selectedProject, setSelectedProject] = useState(null);
  const [toastMessage, setToastMessage] = useState(null);

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('portfolio-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(nextTheme);
    setToastMessage(`Switched to ${nextTheme === 'light' ? 'Greenish White' : 'Dark Forest'} mode`);
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

      {/* Main Navigation with Theme Switcher */}
      <Navbar currentTheme={theme} onToggleTheme={toggleTheme} />

      {/* Main Content Sections */}
      <main>
        <Hero onCopyEmail={handleShowToast} />
        <Stats />
        <Strategy />
        <AutomationPlayground onShowToast={handleShowToast} />
        <Projects onSelectProject={(project) => setSelectedProject(project)} />
        <Experience />
        <Skills />
        <Services />
        <Contact onShowToast={handleShowToast} />
      </main>

      {/* Footer */}
      <Footer />

      {/* Project Deep-Dive Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          onClose={() => setSelectedProject(null)}
        />
      )}

      {/* Toast Feedback */}
      <Toast
        message={toastMessage}
        onClose={() => setToastMessage(null)}
      />
    </div>
  );
}
