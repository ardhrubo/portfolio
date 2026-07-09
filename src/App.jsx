import { useState, useEffect } from 'react'
import './App.css'

const projectsData = [
  { name: "horizontaxsolution", url: "https://www.horizontaxsolutions.com.au/", tech: ["Web"], image: "https://api.microlink.io/?url=https%3A%2F%2Fwww.horizontaxsolutions.com.au%2F&screenshot=true&meta=false&embed=screenshot.url" },
  { name: "scrapeautomate", url: "https://scrapeautomate.com/", tech: ["Scraper"], image: "https://api.microlink.io/?url=https%3A%2F%2Fscrapeautomate.com%2F&screenshot=true&meta=false&embed=screenshot.url" },
  { name: "admissionbondhu", url: "https://admissionbondhu.com/", tech: ["React", "Node"], image: "https://api.microlink.io/?url=https%3A%2F%2Fadmissionbondhu.com%2F&screenshot=true&meta=false&embed=screenshot.url" },
  { name: "emailhider", url: "https://chromewebstore.google.com/detail/copippkpbpdkhjpcbaibpjdmaanccocc?utm_source=item-share-cb", tech: ["Web"], image: "https://api.microlink.io/?url=https%3A%2F%2Fchromewebstore.google.com%2Fdetail%2Fcopippkpbpdkhjpcbaibpjdmaanccocc%3Futm_source%3Ditem-share-cb&screenshot=true&meta=false&embed=screenshot.url" },
  { name: "password-generator", url: "https://passwordgeneratordhrubo.vercel.app/", tech: ["React"], image: "https://api.microlink.io/?url=https%3A%2F%2Fpasswordgeneratordhrubo.vercel.app%2F&screenshot=true&meta=false&embed=screenshot.url" },
  { name: "bot", url: "https://github.com/ardhrubo/bot", tech: ["Python"] },
  { name: "bulk-duckduckgo-search-tool", url: "https://github.com/ardhrubo/bulk-duckduckgo-search-tool", tech: ["JS"] },
  { name: "form-timer", url: "https://github.com/ardhrubo/form-timer", tech: ["JS"] },
  { name: "free-claude-code", url: "https://github.com/ardhrubo/free-claude-code", tech: ["JS"] },
  { name: "fullstack-docker", url: "https://github.com/ardhrubo/fullstack-docker", tech: ["Docker"] },
  { name: "hasib", url: "https://github.com/ardhrubo/hasib", tech: ["Web"] },
  { name: "indianvisa", url: "https://github.com/ardhrubo/indianvisa", tech: ["Bot"] },
  { name: "medusajs", url: "https://github.com/ardhrubo/medusajs", tech: ["Ecommerce"] },
  { name: "mohan", url: "https://github.com/ardhrubo/mohan", tech: ["Web"] },
  { name: "orbital", url: "https://github.com/ardhrubo/orbital", tech: ["Web"] },
  { name: "passglobaledu", url: "https://passglobaledu.com", tech: ["Next.js"] },
  { name: "researchtool", url: "https://github.com/ardhrubo/researchtool", tech: ["Tool"] },
  { name: "tiktactoe", url: "https://github.com/ardhrubo/tiktactoe", tech: ["Game"] },
  { name: "usage-monitor", url: "https://github.com/ardhrubo/usage-monitor", tech: ["Tool"] },
  { name: "vibetest-docs", url: "https://github.com/ardhrubo/vibetest-docs", tech: ["Docs"] },
  { name: "watchfirebd", url: "https://watchfirebd.com", tech: ["Web"] }
];

