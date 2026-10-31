export const personalInfo = {
  name: "AR Dhrubo",
  headline: "Product Builder",
  heroHeadline: "A little curiosity.",
  heroHeadlineAccent: "Something useful.",
  heroIntro: "I build thoughtful web experiences and the systems behind them—with an engineer’s precision and a researcher’s curiosity.",
  heroTechnologies: [
    { name: 'React', logo: 'react' },
    { name: 'Next.js', logo: 'nextjs' },
    { name: 'Node.js', logo: 'nodejs' },
    { name: 'Python', logo: 'python' },
    { name: 'PostgreSQL', logo: 'postgresql' },
    { name: 'Puppeteer', logo: 'puppeteer' },
  ],
  heroCapabilities: [
    { label: 'Full-stack development', detail: 'React / Next.js / Node.js' },
    { label: 'Workflow automation', detail: 'Python / Puppeteer / Data pipelines' },
    { label: 'Backend engineering', detail: 'REST APIs / PostgreSQL / Integrations' },
  ],
  fullName: "Abdur Rahman Dhrubo",
  avatar: "/dhrubo-profile.jpg",
  role: "Full-Stack Software Engineer & Scientific Computing Researcher",
  tagline: "Architecting high-performance full-stack web platforms and scientific computing simulations (Monte Carlo & quantum DFT modeling).",
  bio: "Full-stack software engineer and computational researcher with 50+ shipped projects. I build fast React/Next.js web applications, resilient backend architectures, and high-performance scientific simulations.",
  location: "Dhaka, Bangladesh",
  timezone: "GMT+6 (Worldwide Remote)",
  status: "Available for Full-time Roles & Contracts",
  statusColor: "#22c55e", // Technical Emerald
  email: "ardhrubo@gmail.com",
  socials: {
    github: "https://github.com/ardhrubo",
    linkedin: "https://www.linkedin.com/in/ardhrubo/",
    peerlist: "https://peerlist.io/ardhrubo",
    facebook: "https://www.facebook.com/backbencherchemist",
    youtube: "https://www.youtube.com/@randomdhrubo"
  },
  stats: [
    { label: "Shipped Projects", value: "50+", icon: "fa-solid fa-rocket", desc: "Full-stack web & tools" },
    { label: "Years Experience", value: "3+", icon: "fa-solid fa-code-commit", desc: "Full-stack & scientific research" },
    { label: "Simulation Runs", value: "100k+", icon: "fa-solid fa-chart-line", desc: "Monte Carlo stochastic models" },
    { label: "Client Satisfaction", value: "100%", icon: "fa-solid fa-star", desc: "Global clients & research" }
  ]
};

// Engineering Strategy & Methodology Steps
export const engineeringStrategy = [
  {
    step: "01",
    phase: "Architecture & Design",
    shortPhase: "Design",
    summary: "Map the problem. Build a foundation that can grow.",
    badge: "Foundation",
    title: "Designing for Scale Before Code",
    description: "Mapping typed schemas, REST contracts, and anti-bot threat models before implementation to ensure long-term stability.",
    deliverables: [
      "Strict data schemas & TypeScript REST contracts",
      "Anti-bot threat modeling & proxy rotation strategy",
      "Component hierarchy & render-cycle optimization",
      "Database indexing & query latency benchmarks"
    ],
    metric: "99.9% Planned Uptime"
  },
  {
    step: "02",
    phase: "Full-Stack Web Build",
    shortPhase: "Build",
    summary: "Turn the plan into a fast, thoughtful experience.",
    badge: "Frontend",
    title: "Clean, Ultra-Fast Web Delivery",
    description: "Developing modern SPAs and SSR portals with React and Next.js, prioritizing sub-second loads and responsive mobile UX.",
    deliverables: [
      "Modular React / Next.js architecture with zero bloat",
      "Glassmorphic, accessible UI with custom CSS tokens",
      "Core Web Vitals tuned for 95+ PageSpeed scores",
      "Automated unit & component integration tests"
    ],
    metric: "< 1.2s First Paint"
  },
  {
    step: "03",
    phase: "Automation & Crawling",
    shortPhase: "Automate",
    summary: "Connect the pieces and let the repetitive work flow.",
    badge: "Automation",
    title: "High-Concurrency Web Scraping",
    description: "Deploying distributed Puppeteer crawlers that bypass anti-bot hurdles and extract clean structured data seamlessly.",
    deliverables: [
      "Headless Chrome browser worker pools",
      "Header randomization & TLS fingerprint emulation",
      "Asynchronous worker queues with auto-retry logic",
      "Sanitized JSON and CSV export pipelines"
    ],
    metric: "1M+ Records Extracted"
  },
  {
    step: "04",
    phase: "Scientific QA & Verification",
    shortPhase: "Verify",
    summary: "Test the details and make the result dependable.",
    badge: "Verification",
    title: "Empirical Testing & Validation",
    description: "Validating edge cases, concurrency spikes, and user journeys with automated test suites and stress testing.",
    deliverables: [
      "Stress testing under high concurrent traffic",
      "End-to-end journey validation with Cypress / Playwright",
      "Monte Carlo uncertainty modeling for data pipelines",
      "Comprehensive Swagger API docs and developer guides"
    ],
    metric: "Zero-Downtime Releases"
  }
];

