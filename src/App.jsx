import { useState, useEffect } from 'react'
import './App.css'
import { Joyride, STATUS } from 'react-joyride';

const projectsData = [
  { name: "horizontaxsolution", title: "Horizon Tax Solution", url: "https://www.horizontaxsolutions.com.au/", tech: ["Web"], image: "https://api.microlink.io/?url=https%3A%2F%2Fwww.horizontaxsolutions.com.au%2F&screenshot=true&meta=false&embed=screenshot.url", desc: "A professional tax and accounting services web application built for Australian clientele to handle seamless lead generation and consulting inquiries." },
  { name: "scrapeautomate", title: "ScrapeAutomate", url: "https://scrapeautomate.com/", tech: ["Scraper"], image: "https://api.microlink.io/?url=https%3A%2F%2Fscrapeautomate.com%2F&screenshot=true&meta=false&embed=screenshot.url", desc: "A robust web scraping and automation platform engineered with Puppeteer for executing complex data extraction workflows at scale." },
  { name: "admissionbondhu", title: "Admission Bondhu", url: "https://admissionbondhu.com/", tech: ["React", "Node"], image: "https://api.microlink.io/?url=https%3A%2F%2Fadmissionbondhu.com%2F&screenshot=true&meta=false&embed=screenshot.url", desc: "A comprehensive higher education portal designed to assist students in navigating the complexities of university admissions and enrollment processes." },
  { name: "emailhider", title: "Email Blurrer", url: "https://chromewebstore.google.com/detail/copippkpbpdkhjpcbaibpjdmaanccocc?utm_source=item-share-cb", tech: ["Web"], image: "https://api.microlink.io/?url=https%3A%2F%2Fchromewebstore.google.com%2Fdetail%2Fcopippkpbpdkhjpcbaibpjdmaanccocc%3Futm_source%3Ditem-share-cb&screenshot=true&meta=false&embed=screenshot.url", desc: "A privacy-centric Chrome Extension that automatically obfuscates sensitive email addresses on webpages." },
  { name: "password-generator", title: "Password Generator", url: "https://passwordgeneratordhrubo.vercel.app/", tech: ["React"], image: "https://api.microlink.io/?url=https%3A%2F%2Fpasswordgeneratordhrubo.vercel.app%2F&screenshot=true&meta=false&embed=screenshot.url", desc: "A fast, customizable, and secure web application for generating strong cryptographic passwords locally in the browser." },
  { name: "bot", title: "Custom Bot", url: "https://github.com/ardhrubo/bot", tech: ["Python"], image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Fbot&screenshot=true&meta=false&embed=screenshot.url", desc: "A Python-based automation bot tailored for specific repetitive tasks." },
  { name: "bulk-duckduckgo-search-tool", title: "DuckDuckGo Search Tool", url: "https://github.com/ardhrubo/bulk-duckduckgo-search-tool", tech: ["JS"], image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Fbulk-duckduckgo-search-tool&screenshot=true&meta=false&embed=screenshot.url", desc: "A JavaScript utility for performing bulk queries on DuckDuckGo and extracting search results." },
  { name: "form-timer", title: "Form Timer", url: "https://github.com/ardhrubo/form-timer", tech: ["JS"], image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Fform-timer&screenshot=true&meta=false&embed=screenshot.url", desc: "A handy JS tool to monitor and enforce time limits on web forms." },
  { name: "free-claude-code", title: "Free Claude Code", url: "https://github.com/ardhrubo/free-claude-code", tech: ["JS"], image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Ffree-claude-code&screenshot=true&meta=false&embed=screenshot.url", desc: "An experimental repository exploring AI integrations and capabilities." },
  { name: "fullstack-docker", title: "Fullstack Docker Env", url: "https://github.com/ardhrubo/fullstack-docker", tech: ["Docker"], image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Ffullstack-docker&screenshot=true&meta=false&embed=screenshot.url", desc: "A complete, Dockerized boilerplate environment for full-stack application development." },
  { name: "hasib", title: "Hasib Portfolio", url: "https://github.com/ardhrubo/hasib", tech: ["Web"], image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Fhasib&screenshot=true&meta=false&embed=screenshot.url", desc: "A personal portfolio website designed and developed for a client named Hasib." },
  { name: "indianvisa", title: "Indian Visa Bot", url: "https://github.com/ardhrubo/indianvisa", tech: ["Bot"], image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Findianvisa&screenshot=true&meta=false&embed=screenshot.url", desc: "An automated bot designed to streamline checking and applying for Indian visa slots." },
  { name: "medusajs", title: "MedusaJS Store", url: "https://github.com/ardhrubo/medusajs", tech: ["Ecommerce"], image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Fmedusajs&screenshot=true&meta=false&embed=screenshot.url", desc: "An e-commerce storefront built using the powerful MedusaJS headless commerce engine." },
  { name: "orbital", title: "Orbital Website", url: "https://github.com/ardhrubo/orbital", tech: ["Web"], image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Forbital&screenshot=true&meta=false&embed=screenshot.url", desc: "A sleek and responsive website built for the Orbital project." },
  { name: "passglobaledu", title: "Pass Global Edu", url: "https://passglobaledu.com", tech: ["Next.js"], image: "https://api.microlink.io/?url=https%3A%2F%2Fpassglobaledu.com&screenshot=true&meta=false&embed=screenshot.url", desc: "An educational consultancy portal built with Next.js for Pass Global Edu." },
  { name: "researchtool", title: "Research Tool", url: "https://github.com/ardhrubo/researchtool", tech: ["Tool"], image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Fresearchtool&screenshot=true&meta=false&embed=screenshot.url", desc: "A specialized tool designed to assist with data aggregation and research processes." },
  { name: "tiktactoe", title: "Tic Tac Toe", url: "https://github.com/ardhrubo/tiktactoe", tech: ["Game"], image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Ftiktactoe&screenshot=true&meta=false&embed=screenshot.url", desc: "A classic, interactive Tic-Tac-Toe game built for the web." },
  { name: "usage-monitor", title: "Usage Monitor", url: "https://github.com/ardhrubo/usage-monitor", tech: ["Tool"], image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Fusage-monitor&screenshot=true&meta=false&embed=screenshot.url", desc: "A lightweight tool to track and visualize system or application usage metrics." },
  { name: "vibetest-docs", title: "VibeTest Docs", url: "https://github.com/ardhrubo/vibetest-docs", tech: ["Docs"], image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Fvibetest-docs&screenshot=true&meta=false&embed=screenshot.url", desc: "Comprehensive technical documentation site built for the VibeTest platform." },
  { name: "watchfirebd", title: "WatchFire BD", url: "https://watchfirebd.com", tech: ["Web"], image: "https://api.microlink.io/?url=https%3A%2F%2Fwatchfirebd.com&screenshot=true&meta=false&embed=screenshot.url", desc: "A modern and responsive web presence created for WatchFire BD." }
];

const ProjectsCarousel = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const topProjects = projectsData.slice(0, 5); // The top 5 projects

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % topProjects.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [topProjects.length]);

  return (
    <div className="carousel-container">
      {topProjects.map((item, index) => (
        <div key={item.name} className={`carousel-slide ${index === currentIndex ? 'active' : ''}`}>
          <img src={item.image} alt={item.title} className="carousel-image" />
          <div className="carousel-content">
            <h3>
              <a href={item.url} target="_blank" rel="noopener noreferrer">{item.title}</a>
            </h3>
            <p>{item.desc}</p>
          </div>
        </div>
      ))}
      <div className="carousel-dots">
        {topProjects.map((_, i) => (
          <div key={i} onClick={() => setCurrentIndex(i)} className={`carousel-dot ${i === currentIndex ? 'active' : ''}`} />
        ))}
      </div>
    </div>
  );
};


const SettingsPanel = ({ currentTheme, setTheme }) => (
  <div className="source-control-panel">
    <div className="sidebar-header" style={{borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '10px'}}>
        <h2>SETTINGS</h2>
        <i className="fa-solid fa-ellipsis"></i>
    </div>
    <div className="settings-panel">
      <h3 style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '15px', marginTop: '10px'}}>CHOOSE THEME</h3>
      
      <div className={`theme-card ${currentTheme === 'cafe' ? 'active' : ''}`} onClick={() => setTheme('cafe')}>
        <div className="theme-preview">
          <div className="theme-swatch" style={{background: '#161412'}}></div>
          <div className="theme-swatch" style={{background: '#ffeed6'}}></div>
          <div className="theme-swatch" style={{background: '#e8a07c'}}></div>
          <div className="theme-swatch" style={{background: '#827148'}}></div>
        </div>
        <span style={{fontSize: '14px'}}>Earthy Cafe</span>
      </div>

      <div className={`theme-card ${currentTheme === 'synthwave' ? 'active' : ''}`} onClick={() => setTheme('synthwave')}>
        <div className="theme-preview">
          <div className="theme-swatch" style={{background: '#120e18'}}></div>
          <div className="theme-swatch" style={{background: '#e22f80'}}></div>
          <div className="theme-swatch" style={{background: '#ff7873'}}></div>
          <div className="theme-swatch" style={{background: '#8140dc'}}></div>
        </div>
        <span style={{fontSize: '14px'}}>Synthwave Sunset</span>
      </div>

      <div className={`theme-card ${currentTheme === 'green' ? 'active' : ''}`} onClick={() => setTheme('green')}>
        <div className="theme-preview">
          <div className="theme-swatch" style={{background: '#121612'}}></div>
          <div className="theme-swatch" style={{background: '#8eca3c'}}></div>
          <div className="theme-swatch" style={{background: '#bbdc12'}}></div>
          <div className="theme-swatch" style={{background: '#499a13'}}></div>
        </div>
        <span style={{fontSize: '14px'}}>Dark Hacker Green</span>
      </div>

      <div className={`theme-card ${currentTheme === 'blue' ? 'active' : ''}`} onClick={() => setTheme('blue')}>
        <div className="theme-preview">
          <div className="theme-swatch" style={{background: '#080616'}}></div>
          <div className="theme-swatch" style={{background: '#2f2fe4'}}></div>
          <div className="theme-swatch" style={{background: '#162e93'}}></div>
          <div className="theme-swatch" style={{background: '#1a1953'}}></div>
        </div>
        <span style={{fontSize: '14px'}}>Deep Blue</span>
      </div>
    </div>
  </div>
);

const SourceControlPanel = () => (
  <div className="source-control-panel">
    <div className="sidebar-header" style={{borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '10px'}}>
        <h2>CAREER CONTROL</h2>
        <i className="fa-solid fa-check"></i>
    </div>
    <div style={{padding: '0 15px', overflowY: 'auto', maxHeight: 'calc(100vh - 120px)'}}>
      <h3 style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '15px', marginTop: '10px'}}>CAREER HISTORY</h3>
      <div className="git-timeline">
        <div className="git-commit branch">
          <div className="git-branch-curve"></div>
          <div className="git-merge-curve"></div>
          <div className="git-line"></div>
          <div className="git-dot"></div>
          <div className="git-content">
            <div className="git-message">feat(career): join Jagannath University as Academic Researcher</div>
            <div className="git-meta">dhrubo committed on <span style={{color: 'var(--syntax-comment)'}}>Mar 2026</span> <span className="git-hash">a1b2c3d</span></div>
            <div className="git-details">
              <ul>
                <li>Developing Python-based Monte Carlo simulations for Probabilistic Health Risk Assessment (HRA).</li>
                <li>Performing DFT calculations for molecular modeling utilizing ORCA and Gaussian on Linux (Ubuntu).</li>
                <li>Quantifying uncertainty in environmental contaminants to advance beyond deterministic risk estimates.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="git-commit branch">
          <div className="git-branch-curve"></div>
          <div className="git-line"></div>
          <div className="git-dot"></div>
          <div className="git-content">
            <div className="git-message">feat(career): join CRILab as Researcher</div>
            <div className="git-meta">dhrubo committed on <span style={{color: 'var(--syntax-comment)'}}>Mar 2024</span> <span className="git-hash">f4e5d6c</span></div>
            <div className="git-details">
              <ul>
                <li>Leading technical research initiatives and managing software development projects bridging chemistry and technology.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="git-commit">
          <div className="git-line"></div>
          <div className="git-dot"></div>
          <div className="git-content">
            <div className="git-message">feat(career): start as Software Engineer at DataAutomators</div>
            <div className="git-meta">dhrubo committed on <span style={{color: 'var(--syntax-comment)'}}>Dec 2024</span> <span className="git-hash">9a8b7c6</span></div>
            <div className="git-details">
              <ul>
                <li>Led full-stack development with a primary focus on the <strong>ScrapeAutomate</strong> platform.</li>
                <li>Engineered web automation workflows using Puppeteer, developed core features, and maintained system documentation.</li>
              </ul>
            </div>
          </div>
        </div>
        <div className="git-commit branch">
          <div className="git-branch-curve"></div>
          <div className="git-line"></div>
          <div className="git-dot"></div>
          <div className="git-content">
            <div className="git-message">init(career): start Freelance Back-End Developer journey</div>
            <div className="git-meta">dhrubo committed on <span style={{color: 'var(--syntax-comment)'}}>Mar 2024</span> <span className="git-hash">e5d4c3b</span></div>
            <div className="git-details">
              <ul>
                <li>Architecting back-end systems, web applications, and scalable REST APIs (documented with Swagger) for diverse global clients.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const fileContents = {
  'readme': {
      title: 'README.md',
      lang: 'Markdown',
      icon: <i className="fa-brands fa-markdown" style={{color: '#699dfb'}}></i>,
      content: (openFile, setActiveActivity, setMobileMenuOpen) => (
        <>
          <h1><span className="syntax-keyword">Hi there, I'm Dhrubo</span> <span className="syntax-string" style={{fontSize: '0.8em', marginLeft: '5px'}}>&gt;_</span></h1>
          <p>I'm a passionate web developer who loves building unique, performant, and beautiful applications.</p>
          
          <div style={{ marginTop: '15px', marginBottom: '30px', display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '15px' }}>
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
              <i className="fa-solid fa-code"></i> View My Projects
            </button>
            <button 
              onClick={() => { setActiveActivity('source-control'); setMobileMenuOpen(true); }} 
              style={{
                background: 'transparent', 
                color: 'var(--accent)', 
                border: '1px solid var(--accent)', 
                padding: '8px 16px', 
                borderRadius: '4px', 
                cursor: 'pointer',
                fontFamily: 'Inter',
                fontSize: '14px'
              }}
            >
              <i className="fa-solid fa-code-commit"></i> View Experience
            </button>
            <a href="https://github.com/ardhrubo" target="_blank" rel="noopener noreferrer" style={{color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', border: '1px solid var(--border)', padding: '7px 12px', borderRadius: '4px'}}>
              <i className="fa-brands fa-github" style={{fontSize: '16px'}}></i> GitHub
            </a>
            <a href="https://www.linkedin.com/in/ardhrubo/" target="_blank" rel="noopener noreferrer" style={{color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', border: '1px solid var(--border)', padding: '7px 12px', borderRadius: '4px'}}>
              <i className="fa-brands fa-linkedin" style={{fontSize: '16px', color: '#0a66c2'}}></i> LinkedIn
            </a>
            <a href="https://peerlist.io/ardhruboF" target="_blank" rel="noopener noreferrer" style={{color: 'var(--text-main)', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '6px', fontSize: '14px', border: '1px solid var(--border)', padding: '7px 12px', borderRadius: '4px'}}>
              <i className="fa-solid fa-p" style={{fontSize: '16px', color: '#00aa45'}}></i> Peerlist
            </a>
          </div>

          <h2><span className="syntax-func">About Me</span></h2>
          <ul>
            <li><span className="syntax-keyword" style={{marginRight: '8px'}}>[+]</span> I'm currently working on building awesome web experiences.</li>
            <li><span className="syntax-keyword" style={{marginRight: '8px'}}>[&gt;]</span> I'm always learning new technologies and refining my craft.</li>
            <li><span className="syntax-keyword" style={{marginRight: '8px'}}>[*]</span> Fun fact: I love building tools that automate the boring stuff.</li>
          </ul>
          <h2><span className="syntax-func">My Arsenal</span></h2>
          <ul>
            <li><span className="syntax-var">Frontend:</span> HTML, CSS, JavaScript, React, Next.js, Vite</li>
            <li><span className="syntax-var">Backend:</span> Node.js, Python, Docker</li>
            <li><span className="syntax-var">Tools:</span> VS Code, Git, Terminal</li>
          </ul>
          
          <h2><span className="syntax-func">Top Client Projects</span></h2>
          <p style={{ marginBottom: '15px' }}>
            I have shipped over <strong style={{color: 'var(--syntax-keyword)'}}>50+ projects</strong> throughout my career. Below are some of my top client projects and tools that are actively making an impact:
          </p>
          
          <ProjectsCarousel />
        </>
      )
  },

  'package-json': {
      title: 'package.json',
      lang: 'JSON',
      icon: <i className="fa-brands fa-node-js" style={{color: '#83cd29'}}></i>,
      content: `<div style="white-space: pre-wrap"><span class="syntax-string">{</span>
    <span class="syntax-keyword">"name"</span>: <span class="syntax-string">"dhrubo-portfolio"</span>,
    <span class="syntax-keyword">"version"</span>: <span class="syntax-string">"1.0.0"</span>,
    <span class="syntax-keyword">"description"</span>: <span class="syntax-string">"Full-stack developer portfolio"</span>,
    <span class="syntax-keyword">"main"</span>: <span class="syntax-string">"src/app.js"</span>,
    <span class="syntax-keyword">"author"</span>: <span class="syntax-string">"Dhrubo <hello@example.com>"</span>,
    <span class="syntax-keyword">"socials"</span>: <span class="syntax-string">{</span>
        <span class="syntax-keyword">"github"</span>: <a href="https://github.com/ardhrubo" target="_blank" style="color: var(--syntax-string); text-decoration: underline;">"https://github.com/ardhrubo"</a>,
        <span class="syntax-keyword">"linkedin"</span>: <a href="https://www.linkedin.com/in/ardhrubo/" target="_blank" style="color: var(--syntax-string); text-decoration: underline;">"https://www.linkedin.com/in/ardhrubo/"</a>,
        <span class="syntax-keyword">"peerlist"</span>: <a href="https://peerlist.io/ardhruboF" target="_blank" style="color: var(--syntax-string); text-decoration: underline;">"https://peerlist.io/ardhruboF"</a>
    <span class="syntax-string">}</span>,
    <span class="syntax-keyword">"dependencies"</span>: <span class="syntax-string">{</span>
        <span class="syntax-keyword">"react"</span>: <span class="syntax-string">"^18.2.0"</span>,
        <span class="syntax-keyword">"puppeteer"</span>: <span class="syntax-string">"^21.0.0"</span>
    <span class="syntax-string">}</span>,
    <span class="syntax-keyword">"availability"</span>: <span class="syntax-var">true</span>
<span class="syntax-string">}</span></div>`
  },
  'projects': {
      title: 'src/routes/projects.js',
      lang: 'JavaScript',
      icon: <i className="fa-brands fa-js" style={{color: '#f1e05a'}}></i>,
      content: (
        <>
          <span className="syntax-comment">&lt;!-- My Projects Portfolio --&gt;</span>
          <p style={{marginBottom: '20px', color: 'var(--text-muted)'}}>
            I shipped more than <strong style={{color: 'var(--syntax-keyword)'}}>50+ projects</strong>, among them some top client projects are:
          </p>
          <div className="project-grid">
            {projectsData.map(p => (
              <a href={p.url} target="_blank" rel="noopener noreferrer" className="project-card" key={p.name} style={{ textDecoration: 'none' }}>
                  <img src={p.image || `https://placehold.co/600x400/252526/cccccc?text=${p.title.replace(/ /g, '+')}`} alt={`${p.title} preview`} style={{ width: '100%', height: '120px', objectFit: 'cover', borderRadius: '4px', marginBottom: '10px', backgroundColor: '#1e1e1e' }} />
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
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
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const [activeTab, setActiveTab] = useState(isMobile ? 'projects' : 'readme');
  const [tabs, setTabs] = useState(isMobile ? ['projects'] : ['readme']);
  const [folderOpen, setFolderOpen] = useState({ portfolio: true, node_modules: false, src: true, controllers: true, routes: true });
  const [lineNumbers, setLineNumbers] = useState([]);
  const [cursor, setCursor] = useState({ ln: 1, col: 1 });
  const [animate, setAnimate] = useState(false);
  const [showWelcome, setShowWelcome] = useState(true);
  const [{ runTour, tourSteps }, setTourState] = useState({
    runTour: false,
    tourSteps: [
      {
        target: '#tour-explorer',
        content: (
          <div>
            <h3 style={{display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '16px'}}><i className="fa-regular fa-copy" style={{color: 'var(--syntax-func)', marginRight: '10px'}}></i>File Explorer</h3>
            <p style={{lineHeight: '1.5', fontSize: '14px', margin: 0}}>On the left, the Explorer lets you open files like <code>projects.js</code> or <code>README.md</code>.</p>
          </div>
        ),
      },
      {
        target: '#tour-career',
        content: (
          <div>
            <h3 style={{display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '16px'}}><i className="fa-solid fa-code-branch" style={{color: 'var(--accent)', marginRight: '10px'}}></i>Career Control</h3>
            <p style={{lineHeight: '1.5', fontSize: '14px', margin: 0}}>Click the Git Branch icon to view my career timeline, designed just like a real Git commit graph.</p>
          </div>
        ),
      },
      {
        target: '#tour-settings',
        content: (
          <div>
            <h3 style={{display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '16px'}}><i className="fa-solid fa-gear" style={{color: 'var(--syntax-string)', marginRight: '10px'}}></i>Customization</h3>
            <p style={{lineHeight: '1.5', fontSize: '14px', margin: 0}}>Click the Gear icon to open Settings. From there, you can switch between amazing color themes!</p>
          </div>
        ),
      },
      {
        target: '#tour-editor',
        content: (
          <div>
            <h3 style={{display: 'flex', alignItems: 'center', marginBottom: '10px', fontSize: '16px'}}><i className="fa-solid fa-code" style={{color: 'var(--syntax-keyword)', marginRight: '10px'}}></i>Editor</h3>
            <p style={{lineHeight: '1.5', fontSize: '14px', margin: 0}}>And finally, this is the main editor. View all my portfolio details here. Enjoy your stay!</p>
          </div>
        ),
      }
    ]
  });

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setTourState({ runTour: false, tourSteps });
    }
  };
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeActivity, setActiveActivity] = useState('explorer');
  const [theme, setTheme] = useState('synthwave');
  
  const themeColors = {
    cafe: '#e8a07c',
    synthwave: '#e22f80',
    green: '#8eca3c',
    blue: '#2f2fe4'
  };
  const [sidebarWidth, setSidebarWidth] = useState(250);
  const [isResizing, setIsResizing] = useState(false);

  const startResizing = (e) => {
    setIsResizing(true);
    e.preventDefault();
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing) return;
      let newWidth = e.clientX - 50; // Activity bar is ~50px
      if (newWidth < 150) newWidth = 150;
      if (newWidth > 600) newWidth = 600;
      setSidebarWidth(newWidth);
    };

    const handleMouseUp = () => {
      setIsResizing(false);
    };

    if (isResizing) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    } else {
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, [isResizing]);

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);

  useEffect(() => {
    const data = fileContents[activeTab];
    if (!data) return;
    
    let lines = 25;
    if (activeTab === 'projects') lines = 35;
    if (activeTab === 'package-json') lines = 20;
    if (activeTab === 'experience') lines = 30;
    
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
    setMobileMenuOpen(false);
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
    <>
    {showWelcome && (
      <div className="guide-modal-overlay">
        <div className="guide-modal" style={{animation: 'modalPop 0.3s ease-out'}}>
          <h2><i className="fa-solid fa-terminal" style={{color: 'var(--syntax-keyword)', marginRight: '10px'}}></i>Welcome to Dhrubo's IDE!</h2>
          <p style={{marginBottom: '30px', color: 'var(--text-muted)', lineHeight: '1.5'}}>This portfolio is designed like a real code editor. Would you like a guided tour to see how to navigate?</p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
            <button className="tour-btn" style={{background: 'var(--accent)', color: 'var(--bg-darkest)', border: 'none', fontWeight: 'bold'}} onClick={() => { setShowWelcome(false); setTourState(prev => ({...prev, runTour: true})); }}>Take a Tour</button>
            <button className="tour-btn" onClick={() => setShowWelcome(false)}>Explore Freely</button>
          </div>
        </div>
      </div>
    )}
    
    <Joyride
      callback={handleJoyrideCallback}
      continuous
      hideCloseButton
      run={runTour}
      scrollToFirstStep
      showProgress
      showSkipButton
      steps={tourSteps}
      floaterProps={{
        styles: {
          floater: {
            maxWidth: '90vw'
          }
        }
      }}
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#ffca95',
          backgroundColor: 'var(--bg-dark)',
          textColor: 'var(--text)',
          arrowColor: 'var(--bg-dark)',
          overlayColor: 'rgba(0, 0, 0, 0.7)'
        },
        beaconInner: {
          backgroundColor: '#ffca95'
        },
        beaconOuter: {
          border: '2px solid #ffca95',
          backgroundColor: 'transparent'
        },
        buttonNext: {
          fontWeight: 'bold',
          color: 'var(--bg-darkest)'
        },
        buttonBack: {
          color: 'var(--text-muted)'
        }
      }}
    />

    <div className="app-container">
      {/* Activity Bar */}
      <div className="activity-bar">
          <div className={`activity-icon ${activeActivity === 'explorer' ? 'active' : ''}`} id="tour-explorer" title="Explorer" onClick={() => { setActiveActivity('explorer'); setMobileMenuOpen(true); }}>
              <i className="fa-regular fa-copy"></i>
          </div>
          <div className={`activity-icon ${activeActivity === 'source-control' ? 'active' : ''}`} id="tour-career" title="Career Control" onClick={() => { setActiveActivity('source-control'); setMobileMenuOpen(true); }}>
              <i className="fa-solid fa-code-branch"></i>
          </div>
          <div className="activity-spacer"></div>
          <div className={`activity-icon ${activeActivity === 'settings' ? 'active' : ''}`} id="tour-settings" title="Settings" onClick={() => { setActiveActivity('settings'); setMobileMenuOpen(true); }}>
              <i className="fa-solid fa-gear"></i>
          </div>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`} style={{ width: `${sidebarWidth}px` }}>
          {activeActivity === 'explorer' ? (
            <>
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
                    <div className={`folder-item ${!folderOpen.node_modules ? 'collapsed' : ''}`} onClick={() => toggleFolder('node_modules')}>
                        <i className="fa-solid fa-chevron-down toggle-icon"></i>
                        <i className="fa-solid fa-folder" style={{color: '#83cd29'}}></i>
                        <span>node_modules</span>
                    </div>

                    <div className={`folder-item ${!folderOpen.src ? 'collapsed' : ''}`} onClick={() => toggleFolder('src')}>
                        <i className="fa-solid fa-chevron-down toggle-icon"></i>
                        <i className="fa-solid fa-folder" style={{color: '#699dfb'}}></i>
                        <span>src</span>
                    </div>
                    
                    {folderOpen.src && (
                      <div className="folder-contents">
                          <div className={`folder-item ${!folderOpen.routes ? 'collapsed' : ''}`} onClick={() => toggleFolder('routes')}>
                              <i className="fa-solid fa-chevron-down toggle-icon"></i>
                              <i className="fa-solid fa-folder" style={{color: '#dcb67a'}}></i>
                              <span>routes</span>
                          </div>
                          {folderOpen.routes && (
                            <div className="folder-contents">
                                <div className={`file-item file-md ${activeTab === 'projects' ? 'active' : ''}`} onClick={() => openFile('projects')} style={{paddingLeft: '55px'}}>
                                  <i className="fa-brands fa-js" style={{color: '#f1e05a'}}></i>
                                  <span>projects.js</span>
                                </div>
                            </div>
                          )}
                      </div>
                    )}

                    <div className={`file-item file-md ${activeTab === 'readme' ? 'active' : ''}`} onClick={() => openFile('readme')}>
                        <i className="fa-brands fa-markdown" style={{color: '#699dfb'}}></i>
                        <span>README.md</span>
                    </div>

                    <div className={`file-item file-json ${activeTab === 'package-json' ? 'active' : ''}`} onClick={() => openFile('package-json')}>
                        <i className="fa-brands fa-node-js" style={{color: '#83cd29'}}></i>
                        <span>package.json</span>
                    </div>
                </div>
              )}
          </div>
            </>
          ) : activeActivity === 'source-control' ? (
            <SourceControlPanel />
          ) : (
            <SettingsPanel currentTheme={theme} setTheme={setTheme} />
          )}
      </div>
      <div className="sidebar-resizer" onMouseDown={startResizing}></div>

      {/* Editor Area */}
      <div id="tour-editor" className="editor-area">
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
                        fileContents[activeTab].content(openFile, setActiveActivity, setMobileMenuOpen) : 
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
    </>
  )
}

export default App
