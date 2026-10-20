import React, { useState, useEffect } from 'react';
import { automationScenarios } from '../data/portfolioData';

export default function AutomationPlayground({ onShowToast }) {
  const [selectedScenarioIndex, setSelectedScenarioIndex] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [visibleLogs, setVisibleLogs] = useState([]);
  const [isCompleted, setIsCompleted] = useState(true);
  const [activeTab, setActiveTab] = useState('logs'); // 'logs' | 'output'

  const current = automationScenarios[selectedScenarioIndex];

  // Initialize with all logs visible
  useEffect(() => {
    setVisibleLogs(current.logs);
    setIsCompleted(true);
    setIsRunning(false);
  }, [selectedScenarioIndex, current.logs]);

  const handleRunSimulation = () => {
    if (isRunning) return;
    setIsRunning(true);
    setIsCompleted(false);
    setVisibleLogs([]);
    setActiveTab('logs');

    let currentLogIndex = 0;
    const interval = setInterval(() => {
      if (currentLogIndex < current.logs.length) {
        setVisibleLogs((prev) => [...prev, current.logs[currentLogIndex]]);
        currentLogIndex++;
      } else {
        clearInterval(interval);
        setIsRunning(false);
        setIsCompleted(true);
        if (onShowToast) onShowToast(`Simulation completed in ${current.executionTime}!`);
      }
    }, 280);
  };

  const handleCopyOutput = () => {
    navigator.clipboard.writeText(JSON.stringify(current.sampleOutput, null, 2));
    if (onShowToast) onShowToast('Structured JSON copied to clipboard!');
  };

  return (
    <section id="playground" className="section playground-section">
      <div className="container">
        {/* Section Header */}
        <div className="section-header">
          <div className="section-tag">
            <i className="fa-solid fa-terminal"></i>
            <span>Interactive Proof of Work</span>
          </div>
          <h2 className="section-title">
            Live Web Automation & <span className="gradient-text">Scraper Simulator</span>
          </h2>
          <p className="section-subtitle">
            Don't just take my word for it. Test drive a real-time simulation of my headless Puppeteer crawlers,
            anti-bot evasion engines, and Monte Carlo stochastic algorithms below.
          </p>
        </div>

        {/* Playground Grid */}
        <div className="playground-container">
          {/* Left: Scenario Selectors */}
          <div className="playground-sidebar">
            <span className="playground-sidebar-title">Select Pipeline Scenario</span>
            <div className="scenario-list">
              {automationScenarios.map((scenario, index) => (
                <button
                  key={scenario.id}
                  onClick={() => {
                    if (!isRunning) setSelectedScenarioIndex(index);
                  }}
                  className={`scenario-card ${selectedScenarioIndex === index ? 'active' : ''}`}
                  disabled={isRunning}
                >
                  <div className="scenario-icon">
                    <i className={scenario.icon}></i>
                  </div>
                  <div className="scenario-info">
                    <div className="scenario-header-row">
                      <span className="scenario-name">{scenario.name}</span>
                      <span className="scenario-tag-pill">{scenario.tag}</span>
                    </div>
                    <p className="scenario-desc">{scenario.description}</p>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Right: Terminal Console */}
          <div className="playground-terminal">
            <div className="terminal-topbar">
              <div className="terminal-dots">
                <span className="terminal-dot red"></span>
                <span className="terminal-dot yellow"></span>
                <span className="terminal-dot green"></span>
              </div>
              <div className="terminal-tabs">
                <button
                  className={`terminal-tab-btn ${activeTab === 'logs' ? 'active' : ''}`}
                  onClick={() => setActiveTab('logs')}
                >
                  <i className="fa-solid fa-code"></i> Execution Stream
                </button>
                <button
                  className={`terminal-tab-btn ${activeTab === 'output' ? 'active' : ''}`}
                  onClick={() => setActiveTab('output')}
                >
                  <i className="fa-solid fa-brackets-curly"></i> Extracted JSON
                </button>
              </div>
              <div className="terminal-status-indicator">
                <span className={`status-pulse ${isRunning ? 'running' : 'idle'}`}></span>
                <span style={{ fontSize: '0.75rem', fontFamily: 'var(--font-mono)' }}>
                  {isRunning ? 'EXEC_ACTIVE' : 'IDLE_READY'}
                </span>
              </div>
            </div>

            {/* Metrics Bar */}
            <div className="terminal-metrics-bar">
              <div className="metric-chip">
                <span className="metric-chip-label">Latency</span>
                <span className="metric-chip-val" style={{ color: 'var(--accent-primary)' }}>
                  {current.executionTime}
                </span>
              </div>
              <div className="metric-chip">
                <span className="metric-chip-label">Success Rate</span>
                <span className="metric-chip-val" style={{ color: 'var(--accent-secondary)' }}>
                  {current.successRate}
                </span>
              </div>
              <div className="metric-chip">
                <span className="metric-chip-label">Yield</span>
                <span className="metric-chip-val">{current.recordsFound}</span>
              </div>
              <button
                className={`btn-run-simulation ${isRunning ? 'running' : ''}`}
                onClick={handleRunSimulation}
                disabled={isRunning}
              >
                <i className={`fa-solid ${isRunning ? 'fa-spinner fa-spin' : 'fa-play'}`}></i>
                <span>{isRunning ? 'Running Engine...' : 'Run Live Simulation'}</span>
              </button>
            </div>

            {/* Terminal Body */}
            <div className="terminal-viewport">
              {activeTab === 'logs' ? (
                <div className="terminal-log-content">
                  {visibleLogs.map((log, i) => (
                    <div key={i} className="terminal-log-row">
                      <span className="log-arrow">&gt;</span>
                      <span className="log-text">{log}</span>
                    </div>
                  ))}
                  {isRunning && (
                    <div className="terminal-log-row blink-row">
                      <span className="log-arrow">&gt;</span>
                      <span className="cursor-blink">&#9608;</span>
                    </div>
                  )}
                  {isCompleted && !isRunning && (
                    <div className="terminal-log-row success-summary">
                      <i className="fa-solid fa-circle-check" style={{ color: 'var(--accent-primary)', marginRight: '8px' }}></i>
                      <span>Pipeline execution successfully finalized with zero unhandled exceptions.</span>
                    </div>
                  )}
                </div>
              ) : (
                <div className="terminal-json-content">
                  <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: '10px' }}>
                    <button onClick={handleCopyOutput} className="btn-copy-json">
                      <i className="fa-regular fa-copy"></i> Copy Clean JSON
                    </button>
                  </div>
                  <pre className="json-pre">
                    {JSON.stringify(current.sampleOutput, null, 2)}
                  </pre>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