// Interactive Automation Playground Simulation Scenarios
export const automationScenarios = [
  {
    id: "scraper",
    name: "E-Commerce Dynamic Price Crawler",
    icon: "fa-solid fa-cart-shopping",
    tag: "Puppeteer / Stealth",
    description: "Bypasses client-side rendering & bot challenges to extract live product pricing across 500+ SKUs.",
    executionTime: "248ms",
    successRate: "100%",
    recordsFound: "524 items",
    logs: [
      "[00:00.012] Initializing Puppeteer headless Chrome cluster (Pool: 4 workers)...",
      "[00:00.045] Applying stealth plugin & randomized TLS canvas fingerprint...",
      "[00:00.098] Navigating to target catalog (Single Page App with lazy hydration)...",
      "[00:00.142] Waiting for DOM selector '.product-grid' & evaluating infinite scroll...",
      "[00:00.198] Intercepted 14 network XHR payloads; parsing pricing and stock status...",
      "[00:00.248] Extraction complete: 524 items parsed, 0 captcha blocks, JSON generated."
    ],
    sampleOutput: {
      status: "SUCCESS",
      time_elapsed_ms: 248,
      items_extracted: 524,
      currency: "USD",
      sample: [
        { sku: "PROD-9821", name: "Ultra-Light Carbon Monitor", price: 349.99, in_stock: true },
        { sku: "PROD-9822", name: "Ergonomic Mechanical Keyboard", price: 129.50, in_stock: true }
      ]
    }
  },
  {
    id: "serp",
    name: "DuckDuckGo Bulk SERP Extraction",
    icon: "fa-solid fa-magnifying-glass",
    tag: "High-Volume Data",
    description: "Executes concurrent search queries without rate-limits and yields structured ranking metrics.",
    executionTime: "186ms",
    successRate: "99.8%",
    recordsFound: "1,200 search results",
    logs: [
      "[00:00.008] Spawning async worker batch with rotating residential proxies...",
      "[00:00.052] Query dispatched: 'Software engineering & computational research'...",
      "[00:00.095] Response status 200 OK received; stripping tracking parameters...",
      "[00:00.138] Parsing organic snippet titles, hyperlinks, and meta descriptions...",
      "[00:00.186] Structured SERP dataset normalized into CSV/JSON format."
    ],
    sampleOutput: {
      query: "Software engineering & computational research",
      total_rankings: 1200,
      organic_results: [
        { rank: 1, title: "Monte Carlo Probabilistic Risk Assessment", domain: "researchgate.net" },
        { rank: 2, title: "High-Throughput Web Automation Pipelines", domain: "github.com/ardhrubo" }
      ]
    }
  },
  {
    id: "bot",
    name: "Indian Visa Slot Sentinel Bot",
    icon: "fa-solid fa-robot",
    tag: "Real-Time Watcher",
    description: "Monitors appointment portal 24/7, detects open booking windows, and fires instant webhooks.",
    executionTime: "92ms",
    successRate: "100%",
    recordsFound: "Slots Detected",
    logs: [
      "[00:00.005] Authenticating secure session with authorization token...",
      "[00:00.032] Querying calendar matrix for next 60 calendar days...",
      "[00:00.058] Alert: Open booking slots detected in consular zone!",
      "[00:00.076] Dispatching urgent webhook notification to Telegram & SMS gateway...",
      "[00:00.092] Notification delivered in 16ms; reserved candidate timestamp."
    ],
    sampleOutput: {
      alert_status: "OPEN_SLOT_DETECTED",
      consulate: "Dhaka Regional Visa Centre",
      available_dates: ["2026-11-04 10:30 AM", "2026-11-04 11:15 AM"],
      dispatch_latency: "16ms"
    }
  },
  {
    id: "montecarlo",
    name: "Monte Carlo Risk Assessment Model",
    icon: "fa-solid fa-chart-line",
    tag: "Scientific Research",
    description: "Runs 100,000 probabilistic iterations to quantify contaminant exposure hazard indices.",
    executionTime: "310ms",
    successRate: "100%",
    recordsFound: "100k Iterations",
    logs: [
      "[00:00.010] Initializing NumPy distribution arrays with log-normal parameters...",
      "[00:00.080] Executing 100,000 stochastic sampling runs across 6 exposure pathways...",
      "[00:00.185] Calculating 95th percentile Cumulative Hazard Index (HI)...",
      "[00:00.250] Generating probability density function (PDF) & sensitivity coefficients...",
      "[00:00.310] Simulation converged; uncertainty bounds validated against empirical baseline."
    ],
    sampleOutput: {
      iterations: 100000,
      hazard_index_mean: 0.428,
      hazard_index_p95: 0.891,
      uncertainty_status: "ACCEPTABLE_LIMITS",
      simulation_convergence: "99.98%"
    }
  }
];