const fileContents = {
  'about': {
      title: 'about.md',
      lang: 'Markdown',
      icon: <i className="fa-brands fa-markdown" style={{color: '#699dfb'}}></i>,
      content: (openFile) => (
        <>
          <h1><span className="syntax-keyword">Hi there, I'm Dhrubo</span> 👋</h1>
          <p>I'm a passionate web developer who loves building unique, performant, and beautiful applications.</p>
          <h2><span className="syntax-func">About Me</span></h2>
          <ul>
            <li>🔭 I'm currently working on building awesome web experiences.</li>
            <li>🌱 I'm always learning new technologies and refining my craft.</li>
            <li>⚡ Fun fact: I love building tools that automate the boring stuff.</li>
          </ul>
          <h2><span className="syntax-func">My Arsenal</span></h2>
          <ul>
            <li><span className="syntax-var">Frontend:</span> HTML, CSS, JavaScript, React, Next.js, Vite</li>
            <li><span className="syntax-var">Backend:</span> Node.js, Python, Docker</li>
            <li><span className="syntax-var">Tools:</span> VS Code, Git, Terminal</li>
          </ul>

          <h2><span className="syntax-func">Experience</span></h2>
          
          <div className="experience-item" style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '10px 0 5px 0' }}><span className="syntax-keyword">Academic Researcher</span> | Jagannath University</h3>
            <p style={{ margin: '0 0 10px 0', fontStyle: 'italic', color: 'var(--syntax-comment)' }}>Mar 2026 – Present</p>
            <ul>
              <li>Developing Python-based Monte Carlo simulations for Probabilistic Health Risk Assessment (HRA).</li>
              <li>Performing DFT calculations for molecular modeling utilizing ORCA and Gaussian on Linux (Ubuntu).</li>
              <li>Quantifying uncertainty in environmental contaminants to advance beyond deterministic risk estimates.</li>
            </ul>
          </div>

          <div className="experience-item" style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '10px 0 5px 0' }}><span className="syntax-keyword">Researcher</span> | Constant Research and Innovation Lab (CRILab)</h3>
            <p style={{ margin: '0 0 10px 0', fontStyle: 'italic', color: 'var(--syntax-comment)' }}>Mar 2024 – Present</p>
            <ul>
              <li>Leading technical research initiatives and managing software development projects bridging chemistry and technology.</li>
            </ul>
          </div>

          <div className="experience-item" style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '10px 0 5px 0' }}><span className="syntax-keyword">Software Engineer</span> | DataAutomators</h3>
            <p style={{ margin: '0 0 10px 0', fontStyle: 'italic', color: 'var(--syntax-comment)' }}>Dec 2024 – Jun 2025</p>
            <ul>
              <li>Led full-stack development with a primary focus on the <strong>ScrapeAutomate</strong> platform.</li>
              <li>Engineered web automation workflows using Puppeteer, developed core features, and maintained system documentation.</li>
            </ul>
          </div>

          <div className="experience-item" style={{ marginBottom: '20px' }}>
            <h3 style={{ margin: '10px 0 5px 0' }}><span className="syntax-keyword">Freelance Back-End Developer</span></h3>
            <p style={{ margin: '0 0 10px 0', fontStyle: 'italic', color: 'var(--syntax-comment)' }}>Mar 2024 – Present</p>
            <ul>
              <li>Architecting back-end systems, web applications, and scalable REST APIs (documented with Swagger) for diverse global clients.</li>
            </ul>
          </div>
          <p>
            <a href="https://github.com/ardhrubo" target="_blank" rel="noopener noreferrer" style={{color: 'var(--syntax-keyword)', textDecoration: 'underline'}}>
              <i className="fa-brands fa-github"></i> View my GitHub Profile
            </a>
          </p>
          <div style={{ marginTop: '20px' }}>
            <button 
              onClick={() => openFile('projects')} 
              style={{
                background: 'var(--accent)', 
                color: 'white', 
                border: 'none', 
                padding: '8px 16px', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontFamily: 'Inter',
                fontSize: '14px'
              }}
            >
              🚀 View My Projects
            </button>
          </div>
        </>
      )
  },
  'contact': {
      title: 'contact.json',
      lang: 'JSON',
      icon: <i className="fa-brands fa-node-js" style={{color: '#83cd29'}}></i>,
      content: `<div style="white-space: pre-wrap"><span class="syntax-string">{</span>
    <span class="syntax-keyword">"name"</span>: <span class="syntax-string">"Dhrubo"</span>,
    <span class="syntax-keyword">"email"</span>: <span class="syntax-string">"hello@example.com"</span>,
    <span class="syntax-keyword">"socials"</span>: <span class="syntax-string">{</span>
        <span class="syntax-keyword">"github"</span>: <a href="https://github.com/ardhrubo" target="_blank" style="color: var(--syntax-string); text-decoration: underline;">"https://github.com/ardhrubo"</a>,
        <span class="syntax-keyword">"linkedin"</span>: <a href="https://linkedin.com/in/dhrubo" target="_blank" style="color: var(--syntax-string); text-decoration: underline;">"https://linkedin.com/in/dhrubo"</a>
    <span class="syntax-string">}</span>,
    <span class="syntax-keyword">"availability"</span>: <span class="syntax-var">true</span>,
    <span class="syntax-keyword">"message"</span>: <span class="syntax-string">"Open for new opportunities and exciting projects!"</span>
<span class="syntax-string">}</span></div>`
  },
  'projects': {
      title: 'projects/index.html',
      lang: 'HTML',
      icon: <i className="fa-brands fa-html5" style={{color: '#e34f26'}}></i>,
      content: (
        <>
          <span className="syntax-comment">&lt;!-- My Projects Portfolio --&gt;</span>
          <div className="project-grid">
            {projectsData.map(p => (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="project-card" key={p.name} style={{ textDecoration: 'none' }}>
                  <img src={p.image || `https://placehold.co/600x400/252526/cccccc?text=${p.name}`} alt={`${p.name} preview`} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px', backgroundColor: '#1e1e1e' }} />
                  <h3>{p.name}</h3>
                  <p>A web development project built to solve specific problems and enhance user experience.</p>
                  <div className="project-tech">
                      {p.tech.map(t => <span key={t} className="tech-tag">{t}</span>)}
                  </div>
              </a>
            ))}
          </div>
        </>
      )
  }
};

