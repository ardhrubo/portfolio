import React, { useState, useRef, useEffect } from 'react';
import { personalInfo, projectsData, experienceData, skillsData, educationData, certificationsData } from '../data/portfolioData';

export default function AiChatModal({ isOpen, onClose, onSelectProject }) {
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'ai',
      text: `Hi there! 👋 I'm **Dhrubo's AI Assistant**. Ask me anything about his work experience, flagship projects, scientific simulations, or availability!`,
      suggestedQuestions: [
        "What is Dhrubo's work experience?",
        "What are his flagship projects?",
        "Tell me about his scientific research",
        "What is his education background?",
        "Is Dhrubo available for hire?"
      ]
    }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setTimeout(() => {
        if (inputRef.current) inputRef.current.focus();
      }, 100);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape' && isOpen) {
        onClose(false);
      }
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'j') {
        e.preventDefault();
        onClose(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleSend = (textToSend) => {
    const query = (textToSend || input).trim();
    if (!query) return;

    const userMsg = {
      id: 'u_' + Date.now(),
      sender: 'user',
      text: query
    };

    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate intelligent streaming assistant response grounded in real portfolio data
    setTimeout(() => {
      const response = generateAiResponse(query);
      setMessages(prev => [
        ...prev,
        {
          id: 'ai_' + Date.now(),
          sender: 'ai',
          text: response.text,
          projectLink: response.projectLink,
          action: response.action,
          suggestedQuestions: response.suggestedQuestions
        }
      ]);
      setIsTyping(false);
    }, 450);
  };

  const generateAiResponse = (q) => {
    const lower = q.toLowerCase();

    // 1. Work Experience & Career Timeline
    if (
      lower.includes('experience') ||
      lower.includes('timeline') ||
      lower.includes('career') ||
      lower.includes('role') ||
      lower.includes('company') ||
      lower.includes('dataautomators') ||
      lower.includes('upwork') ||
      lower.includes('crilab') ||
      lower.includes('peopleperhour')
    ) {
      return {
        text: `Dhrubo has a strong background across software engineering, web crawling, and scientific computing:\n\n• **Academic Researcher** at **Jagannath University, Dhaka** (Mar 2026 – Present): Monte Carlo simulations (100k+ runs) for Probabilistic Health Risk Assessment (HRA) & ORCA/Gaussian DFT modeling.\n• **Software Associate** at **CRILab** (Mar 2024 – Present · 2 yrs 8 mos): Developing scientific data pipelines and computational research tools.\n• **Back End Developer** at **Upwork** (Oct 2024 – Present · 2 yrs 1 mo): Node.js, Python, PostgreSQL, Supabase, and distributed Puppeteer scrapers.\n• **Software Engineer** at **DataAutomators** (Dec 2024 – Jun 2025 · 7 mos): Full-stack developer on **ScrapeAutomate**, building high-throughput crawling pipelines and REST APIs.\n• **Back End Developer** at **PeoplePerHour** (Mar 2024 – Apr 2025 · 1 yr 2 mos): Custom APIs, webhooks, and automation pipelines.\n• **Teaching & Writing**: Previous science/chemistry educator at Future Point Academy and technical writer at Students Bee.`,
        suggestedQuestions: ["Tell me about his education background", "What are his flagship projects?", "Is Dhrubo available for hire?"]
      };
    }

    // 2. Education & Certifications
    if (
      lower.includes('education') ||
      lower.includes('degree') ||
      lower.includes('university') ||
      lower.includes('college') ||
      lower.includes('study') ||
      lower.includes('certificate') ||
      lower.includes('certification') ||
      lower.includes('hackathon') ||
      lower.includes('acs')
    ) {
      return {
        text: `Dhrubo's academic education and professional credentials:\n\n🎓 **Formal Education**:\n• **Bachelor of Science (BS) in Chemistry** — Jagannath University, Dhaka (2022 – 2027)\n  *Focus on computational modeling, physical chemistry, and environmental health risk assessment.*\n• **Higher Secondary Certificate (HSC) in Science** — Birshreshtha Munshi Abdur Rouf Public College (BMRPC) (2018 – 2021)\n\n🏆 **Certifications & Affiliations**:\n• **American Chemical Society (ACS)** — Student & Associate Member\n• **DevOps Hackathon** — Powered by Brain Station 23\n• **AI Literacy Workshop** — Certified in LLM engineering & workflows`,
        suggestedQuestions: ["Tell me about his scientific research", "What is his work experience?", "What tech stack does he use?"]
      };
    }

    // 3. Projects queries
    if (lower.includes('project') || lower.includes('portfolio') || lower.includes('flagship') || lower.includes('build')) {
      if (lower.includes('brown') || lower.includes('interior')) {
        const p = projectsData.find(item => item.id === 'browns-interior');
        return {
          text: `**Brown's Interior Architecture** is one of Dhrubo's flagship client platforms! It's a luxury interior design portal featuring real-time booking inquiries, an interactive filtered portfolio, dynamic project galleries, and sub-second page performance built with modern React.`,
          projectLink: p,
          suggestedQuestions: ["Show me another web project", "What automation tools has he built?"]
        };
      }
      if (lower.includes('automation') || lower.includes('scraping') || lower.includes('bot') || lower.includes('crawler')) {
        const p = projectsData.find(item => item.id === 'automated-book-publishing');
        return {
          text: `Dhrubo specializes in distributed web automation & scraping. Key builds include the **Automated Book Publishing Engine** (puppeteer crawling with headless clusters) and the **Dynamic Job Board Scraper** (anti-bot bypass, proxy rotation, and structured JSON export).`,
          projectLink: p,
          suggestedQuestions: ["Tell me about his scientific research", "Is Dhrubo available for hire?"]
        };
      }
      return {
        text: `Dhrubo has shipped **50+ projects** spanning full-stack web platforms, distributed automation crawlers, and scientific modeling tools. Top highlights include **Brown's Interior**, **ScrapeAutomate**, **ORCA Quantum DFT Pipeline**, and **Squicy UAP Food Platform**.`,
        projectLink: projectsData[0],
        suggestedQuestions: ["Tell me about Brown's Interior", "What is his work experience?", "How can I contact Dhrubo?"]
      };
    }

    // 4. Scientific computing / research / chemistry
    if (lower.includes('scientific') || lower.includes('compute') || lower.includes('simulation') || lower.includes('chemistry') || lower.includes('dft') || lower.includes('monte carlo') || lower.includes('orca') || lower.includes('gaussian')) {
      const p = projectsData.find(item => item.id === 'quantum-chemistry-dft');
      return {
        text: `Alongside full-stack engineering, Dhrubo is a **Scientific Computing Researcher** with a background in chemistry at Jagannath University and CRILab. He has executed over **100,000+ simulation runs** using **Monte Carlo stochastic uncertainty models**, quantum mechanical DFT calculations with **ORCA** and **Gaussian** on Linux HPC, and NumPy/SciPy automated analysis pipelines.`,
        projectLink: p,
        suggestedQuestions: ["What tech stack does he use?", "Tell me about his YouTube channel"]
      };
    }

    // 5. Tech Stack / Skills
    if (lower.includes('skill') || lower.includes('stack') || lower.includes('tech') || lower.includes('language') || lower.includes('framework')) {
      return {
        text: `Dhrubo's core technical arsenal includes:\n\n• **Frontend**: React, Next.js, TypeScript, Modern Vanilla CSS, Core Web Vitals optimization\n• **Backend**: Node.js, Express, Elysia, PostgreSQL, Supabase, RESTful APIs, Docker, Caddy\n• **Automation**: Puppeteer, Playwright, Headless Chrome, Proxy Rotation, Anti-Bot Bypass\n• **Scientific**: Python, NumPy, Pandas, Monte Carlo Simulations, ORCA & Gaussian DFT`,
        suggestedQuestions: ["Show me his flagship projects", "What is his work experience?"]
      };
    }

    // 6. Availability / Hire / Rates
    if (lower.includes('hire') || lower.includes('available') || lower.includes('rate') || lower.includes('contract') || lower.includes('job') || lower.includes('opportunity')) {
      return {
        text: `Yes! Dhrubo is currently **available for full-time software engineering roles and select contract projects**. He works worldwide remote with teams across North America, Europe, and Asia-Pacific.`,
        action: { label: "Send an Email", link: `mailto:${personalInfo.email}` },
        suggestedQuestions: ["How do I contact Dhrubo?", "Where is he based?"]
      };
    }

    // 7. Contact / Email / Location
    if (lower.includes('contact') || lower.includes('email') || lower.includes('reach') || lower.includes('message') || lower.includes('talk') || lower.includes('where') || lower.includes('location')) {
      return {
        text: `You can reach Dhrubo directly at **${personalInfo.email}** (or **ardhrubo2002@gmail.com**). He is based in **Dhaka, Bangladesh (GMT+6)** and is responsive via Email, LinkedIn, or GitHub.`,
        action: { label: `Email ${personalInfo.email}`, link: `mailto:${personalInfo.email}` },
        suggestedQuestions: ["Connect on LinkedIn", "Check his YouTube channel"]
      };
    }

    // 8. Social Channels / YouTube / Facebook
    if (lower.includes('youtube') || lower.includes('channel') || lower.includes('facebook') || lower.includes('video') || lower.includes('backbencher')) {
      return {
        text: `Dhrubo creates content across two main channels:\n\n• **YouTube**: **AR Dhrubo** ([@randomdhrubo](https://www.youtube.com/@randomdhrubo)) with 34+ videos exploring travel, science, and life.\n• **Facebook**: **Backbencher Chemist** ([@backbencherchemist](https://www.facebook.com/backbencherchemist)) focusing on chemistry education and research.`,
        suggestedQuestions: ["What are his flagship projects?", "Is Dhrubo available for hire?"]
      };
    }

    // Default intelligent response
    return {
      text: `Dhrubo is a **Full-Stack Software Engineer & Scientific Computing Researcher** with 50+ shipped projects across React, Node.js, distributed Puppeteer automation, and Monte Carlo stochastic simulations. How can I help you learn more about his background or work?`,
      suggestedQuestions: [
        "What is Dhrubo's work experience?",
        "What are his flagship projects?",
        "Tell me about his scientific research",
        "What is his education background?",
        "Is Dhrubo available for hire?"
      ]
    };
  };

  const handleReset = () => {
    setMessages([
      {
        id: 'welcome',
        sender: 'ai',
        text: `Chat reset! 👋 How can I help you explore Dhrubo's projects, experience, or availability?`,
        suggestedQuestions: [
          "What are Dhrubo's flagship projects?",
          "Tell me about his scientific computing research",
          "What is his core tech stack?",
          "Is Dhrubo available for hire?"
        ]
      }
    ]);
  };

  return (
    <div className="ai-chat-backdrop" onClick={() => onClose(false)} role="dialog" aria-modal="true">
      <div className="ai-chat-window" onClick={e => e.stopPropagation()}>
        {/* Header */}
        <div className="ai-chat-header">
          <div className="ai-chat-header-brand">
            <div className="ai-chat-avatar">
              <img src={personalInfo.avatar || "/dhrubo-profile.jpg"} alt="Dhrubo" className="ai-chat-avatar-img" />
              <span className="ai-online-dot"></span>
            </div>
            <div className="ai-chat-header-meta">
              <div className="ai-chat-header-title">
                <span>Chat with Dhrubo</span>
                <span className="ai-badge-chip">ONLINE</span>
              </div>
              <span className="ai-chat-header-sub">Interactive AI Copilot &bull; 50+ projects & research</span>
            </div>
          </div>

          <div className="ai-chat-header-actions">
            <button
              onClick={handleReset}
              className="ai-chat-header-btn"
              title="Reset Conversation"
              aria-label="Reset Conversation"
            >
              <i className="fa-solid fa-rotate-right"></i>
            </button>
            <button
              onClick={() => onClose(false)}
              className="ai-chat-header-btn"
              title="Close (Esc)"
              aria-label="Close"
            >
              <i className="fa-solid fa-xmark"></i>
            </button>
          </div>
        </div>

        {/* Message Stream */}
        <div className="ai-chat-messages">
          {messages.map((msg) => (
            <div key={msg.id} className={`ai-message-row ${msg.sender}`}>
              {msg.sender === 'ai' && (
                <div className="ai-msg-avatar">
                  <img src={personalInfo.avatar || "/dhrubo-profile.jpg"} alt="Dhrubo" className="ai-msg-avatar-img" />
                </div>
              )}
              <div className="ai-msg-bubble">
                <div
                  className="ai-msg-text"
                  dangerouslySetInnerHTML={{
                    __html: msg.text
                      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                      .replace(/• /g, '&bull; ')
                      .replace(/\n\n/g, '<br/><br/>')
                      .replace(/\n/g, '<br/>')
                  }}
                />

                {/* Project interactive preview link */}
                {msg.projectLink && (
                  <div
                    className="ai-msg-project-card"
                    onClick={() => {
                      if (onSelectProject) onSelectProject(msg.projectLink);
                      onClose(false);
                    }}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="ai-msg-proj-icon">
                      <i className={msg.projectLink.icon || 'fa-solid fa-folder'}></i>
                    </div>
                    <div className="ai-msg-proj-info">
                      <span className="ai-msg-proj-name">{msg.projectLink.title}</span>
                      <span className="ai-msg-proj-cat">{msg.projectLink.categoryLabel} &bull; Click to inspect</span>
                    </div>
                    <i className="fa-solid fa-arrow-right ai-msg-proj-arrow"></i>
                  </div>
                )}

                {/* Action Button */}
                {msg.action && (
                  <a
                    href={msg.action.link}
                    className="ai-msg-action-btn"
                    target={msg.action.link.startsWith('http') ? '_blank' : undefined}
                    rel="noopener noreferrer"
                  >
                    <i className="fa-solid fa-paper-plane"></i>
                    <span>{msg.action.label}</span>
                  </a>
                )}

                {/* Suggested prompt chips */}
                {msg.suggestedQuestions && (
                  <div className="ai-suggested-chips">
                    {msg.suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        className="ai-chip-btn"
                        onClick={() => handleSend(q)}
                      >
                        <i className="fa-regular fa-message"></i>
                        <span>{q}</span>
                      </button>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="ai-message-row ai">
              <div className="ai-msg-avatar">
                <img src={personalInfo.avatar || "/dhrubo-profile.jpg"} alt="Dhrubo" className="ai-msg-avatar-img" />
              </div>
              <div className="ai-msg-bubble ai-typing-bubble">
                <span className="ai-dot"></span>
                <span className="ai-dot"></span>
                <span className="ai-dot"></span>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input Bar */}
        <form
          className="ai-chat-input-bar"
          onSubmit={(e) => {
            e.preventDefault();
            handleSend();
          }}
        >
          <input
            ref={inputRef}
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about projects, tech stack, or hire..."
            className="ai-chat-input"
          />
          <button
            type="submit"
            className="ai-chat-send-btn"
            disabled={!input.trim()}
            title="Send Message"
            aria-label="Send Message"
          >
            <i className="fa-solid fa-arrow-up"></i>
          </button>
        </form>

        {/* Footer shortcuts info */}
        <div className="ai-chat-footer">
          <span>Press <kbd>Esc</kbd> to close &bull; <kbd>⌘J</kbd> to toggle</span>
        </div>
      </div>
    </div>
  );
}