// All 21 Complete Projects
export const projectsData = [
  {
    id: "brownsinterior",
    title: "Brown's Interior",
    subtitle: "Luxury Interior & 3D Architecture Platform",
    url: "https://brownsinterior.com/",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    featured: true,
    image: "/projects/brownsinterior.png",
    badge: "Client Production",
    desc: "Luxury interior design and 3D architecture platform built with React, Three.js, and Supabase.",
    longDesc: "A digital showcase and client engagement platform built for Brown's Interior, featuring interactive 3D spatial walkthroughs, turnkey architectural service catalogs, Supabase backend integration, and local SEO optimization.",
    tech: ["React 19", "Three.js", "React Three Fiber", "Supabase", "Framer Motion", "Vite"],
    highlights: ["Interactive 3D spatial rendering with Three.js", "Supabase inquiry routing & backend CMS", "Turnkey architectural project showcase", "Cinematic Framer Motion animations"],
    hasLiveDemo: true,
    githubUrl: "https://github.com/ardhrubo/brownsinterior"
  },
  {
    id: "squicyuap",
    title: "Squicy UAP",
    subtitle: "E-Commerce & Food Ordering Platform",
    url: "https://www.squicyuap.com/",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    featured: true,
    image: "/projects/squicyuap.png",
    badge: "Live E-Commerce",
    desc: "Full-stack campus food ordering platform serving 5,000+ UAP students with real-time cart persistence and local fulfillment.",
    longDesc: "Engineered with React, Zustand state management, and optimized SEO schemas, Squicy UAP allows students and campus staff to explore natural juices, customize add-ons, manage live cart orders, and schedule on-campus pickup.",
    tech: ["React", "Zustand", "Node.js", "E-Commerce", "SEO / Schema.org", "Modern CSS"],
    highlights: ["Live production ordering serving UAP community", "Real-time cart state with persistence", "Structured JSON-LD Local SEO rich snippets", "Fast mobile-first responsive checkout"],
    hasLiveDemo: true,
    githubUrl: null
  },
  {
    id: "horizontaxsolution",
    title: "Horizon Tax Solution",
    subtitle: "Enterprise Client Application",
    url: "https://www.horizontaxsolutions.com.au/",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    featured: true,
    image: "/projects/horizontaxsolution.png",
    badge: "Client Production",
    desc: "Tax & accounting web platform built for Australian clients, featuring automated inquiries and 100% mobile PageSpeed.",
    longDesc: "Built for an established accounting firm in Australia, Horizon Tax Solution provides clients with transparent service listings, automated inquiry routing, high-performance SEO rankings, and a lightning-fast mobile-first design.",
    tech: ["React", "Node.js", "Modern CSS", "SEO Architecture", "Responsive"],
    highlights: ["Australian market deployment", "High conversion lead funnel", "100% PageSpeed mobile rating"],
    hasLiveDemo: true,
    githubUrl: null
  },
  {
    id: "scrapeautomate",
    title: "ScrapeAutomate",
    subtitle: "High-Throughput Scraping Engine",
    url: "https://scrapeautomate.com/",
    category: "automation",
    categoryLabel: "Automation & Bots",
    featured: true,
    image: "/projects/scrapeautomate.png",
    badge: "SaaS Platform",
    desc: "Enterprise web automation and scraping platform built with Puppeteer, featuring headless browser orchestration and anti-bot bypass.",
    longDesc: "ScrapeAutomate empowers businesses to extract structured data from challenging websites with anti-scraping safeguards, automated browser clustering, and headless instance orchestration.",
    tech: ["Puppeteer", "Node.js", "Automation", "Headless Chrome", "REST APIs"],
    highlights: ["Distributed crawler architecture", "Anti-bot evasion techniques", "Automated JSON/CSV data export"],
    hasLiveDemo: true,
    githubUrl: null
  },
  {
    id: "admissionbondhu",
    title: "Admission Bondhu",
    subtitle: "Higher Education Portal",
    url: "https://admissionbondhu.com/",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    featured: true,
    image: "/projects/admissionbondhu.png",
    badge: "Live Education Platform",
    desc: "Centralized university admissions directory with smart search, eligibility filters, and instant notifications for applicants.",
    longDesc: "Admission Bondhu aggregates admission details across universities, featuring smart search, eligibility filters, and instant notification systems to democratize higher education guidance.",
    tech: ["React", "Node.js", "Express", "Database", "REST APIs"],
    highlights: ["Thousands of active student visits", "Intuitive search & filter", "Mobile-optimized interface"],
    hasLiveDemo: true,
    githubUrl: null
  },
  {
    id: "emailhider",
    title: "Email Blurrer Chrome Extension",
    subtitle: "Browser Privacy Utility",
    url: "https://chromewebstore.google.com/detail/copippkpbpdkhjpcbaibpjdmaanccocc?utm_source=item-share-cb",
    category: "tools",
    categoryLabel: "Tools & Extensions",
    featured: true,
    image: "/projects/emailhider.png",
    badge: "Chrome Web Store",
    desc: "Official Chrome Web Store privacy extension that detects and blurs sensitive email addresses during screen sharing.",
    longDesc: "Designed for streamers, presenters, and remote workers who share screens regularly. Email Blurrer actively monitors the DOM and obscures email addresses with configurable blur levels, preserving personal and client privacy.",
    tech: ["JavaScript", "Chrome Extensions API", "DOM MutationObserver", "Regex Privacy"],
    highlights: ["Published on Google Chrome Web Store", "Zero network tracking", "Real-time DOM obfuscation"],
    hasLiveDemo: true,
    githubUrl: null
  },
  {
    id: "passglobaledu",
    title: "Pass Global Edu",
    subtitle: "Global Education Consultancy",
    url: "https://passglobaledu.com",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    featured: true,
    image: "/projects/passglobaledu.png",
    badge: "Client Production",
    desc: "Overseas education consultancy portal built with Next.js, featuring global university directories and appointment booking.",
    longDesc: "A complete brand and digital web platform built for Pass Global Edu to scale student recruitments across the UK, USA, Canada, and Australia.",
    tech: ["Next.js", "React", "Server-Side Rendering", "Responsive Design"],
    highlights: ["Fast Next.js SSR performance", "Interactive course directories", "Direct appointment scheduler"],
    hasLiveDemo: true,
    githubUrl: null
  },
  {
    id: "watchfirebd",
    title: "WatchFire BD",
    subtitle: "Corporate Brand Presence",
    url: "https://watchfirebd.com",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    featured: false,
    image: "/projects/watchfirebd.png",
    badge: "Commercial Client",
    desc: "Corporate web presence with interactive product showcases, enterprise inquiries, and fast asset delivery.",
    longDesc: "Designed with responsive glassmorphism, rapid load times, and structured content hierarchy to maximize engagement with corporate clients.",
    tech: ["JavaScript", "HTML5", "Modern CSS", "Performance Tuning"],
    highlights: ["Modern corporate identity", "Responsive across all viewports", "Fast asset delivery"],
    hasLiveDemo: true,
    githubUrl: null
  },
  {
    id: "hasib",
    title: "Hasib Client Portfolio",
    subtitle: "Bespoke Portfolio Engineering",
    url: "https://github.com/ardhrubo/hasib",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    featured: false,
    image: "/projects/hasib.png",
    badge: "Client Delivery",
    desc: "Bespoke personal portfolio website built with custom layouts, smooth interactions, and mobile optimization.",
    longDesc: "Tailored to client specifications, this portfolio implements clean aesthetics, responsive typography, and fast performance across devices.",
    tech: ["JavaScript", "HTML5", "CSS3", "Responsive UX"],
    highlights: ["Custom client layout", "Clean component structure", "Optimized mobile viewports"],
    hasLiveDemo: false,
    githubUrl: "https://github.com/ardhrubo/hasib"
  },
  {
    id: "medusajs",
    title: "MedusaJS Headless E-Commerce",
    subtitle: "Modern Digital Commerce",
    url: "https://github.com/ardhrubo/medusajs",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    featured: false,
    image: "/projects/medusajs.png",
    badge: "Headless E-Commerce",
    desc: "Headless e-commerce storefront and backend built with MedusaJS and custom checkout handling.",
    longDesc: "Demonstrating headless commerce integration with decoupled frontend, automated inventory webhooks, and scalable multi-currency handling.",
    tech: ["MedusaJS", "Node.js", "PostgreSQL", "Headless Commerce"],
    highlights: ["Decoupled architecture", "Custom plugin support", "Flexible catalog schemas"],
    hasLiveDemo: false,
    githubUrl: "https://github.com/ardhrubo/medusajs"
  },
  {
    id: "fullstack-docker",
    title: "Fullstack Docker Environment",
    subtitle: "DevOps & Containerization",
    url: "https://github.com/ardhrubo/fullstack-docker",
    category: "tools",
    categoryLabel: "Tools & DevOps",
    featured: false,
    image: "/projects/fullstack-docker.png",
    badge: "Developer Tool",
    desc: "Multi-container Docker boilerplate for React, Node, PostgreSQL, and Nginx development.",
    longDesc: "Includes hot-reloading configurations for React frontend, Node backend, PostgreSQL database, and Nginx reverse proxy with SSL termination readiness.",
    tech: ["Docker", "Docker Compose", "Nginx", "DevOps"],
    highlights: ["Zero-friction local setup", "Multi-stage production build", "Reverse proxy integration"],
    hasLiveDemo: false,
    githubUrl: "https://github.com/ardhrubo/fullstack-docker"
  },
  {
    id: "bulk-duckduckgo-search-tool",
    title: "DuckDuckGo Bulk Query Engine",
    subtitle: "Data Extraction & Scraping",
    url: "https://github.com/ardhrubo/bulk-duckduckgo-search-tool",
    category: "automation",
    categoryLabel: "Automation & Bots",
    featured: false,
    image: "/projects/bulk-duckduckgo-search-tool.png",
    badge: "Automation CLI",
    desc: "Concurrent DuckDuckGo search query utility that extracts structured SERP data without rate limits.",
    longDesc: "Solves rate limiting and captchas through async worker pools, sanitized JSON exports, and modular query batching.",
    tech: ["JavaScript", "Node.js", "Data Extraction", "CLI"],
    highlights: ["Batch concurrent queries", "Structured JSON/CSV output", "Anti-throttling delay control"],
    hasLiveDemo: false,
    githubUrl: "https://github.com/ardhrubo/bulk-duckduckgo-search-tool"
  },
  {
    id: "indianvisa",
    title: "Indian Visa Slot Monitor Bot",
    subtitle: "Automated Booking Agent",
    url: "https://github.com/ardhrubo/indianvisa",
    category: "automation",
    categoryLabel: "Automation & Bots",
    featured: false,
    image: "/projects/indianvisa.png",
    badge: "Automation Bot",
    desc: "24/7 visa appointment slot monitor with instant webhook alerts and fast notification delivery.",
    longDesc: "Monitors appointment calendars 24/7, detects open appointment windows in milliseconds, and notifies users with webhook dispatch.",
    tech: ["Python", "Automation", "Bot", "Webhooks"],
    highlights: ["24/7 slot monitoring", "Sub-second notification alerts", "Error recovery mechanisms"],
    hasLiveDemo: false,
    githubUrl: "https://github.com/ardhrubo/indianvisa"
  },
  {
    id: "bot",
    title: "Custom Automation Bot Suite",
    subtitle: "Python Task Automation",
    url: "https://github.com/ardhrubo/bot",
    category: "automation",
    categoryLabel: "Automation & Bots",
    featured: false,
    image: "/projects/bot.png",
    badge: "Automation Bot",
    desc: "Python automation suite for scheduled data extraction, task execution, and webhook broadcasting.",
    longDesc: "Configured with modular task handlers, cron schedules, and robust logging to run autonomously on remote servers.",
    tech: ["Python", "Task Scheduling", "Automation", "Webhooks"],
    highlights: ["Configurable task runners", "Robust exception handling", "Discord/Telegram webhook alerts"],
    hasLiveDemo: false,
    githubUrl: "https://github.com/ardhrubo/bot"
  },
  {
    id: "free-claude-code",
    title: "Free Claude Code Harness",
    subtitle: "AI Exploration & Integration",
    url: "https://github.com/ardhrubo/free-claude-code",
    category: "tools",
    categoryLabel: "Tools & DevOps",
    featured: false,
    image: "/projects/free-claude-code.png",
    badge: "AI Research",
    desc: "Developer testbed exploring autonomous AI coding integrations and terminal command harnesses.",
    longDesc: "Researches terminal command bridging, file system exploration by LLMs, and prompt engineering protocols for automated debugging.",
    tech: ["AI / LLMs", "Node.js", "CLI Tools", "Prompt Engineering"],
    highlights: ["Autonomous code agent tests", "Terminal automation harness", "Open architecture"],
    hasLiveDemo: false,
    githubUrl: "https://github.com/ardhrubo/free-claude-code"
  },
  {
    id: "researchtool",
    title: "Scientific Research Data Tool",
    subtitle: "Computational Data Pipeline",
    url: "https://github.com/ardhrubo/researchtool",
    category: "tools",
    categoryLabel: "Tools & DevOps",
    featured: false,
    image: "/projects/researchtool.png",
    badge: "Scientific Utility",
    desc: "Python data tool for aggregating laboratory metrics and formatting scientific simulation outputs.",
    longDesc: "Automates repetitive statistical transformations and parses output files from scientific simulation engines into clean formats.",
    tech: ["Python", "NumPy", "Scientific Data", "Automation"],
    highlights: ["Scientific format parsers", "Monte Carlo integration", "Automated graph generators"],
    hasLiveDemo: false,
    githubUrl: "https://github.com/ardhrubo/researchtool"
  }
];