function App() {
  const [activeTab, setActiveTab] = useState('about');
  const [tabs, setTabs] = useState(['about']);
  const [folderOpen, setFolderOpen] = useState({ portfolio: true, projects: false });
  const [lineNumbers, setLineNumbers] = useState([]);
  const [cursor, setCursor] = useState({ ln: 1, col: 1 });
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const data = fileContents[activeTab];
    if (!data) return;
    
    let lines = 25;
    if (activeTab === 'projects') lines = 35;
    if (activeTab === 'contact') lines = 10;
    
    setLineNumbers(Array.from({length: lines}, (_, i) => i + 1));
    setCursor({ ln: Math.floor(Math.random() * lines) + 1, col: Math.floor(Math.random() * 40) + 1 });
    
    setAnimate(true);
    const timer = setTimeout(() => setAnimate(false), 300);
    return () => clearTimeout(timer);
  }, [activeTab]);

  const openFile = (id) => {
    if (!tabs.includes(id)) {
      setTabs([...tabs, id]);
    }
    setActiveTab(id);
  };

  const closeTab = (e, id) => {
    e.stopPropagation();
    const newTabs = tabs.filter(t => t !== id);
    setTabs(newTabs);
    if (activeTab === id) {
      if (newTabs.length > 0) {
        setActiveTab(newTabs[newTabs.length - 1]);
      } else {
        setActiveTab(null);
      }
    }
  };

  const toggleFolder = (folder) => {
    setFolderOpen(prev => ({ ...prev, [folder]: !prev[folder] }));
  };

  return (
    <div className="app-container">
      {/* Activity Bar */}
      <div className="activity-bar">
          <div className="activity-icon active" title="Explorer">
              <i className="fa-regular fa-copy"></i>
          </div>
          <div className="activity-icon" title="Source Control">
              <i className="fa-solid fa-code-branch"></i>
          </div>
          <div className="activity-spacer"></div>
          <div className="activity-icon" title="Settings">
              <i className="fa-solid fa-gear"></i>
          </div>
      </div>

      {/* Sidebar */}
      <div className="sidebar">
          <div className="sidebar-header">
              <h2>EXPLORER</h2>
              <i className="fa-solid fa-ellipsis"></i>
          </div>
          <div className="sidebar-section">
              <div className="section-header" onClick={() => toggleFolder('portfolio')}>
                  <i className={`fa-solid fa-chevron-down toggle-icon ${!folderOpen.portfolio ? 'collapsed' : ''}`}></i>
                  <span>DHRUBO_PORTFOLIO</span>
              </div>
              
              {folderOpen.portfolio && (
                <div className="file-tree">
                    <div className={`file-item file-md ${activeTab === 'about' ? 'active' : ''}`} onClick={() => openFile('about')}>
                        <i className="fa-brands fa-markdown" style={{color: '#699dfb'}}></i>
                        <span>about.md</span>
                    </div>
                    
                    <div className={`folder-item ${!folderOpen.projects ? 'collapsed' : ''}`} onClick={() => toggleFolder('projects')}>
                        <i className="fa-solid fa-chevron-down toggle-icon"></i>
                        <i className="fa-solid fa-folder" style={{color: '#dcb67a'}}></i>
                        <span>projects</span>
                    </div>
                    
                    {folderOpen.projects && (
                      <div className="folder-contents">
                          {projectsData.map(p => (
                            <div className="file-item" key={p.name} onClick={() => openFile('projects')}>
                              <i className="fa-brands fa-js" style={{color: '#f1e05a'}}></i>
                              <span>{p.name}.js</span>
                            </div>
                          ))}
                      </div>
                    )}

                    <div className={`file-item file-json ${activeTab === 'contact' ? 'active' : ''}`} onClick={() => openFile('contact')}>
                        <i className="fa-brands fa-node-js" style={{color: '#83cd29'}}></i>
                        <span>contact.json</span>
                    </div>
                </div>
              )}
          </div>
      </div>

      {/* Editor Area */}
      <div className="editor-area">
          <div className="editor-tabs">
              {tabs.map(tabId => (
                <div key={tabId} className={`tab ${activeTab === tabId ? 'active' : ''}`} onClick={() => setActiveTab(tabId)}>
                    {fileContents[tabId].icon}
                    <span>{fileContents[tabId].title}</span>
                    <i className="fa-solid fa-xmark close-tab" onClick={(e) => closeTab(e, tabId)}></i>
                </div>
              ))}
          </div>
          
          <div className="breadcrumbs">
              <span>DHRUBO_PORTFOLIO</span>
              <i className="fa-solid fa-chevron-right"></i>
              <span>{activeTab ? fileContents[activeTab].title : ''}</span>
          </div>

          <div className="editor-content-container">
              <div className="line-numbers">
                {activeTab && lineNumbers.map(n => <div key={n}>{n}</div>)}
              </div>
              
              <div className={`editor-content ${animate ? 'animate-in' : ''}`}>
                  {activeTab ? (
                    typeof fileContents[activeTab].content === 'string' ? 
                      <div dangerouslySetInnerHTML={{__html: fileContents[activeTab].content}} /> :
                      (typeof fileContents[activeTab].content === 'function' ? 
                        fileContents[activeTab].content(openFile) : 
                        fileContents[activeTab].content)
                  ) : (
                    <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%', color: 'var(--text-muted)'}}>
                      <i className="fa-brands fa-react" style={{fontSize: '100px', opacity: 0.1}}></i>
                    </div>
                  )}
              </div>
          </div>
      </div>

      {/* Status Bar */}
      <div className="status-bar" style={{position: 'fixed', bottom: 0, width: '100%'}}>
          <div className="status-left">
              <div className="status-item"><i className="fa-solid fa-code-branch"></i> main</div>
              <div className="status-item"><i className="fa-solid fa-rotate"></i> 0 <i className="fa-solid fa-arrow-up"></i> 0</div>
              <div className="status-item"><i className="fa-solid fa-xmark" style={{color:'#f14c4c'}}></i> 0 &nbsp;&nbsp;<i className="fa-solid fa-triangle-exclamation" style={{color:'#cca700'}}></i> 0</div>
          </div>
          <div className="status-right">
              {activeTab && (
                <>
                  <div className="status-item">Ln {cursor.ln}, Col {cursor.col}</div>
                  <div className="status-item">Spaces: 4</div>
                  <div className="status-item">UTF-8</div>
                  <div className="status-item">CRLF</div>
                  <div className="status-item">{fileContents[activeTab].lang}</div>
                </>
              )}
              <div className="status-item"><i className="fa-regular fa-bell"></i></div>
          </div>
      </div>
    </div>
  )
}

export default App