export const skillsData = [
  {
    category: "Frontend Development",
    icon: "fa-brands fa-react",
    color: "#22c55e",
    description: "Building responsive, accessible, and ultra-fast web user interfaces.",
    skills: [
      { name: "React.js", level: "Advanced", icon: "fa-brands fa-react" },
      { name: "Next.js", level: "Proficient", icon: "fa-solid fa-n" },
      { name: "TypeScript", level: "Advanced", icon: "fa-solid fa-code" },
      { name: "JavaScript (ES6+)", level: "Expert", icon: "fa-brands fa-js" },
      { name: "HTML5 & Modern CSS", level: "Expert", icon: "fa-brands fa-html5" },
      { name: "Tailwind & Responsive UI", level: "Advanced", icon: "fa-solid fa-mobile-screen-button" },
      { name: "State Management (Zustand/Redux)", level: "Advanced", icon: "fa-solid fa-cubes" },
      { name: "Vite & Modern Tooling", level: "Advanced", icon: "fa-solid fa-bolt" }
    ]
  },
  {
    category: "Backend & Systems",
    icon: "fa-solid fa-server",
    color: "#10b981",
    description: "Architecting reliable REST APIs, database schemas, and microservices.",
    skills: [
      { name: "Node.js", level: "Advanced", icon: "fa-brands fa-node" },
      { name: "Express.js", level: "Advanced", icon: "fa-solid fa-network-wired" },
      { name: "Python", level: "Advanced", icon: "fa-brands fa-python" },
      { name: "RESTful APIs & Swagger", level: "Expert", icon: "fa-solid fa-route" },
      { name: "Microservices Architecture", level: "Proficient", icon: "fa-solid fa-sitemap" },
      { name: "Authentication & JWT", level: "Advanced", icon: "fa-solid fa-lock" }
    ]
  },
  {
    category: "Databases & Cloud Storage",
    icon: "fa-solid fa-database",
    color: "#34d399",
    description: "Configuring high-availability relational datastores, caching layers, and BaaS.",
    skills: [
      { name: "PostgreSQL & SQL", level: "Advanced", icon: "fa-solid fa-database" },
      { name: "Supabase (Auth / DB / Edge)", level: "Advanced", icon: "fa-solid fa-bolt" },
      { name: "MongoDB & NoSQL", level: "Advanced", icon: "fa-solid fa-leaf" },
      { name: "Redis & In-Memory Cache", level: "Proficient", icon: "fa-solid fa-memory" },
      { name: "Schema Design & Indexing", level: "Advanced", icon: "fa-solid fa-table-columns" },
      { name: "Postman & API Testing", level: "Advanced", icon: "fa-solid fa-vial" }
    ]
  },
  {
    category: "Web Automation & Scraping",
    icon: "fa-solid fa-robot",
    color: "#22c55e",
    description: "Automating repetitive workflows, web crawling, and data extraction pipelines.",
    skills: [
      { name: "Puppeteer", level: "Expert", icon: "fa-solid fa-spider" },
      { name: "Playwright", level: "Advanced", icon: "fa-solid fa-masks-theater" },
      { name: "High-Throughput Scraping", level: "Expert", icon: "fa-solid fa-file-export" },
      { name: "Headless Chrome Clusters", level: "Expert", icon: "fa-solid fa-window-restore" },
      { name: "Anti-Bot & Proxy Rotation", level: "Advanced", icon: "fa-solid fa-shield-halved" },
      { name: "Chrome Extensions", level: "Proficient", icon: "fa-brands fa-chrome" }
    ]
  },
  {
    category: "Scientific & Computational Research",
    icon: "fa-solid fa-atom",
    color: "#10b981",
    description: "Conducting data modeling, uncertainty analysis, and quantum chemistry computations.",
    skills: [
      { name: "Monte Carlo Simulations", level: "Advanced", icon: "fa-solid fa-chart-line" },
      { name: "Health Risk Assessment (HRA)", level: "Advanced", icon: "fa-solid fa-heart-pulse" },
      { name: "DFT Modeling (ORCA/Gaussian)", level: "Proficient", icon: "fa-solid fa-dna" },
      { name: "NumPy & SciPy Data Analysis", level: "Advanced", icon: "fa-solid fa-chart-pie" },
      { name: "Computational Chemistry", level: "Advanced", icon: "fa-solid fa-flask" },
      { name: "Three.js & WebGL Visualization", level: "Proficient", icon: "fa-solid fa-cube" }
    ]
  },
  {
    category: "DevOps, Linux & AI Workflows",
    icon: "fa-solid fa-terminal",
    color: "#34d399",
    description: "Automating container deployments, Linux HPC environments, and LLM agent pipelines.",
    skills: [
      { name: "Docker & Compose", level: "Proficient", icon: "fa-brands fa-docker" },
      { name: "Linux (Ubuntu HPC & Server)", level: "Advanced", icon: "fa-brands fa-linux" },
      { name: "Git & GitHub Actions CI/CD", level: "Advanced", icon: "fa-brands fa-github" },
      { name: "Nginx & Caddy Reverse Proxy", level: "Proficient", icon: "fa-solid fa-server" },
      { name: "LLM APIs & Prompt Engineering", level: "Advanced", icon: "fa-solid fa-brain" },
      { name: "Automated E2E QA Suites", level: "Proficient", icon: "fa-solid fa-gears" }
    ]
  }
];

export const experienceData = [
  {
    role: "Academic Researcher",
    company: "Jagannath University, Dhaka",
    period: "Mar 2026 – Present",
    duration: "8 mos",
    type: "Scientific Computing & Research",
    category: "research",
    location: "Dhaka, Bangladesh",
    icon: "fa-solid fa-atom",
    color: "#059669",
    description: "Developing computational models and stochastic simulations for Probabilistic Health Risk Assessment (HRA) and molecular systems.",
    achievements: [
      "Developing Python-based Monte Carlo simulations (100k+ iterations) for Probabilistic Health Risk Assessment (HRA).",
      "Utilizing ORCA and Gaussian on Linux (Ubuntu) HPC environments to perform DFT calculations for molecular modeling.",
      "Quantifying uncertainty in environmental contaminants to move beyond single-point deterministic risk estimates."
    ],
    tech: ["Python", "Monte Carlo", "ORCA", "Gaussian", "Linux (Ubuntu)", "NumPy/SciPy", "DFT"]
  },
  {
    role: "Software Associate",
    company: "Constant Research and Innovation Lab (CRILab)",
    period: "Mar 2024 – Present",
    duration: "2 yrs 8 mos",
    type: "Scientific Software & Lab",
    category: "research",
    location: "Dhaka, Bangladesh",
    icon: "fa-solid fa-flask-vial",
    color: "#0d9488",
    description: "Architecting scientific data aggregation pipelines, computational chemistry utilities, and lab workflow tooling.",
    achievements: [
      "Automated scientific data aggregation and sanitization across heterogeneous laboratory experimental datasets.",
      "Developed reusable Python software libraries and analysis modules for accelerated chemistry research workflows.",
      "Collaborated with interdisciplinary researchers to turn lab raw data into structured computational models."
    ],
    tech: ["Python", "Data Aggregation", "Computational Chemistry", "Linux", "Git"]
  },
  {
    role: "Back End Developer",
    company: "Upwork",
    period: "Oct 2024 – Present",
    duration: "2 yrs 1 mo",
    type: "Contract / Global Freelance",
    category: "engineering",
    location: "Worldwide Remote",
    icon: "fa-solid fa-briefcase",
    color: "#22c55e",
    description: "Delivering production-grade backend microservices, high-scale scrapers, and database architectures for global clients.",
    achievements: [
      "Architected scalable Node.js and Python backend services integrated with PostgreSQL and Supabase.",
      "Built resilient Puppeteer web scraping pipelines and headless automation clusters with proxy rotation.",
      "Achieved 100% on-time delivery with end-to-end API documentation, testing, and cloud deployments."
    ],
    tech: ["Node.js", "Python", "PostgreSQL", "Supabase", "Docker", "REST APIs", "Puppeteer"]
  },
  {
    role: "Software Engineer",
    company: "DataAutomators",
    period: "Dec 2024 – Jun 2025",
    duration: "7 mos",
    type: "Full-Stack & Automation",
    category: "engineering",
    location: "Dhaka, Bangladesh",
    icon: "fa-solid fa-laptop-code",
    color: "#047857",
    description: "Played full-stack role developing features, fixing issues, and documenting high-concurrency systems for ScrapeAutomate.",
    achievements: [
      "Mostly worked on ScrapeAutomate as a full-stack engineer developing core features and fixing system bottlenecks.",
      "Responsible for developing scalable crawling features, comprehensive technical documentation, and stability patches.",
      "Collaborated with a fast-paced, high-performance team delivering high-throughput data extraction services."
    ],
    tech: ["React", "Node.js", "Puppeteer", "Docker", "REST APIs", "Microservices"]
  },
  {
    role: "Back End Developer",
    company: "PeoplePerHour",
    period: "Mar 2024 – Apr 2025",
    duration: "1 yr 2 mos",
    type: "Contract / Backend",
    category: "engineering",
    location: "Worldwide Remote",
    icon: "fa-solid fa-server",
    color: "#10b981",
    description: "Engineered custom server-side automation workflows, webhooks, and REST APIs for international business clients.",
    achievements: [
      "Developed modular REST APIs and webhook integrations connecting third-party platforms with client databases.",
      "Automated scheduled data synchronization and task execution, minimizing manual operational overhead.",
      "Delivered maintainable backend code with clean architecture, error logging, and post-deployment support."
    ],
    tech: ["Node.js", "Express", "REST APIs", "PostgreSQL", "Webhooks", "Automation"]
  },
  {
    role: "Writer (Technical & Chemistry)",
    company: "Students Bee",
    period: "Jan 2023 – Jul 2023",
    duration: "7 mos",
    type: "Science Communication",
    category: "education",
    location: "Dhaka, Bangladesh",
    icon: "fa-solid fa-pen-nib",
    color: "#34d399",
    description: "Authored in-depth chemistry learning content, conceptual guides, and scientific problem-solving articles.",
    achievements: [
      "Authored accessible educational content covering core chemistry topics in both English and Bangla.",
      "Created step-by-step problem-solving walkthroughs to clarify difficult scientific concepts.",
      "Fostered deep student engagement with clear visual analogies and structured study notes."
    ],
    tech: ["Chemistry Education", "Technical Writing", "Science Communication", "Curriculum"]
  },
  {
    role: "Teacher (Chemistry & Science)",
    company: "Future Point Academy",
    period: "Apr 2022 – Dec 2022",
    duration: "9 mos",
    type: "Education & Mentorship",
    category: "education",
    location: "Dhaka, Bangladesh",
    icon: "fa-solid fa-chalkboard-user",
    color: "#22c55e",
    description: "Instructed higher secondary science students in organic, inorganic, and physical chemistry foundations.",
    achievements: [
      "Delivered structured chemistry lectures covering reaction mechanisms, atomic models, and thermodynamics.",
      "Mentored students in analytical problem-solving and systematic scientific methodologies.",
      "Prepared students for national examinations through interactive quizzes and personalized feedback."
    ],
    tech: ["Chemistry Teaching", "Analytical Thinking", "Mentorship", "Pedagogy"]
  }
];

export const educationData = [
  {
    degree: "Bachelor of Science (BS) in Chemistry",
    institution: "Jagannath University, Dhaka",
    period: "Mar 2022 – Jul 2027",
    status: "In Progress",
    location: "Dhaka, Bangladesh",
    icon: "fa-solid fa-graduation-cap",
    color: "#059669",
    description: "Concentrating on physical chemistry, computational modeling, and environmental risk assessment.",
    highlights: [
      "Academic Researcher developing Monte Carlo simulations and DFT calculations with ORCA/Gaussian",
      "Software Associate at Constant Research and Innovation Lab (CRILab)",
      "Prospective PhD Researcher in computational chemistry and cheminformatics"
    ]
  },
  {
    degree: "Higher Secondary Certificate (HSC) in Science",
    institution: "Birshreshtha Munshi Abdur Rouf Public College (BMRPC)",
    period: "Jul 2018 – Jan 2021",
    status: "Completed",
    location: "Dhaka, Bangladesh",
    icon: "fa-solid fa-school",
    color: "#0d9488",
    description: "Rigorous scientific foundation covering chemistry, physics, mathematics, and biology.",
    highlights: [
      "Extensive laboratory coursework and analytical problem-solving training",
      "Active participant in science seminars and Olympiad competitions"
    ]
  }
];

export const certificationsData = [
  {
    title: "DevOps Hackathon",
    issuer: "Brain Station 23",
    badge: "Hackathon Participant",
    icon: "fa-solid fa-trophy",
    color: "#22c55e",
    description: "Hands-on hackathon focused on containerization, CI/CD automated deployment pipelines, and cloud resilience."
  },
  {
    title: "AI Literacy Workshop",
    issuer: "AI Training & Literacy Initiative",
    badge: "Certified",
    icon: "fa-solid fa-brain",
    color: "#10b981",
    description: "Comprehensive workshop covering modern LLM fundamentals, prompt engineering protocols, and intelligent workflows."
  },
  {
    title: "ACS Member (American Chemical Society)",
    issuer: "American Chemical Society",
    badge: "Student & Associate Member",
    icon: "fa-solid fa-award",
    color: "#34d399",
    description: "Affiliated member engaged with global chemical sciences community, publications, and computational chemistry advancements."
  }
];

export const servicesData = [
  {
    icon: "fa-solid fa-code",
    title: "Full-Stack Web Development",
    shortTitle: "Web experiences",
    summary: "Thoughtful websites and apps, built to feel fast.",
    subtitle: "Fast, responsive & conversion-driven",
    description: "Building modern Single Page Applications and SSR portals with React and Next.js, focused on crisp UX and top Web Vitals.",
    points: ["Modular React & Next.js Architecture", "Sub-Second Page Load Speeds", "Mobile-First Responsive Design"]
  },
  {
    icon: "fa-solid fa-robot",
    title: "Web Scraping & Automation",
    shortTitle: "Smart automation",
    summary: "Less repetitive work. More useful data.",
    subtitle: "High-scale data extraction without blocks",
    description: "Developing robust Puppeteer scrapers and bots that bypass anti-bot challenges and extract structured data reliably.",
    points: ["Puppeteer & Headless Chrome Clusters", "Anti-Bot Bypass & Proxy Pools", "Automated JSON / CSV Export Pipelines"]
  },
  {
    icon: "fa-solid fa-server",
    title: "Backend & RESTful APIs",
    shortTitle: "APIs & infrastructure",
    summary: "Reliable foundations for your next product.",
    subtitle: "Secure, maintainable & documented",
    description: "Architecting microservices and RESTful APIs using Node.js and Express, complete with database modeling and Swagger docs.",
    points: ["RESTful API Architecture & Swagger", "JWT Auth & Role-Based Security", "Containerized Docker Deployments"]
  },
  {
    icon: "fa-solid fa-atom",
    title: "Scientific & Data Modeling",
    shortTitle: "Science & simulation",
    summary: "Turn complex questions into models you can explore.",
    subtitle: "Uncertainty simulation & data pipelines",
    description: "Translating complex mathematical and scientific methodologies into high-performance Python code and simulations.",
    points: ["Monte Carlo Probabilistic Models", "Automated Data Processing Pipelines", "Linux HPC Cluster Automation"]
  }
];

export const eventsData = [
  {
    id: "moodlemoot-2024",
    title: "MoodleMoot Bangladesh 2024",
    subtitle: "AI at Scale & EdTech Transformation Summit",
    type: "Conference",
    category: "conference",
    organizer: "Brain Station 23 & Moodle",
    location: "Dhaka, Bangladesh",
    date: "2024",
    image: "/events/moodlemoot-brainstation23.jpg",
    hasRealPhoto: true,
    badge: "Brain Station 23",
    badgeColor: "#22c55e",
    role: "Invited Attendee & Participant",
    description: "Participated in keynote sessions and high-level tech forums on transforming education and enterprise learning using AI and scalable web infrastructure.",
    keyTakeaways: [
      "Explored scalable LMS architectures and AI-driven personalized learning pipelines",
      "Networked with software engineers, cloud architects, and tech leaders from Brain Station 23",
      "Discussed emerging AI tooling and modern full-stack integrations in workforce learning"
    ],
    tags: ["Brain Station 23", "AI at Scale", "Conference", "Dhaka", "EdTech"]
  },
  {
    id: "devops-hackathon-2024",
    title: "National DevOps Hackathon",
    subtitle: "Automated CI/CD & Cloud Infrastructure Challenge",
    type: "Hackathon",
    category: "hackathon",
    organizer: "Brain Station 23",
    location: "Dhaka, Bangladesh",
    date: "2024",
    image: null,
    hasRealPhoto: false,
    badge: "Hackathon Competitor",
    badgeColor: "#059669",
    role: "DevOps & Backend Competitor",
    description: "Competed in high-intensity engineering challenge architecting automated build pipelines, containerized microservices, and reliable cloud deployments.",
    keyTakeaways: [
      "Engineered multi-stage Docker build files and optimized container layer caching",
      "Built automated test runners and automated deployment scripts under tight sprint deadlines",
      "Demonstrated system resilience, rollback routines, and zero-downtime release pipelines"
    ],
    tags: ["DevOps", "Docker", "CI/CD", "Brain Station 23", "Hackathon"]
  },
  {
    id: "ai-literacy-workshop-2024",
    title: "AI Literacy & Prompt Engineering Workshop",
    subtitle: "LLM Agentic Architectures & Production Integration",
    type: "Workshop",
    category: "workshop",
    organizer: "AI Training & Literacy Initiative",
    location: "Dhaka, Bangladesh",
    date: "2024",
    image: null,
    hasRealPhoto: false,
    badge: "Hands-on Workshop",
    badgeColor: "#10b981",
    role: "Certified Participant",
    description: "Hands-on engineering workshop exploring real-world LLM APIs, autonomous prompt workflows, agent orchestration, and code intelligence tooling.",
    keyTakeaways: [
      "Implemented structured JSON prompt engineering and tool-calling paradigms",
      "Analyzed latency, safety guardrails, and deterministic verification protocols",
      "Applied prompt-driven automation to developer workflow acceleration"
    ],
    tags: ["AI / LLMs", "Prompt Engineering", "Agents", "Workshop"]
  },
  {
    id: "acs-academic-symposium",
    title: "American Chemical Society Academic Sessions",
    subtitle: "Computational Chemistry & Molecular Modeling",
    type: "Academic Summit",
    category: "conference",
    organizer: "American Chemical Society (ACS)",
    location: "Academic / Online",
    date: "2024 – 2025",
    image: null,
    hasRealPhoto: false,
    badge: "ACS Member",
    badgeColor: "#34d399",
    role: "ACS Member & Researcher",
    description: "Engaging with international chemical sciences symposia, computational chemistry advancements, and Monte Carlo stochastic modeling in health risk analysis.",
    keyTakeaways: [
      "Stayed updated on quantum mechanical DFT modeling techniques with ORCA and Gaussian",
      "Networked with researchers focusing on stochastic uncertainty and toxicology modeling",
      "Participated in scientific communication discussions bridging chemistry with software"
    ],
    tags: ["ACS", "Quantum Chemistry", "Monte Carlo", "Computational"]
  }
];

