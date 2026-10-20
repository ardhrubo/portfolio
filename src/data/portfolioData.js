export const personalInfo = {
  name: "Dhrubo",
  fullName: "A. R. Dhrubo",
  role: "Full-Stack Software Engineer & Web Automation Specialist",
  tagline: "Engineering scalable web platforms, distributed automation systems, and high-performance user experiences.",
  bio: "I am a full-stack engineer and computational researcher with 50+ shipped projects. From engineering high-throughput Puppeteer automation engines to developing enterprise React web applications and running Monte Carlo scientific simulations, I bridge resilient backend engineering with modern, responsive frontends.",
  location: "Dhaka, Bangladesh",
  timezone: "GMT+6 (Worldwide Remote)",
  status: "Available for Full-time Roles & Selected Freelance Projects",
  statusColor: "#059669", // Emerald green
  email: "ardhrubo@gmail.com",
  socials: {
    github: "https://github.com/ardhrubo",
    linkedin: "https://www.linkedin.com/in/ardhrubo/",
    peerlist: "https://peerlist.io/ardhrubo"
  },
  stats: [
    { label: "Shipped Projects", value: "50+", icon: "fa-solid fa-rocket", desc: "Across web, bots & APIs" },
    { label: "Years Experience", value: "3+", icon: "fa-solid fa-code-commit", desc: "Full-stack & research" },
    { label: "Client Satisfaction", value: "100%", icon: "fa-solid fa-star", desc: "Global clientele" },
    { label: "Automation Tasks", value: "1M+", icon: "fa-solid fa-bolt", desc: "Records scraped & processed" }
  ]
};

// Engineering Strategy & Methodology Steps
export const engineeringStrategy = [
  {
    step: "01",
    phase: "Architecture & Edge-Case Modeling",
    badge: "Foundation",
    title: "Designing for Scale Before Writing Code",
    description: "Every robust system starts with meticulous data modeling, state boundaries, and proactive edge-case defense. Whether an API schema or an anti-detection scraper, planning guarantees resilience.",
    deliverables: [
      "Strict data schemas & TypeScript / REST definitions",
      "Anti-bot threat modeling & proxy rotation strategy",
      "Component hierarchy & render-cycle optimization plans",
      "Database indexing and query-latency benchmarks"
    ],
    metric: "99.9% Architecture Uptime"
  },
  {
    step: "02",
    phase: "High-Performance Full-Stack Build",
    badge: "Execution",
    title: "Clean, Accessible & Ultra-Fast Web Delivery",
    description: "Developing modern Single Page Applications (SPAs) and Server-Rendered portals using React and Next.js. Emphasizing sub-second load times, mobile responsiveness, and clean component isolation.",
    deliverables: [
      "Modular React/Next.js architecture with zero bloat",
      "Glassmorphic, accessible UI engineered with CSS custom properties",
      "Core Web Vitals tuning for green 95+ PageSpeed scores",
      "Automated unit & integration test coverage"
    ],
    metric: "< 1.2s First Contentful Paint"
  },
  {
    step: "03",
    phase: "Resilient Scraping & Automation",
    badge: "Automation",
    title: "High-Concurrency Extraction Without Getting Blocked",
    description: "Pioneering distributed Puppeteer crawlers capable of parsing dynamic JavaScript single-page apps, overcoming sophisticated Cloudflare/Akamai hurdles, and delivering structured JSON/CSV.",
    deliverables: [
      "Browser clustering & memory-leak prevention",
      "Dynamic header randomization & TLS fingerprint emulation",
      "Asynchronous worker pools with auto-retry backoff",
      "Sanitized data cleaning and export pipelines"
    ],
    metric: "1M+ Records Successfully Extracted"
  },
  {
    step: "04",
    phase: "Scientific Verification & Quantitative QA",
    badge: "Verification",
    title: "Rigorous Probabilistic & Empirical Testing",
    description: "Applying academic research rigor from Monte Carlo modeling and DFT computing to software validation. We don't guess — we quantify performance boundaries and stress-test every branch.",
    deliverables: [
      "Monte Carlo uncertainty simulations for risk modeling",
      "Load testing under concurrent traffic spikes",
      "End-to-end user journey validation with Cypress / Playwright",
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

// All 20 Complete Projects
export const projectsData = [
  {
    id: "horizontaxsolution",
    title: "Horizon Tax Solution",
    subtitle: "Enterprise Client Application",
    url: "https://www.horizontaxsolutions.com.au/",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    featured: true,
    image: "https://api.microlink.io/?url=https%3A%2F%2Fwww.horizontaxsolutions.com.au%2F&screenshot=true&meta=false&embed=screenshot.url",
    badge: "Client Production",
    desc: "A professional tax, accounting, and consulting web platform engineered for Australian clientele, featuring seamless lead generation, secure client inquiries, and optimized conversions.",
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
    image: "https://api.microlink.io/?url=https%3A%2F%2Fscrapeautomate.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    badge: "SaaS Platform",
    desc: "A robust web automation and data extraction platform engineered with Puppeteer for executing complex, large-scale workflows, handling dynamic SPAs and proxy rotation.",
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
    image: "https://api.microlink.io/?url=https%3A%2F%2Fadmissionbondhu.com%2F&screenshot=true&meta=false&embed=screenshot.url",
    badge: "Live Education Platform",
    desc: "A comprehensive university admission portal designed to assist thousands of students in navigating requirements, deadlines, and eligibility criteria seamlessly.",
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
    image: "https://api.microlink.io/?url=https%3A%2F%2Fchromewebstore.google.com%2Fdetail%2Fcopippkpbpdkhjpcbaibpjdmaanccocc%3Futm_source%3Ditem-share-cb&screenshot=true&meta=false&embed=screenshot.url",
    badge: "Chrome Web Store",
    desc: "A privacy-centric Chrome Extension published on the official Google Chrome Web Store that automatically detects and obfuscates sensitive email addresses on web pages during screen-sharing.",
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
    image: "https://api.microlink.io/?url=https%3A%2F%2Fpassglobaledu.com&screenshot=true&meta=false&embed=screenshot.url",
    badge: "Client Production",
    desc: "An educational consultancy portal built with Next.js featuring comprehensive overseas university catalogs, country-specific visa information, and automated counselor booking.",
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
    image: "https://api.microlink.io/?url=https%3A%2F%2Fwatchfirebd.com&screenshot=true&meta=false&embed=screenshot.url",
    badge: "Commercial Client",
    desc: "A modern, high-speed corporate web presence created for WatchFire BD with interactive product showcases, enterprise inquiries, and brand assets.",
    longDesc: "Designed with responsive glassmorphism, rapid load times, and structured content hierarchy to maximize engagement with corporate clients.",
    tech: ["JavaScript", "HTML5", "Modern CSS", "Performance Tuning"],
    highlights: ["Modern corporate identity", "Responsive across all viewports", "Fast asset delivery"],
    hasLiveDemo: true,
    githubUrl: null
  },
  {
    id: "password-generator",
    title: "Cryptographic Password Generator",
    subtitle: "Security & Crypto Utility",
    url: "https://passwordgeneratordhrubo.vercel.app/",
    category: "tools",
    categoryLabel: "Tools & Extensions",
    featured: false,
    image: "https://api.microlink.io/?url=https%3A%2F%2Fpasswordgeneratordhrubo.vercel.app%2F&screenshot=true&meta=false&embed=screenshot.url",
    badge: "Web App",
    desc: "A fast, customizable, and secure web application for generating cryptographically strong passwords locally in the browser with entropy calculation.",
    longDesc: "Features customizable character sets, entropy strength meters, pronounceable passwords, and client-side zero-storage security guarantees.",
    tech: ["React", "Web Crypto API", "Vite", "Vercel"],
    highlights: ["Client-side Web Crypto API", "Entropy scoring indicator", "One-click safe clipboard copy"],
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
    image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Fhasib&screenshot=true&meta=false&embed=screenshot.url",
    badge: "Client Delivery",
    desc: "A personal portfolio website designed and developed for a client named Hasib, featuring customized layout, interactive project showcases, and responsive design.",
    longDesc: "Tailored to client specifications, this portfolio implements clean aesthetics, responsive typography, and fast performance across devices.",
    tech: ["JavaScript", "HTML5", "CSS3", "Responsive UX"],
    highlights: ["Custom client layout", "Clean component structure", "Optimized mobile viewports"],
    hasLiveDemo: false,
    githubUrl: "https://github.com/ardhrubo/hasib"
  },
  {
    id: "orbital",
    title: "Orbital Project Portal",
    subtitle: "Modern Web Presence",
    url: "https://github.com/ardhrubo/orbital",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    featured: false,
    image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Forbital&screenshot=true&meta=false&embed=screenshot.url",
    badge: "Web Application",
    desc: "A sleek and responsive website built for the Orbital project, featuring dynamic layout sections, smooth animations, and interactive navigation.",
    longDesc: "Crafted with modular design tokens, lightweight CSS animations, and cross-browser consistency.",
    tech: ["React", "JavaScript", "CSS3", "Vite"],
    highlights: ["Interactive navigation", "Lightweight bundle size", "Cross-browser consistency"],
    hasLiveDemo: false,
    githubUrl: "https://github.com/ardhrubo/orbital"
  },
  {
    id: "medusajs",
    title: "MedusaJS Headless E-Commerce",
    subtitle: "Modern Digital Commerce",
    url: "https://github.com/ardhrubo/medusajs",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    featured: false,
    image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Fmedusajs&screenshot=true&meta=false&embed=screenshot.url",
    badge: "Headless E-Commerce",
    desc: "An e-commerce storefront and backend built using the powerful MedusaJS headless commerce engine with custom checkout and product management.",
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
    image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Ffullstack-docker&screenshot=true&meta=false&embed=screenshot.url",
    badge: "Developer Tool",
    desc: "A production-grade, multi-container Docker boilerplate environment for seamless full-stack web application development and rapid deployment.",
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
    image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Fbulk-duckduckgo-search-tool&screenshot=true&meta=false&embed=screenshot.url",
    badge: "Automation CLI",
    desc: "A JavaScript utility for performing high-volume concurrent queries on DuckDuckGo and extracting clean, structured search SERP results without API limits.",
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
    image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Findianvisa&screenshot=true&meta=false&embed=screenshot.url",
    badge: "Automation Bot",
    desc: "An automated bot engineered to streamline checking and alert notifications for Indian visa appointment slots with instant trigger mechanisms.",
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
    image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Fbot&screenshot=true&meta=false&embed=screenshot.url",
    badge: "Automation Bot",
    desc: "A Python-based automation bot tailored for repetitive data extraction, scheduled operations, and webhook broadcasting.",
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
    image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Ffree-claude-code&screenshot=true&meta=false&embed=screenshot.url",
    badge: "AI Research",
    desc: "An experimental developer environment exploring autonomous AI coding integrations, context synthesis, and agentic code execution workflows.",
    longDesc: "Researches terminal command bridging, file system exploration by LLMs, and prompt engineering protocols for automated debugging.",
    tech: ["AI / LLMs", "Node.js", "CLI Tools", "Prompt Engineering"],
    highlights: ["Autonomous code agent tests", "Terminal automation harness", "Open architecture"],
    hasLiveDemo: false,
    githubUrl: "https://github.com/ardhrubo/free-claude-code"
  },
  {
    id: "form-timer",
    title: "Web Form Timing Monitor",
    subtitle: "Frontend Analytics Tool",
    url: "https://github.com/ardhrubo/form-timer",
    category: "tools",
    categoryLabel: "Tools & DevOps",
    featured: false,
    image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Fform-timer&screenshot=true&meta=false&embed=screenshot.url",
    badge: "JS Library",
    desc: "A lightweight JavaScript utility to monitor user dwell times, enforce completion timeframes on web forms, and detect bot anomalies.",
    longDesc: "Embeddable script with zero external dependencies to calculate field focus durations and prevent spam submissions.",
    tech: ["JavaScript", "Browser API", "Analytics", "Security"],
    highlights: ["Sub-2kb footprint", "No external dependencies", "Granular input timing stats"],
    hasLiveDemo: false,
    githubUrl: "https://github.com/ardhrubo/form-timer"
  },
  {
    id: "researchtool",
    title: "Scientific Research Data Tool",
    subtitle: "Computational Data Pipeline",
    url: "https://github.com/ardhrubo/researchtool",
    category: "tools",
    categoryLabel: "Tools & DevOps",
    featured: false,
    image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Fresearchtool&screenshot=true&meta=false&embed=screenshot.url",
    badge: "Scientific Utility",
    desc: "A specialized tool designed to assist with data aggregation, scientific statistical calculations, and research processes.",
    longDesc: "Automates repetitive statistical transformations and parses output files from scientific simulation engines into clean formats.",
    tech: ["Python", "NumPy", "Scientific Data", "Automation"],
    highlights: ["Scientific format parsers", "Monte Carlo integration", "Automated graph generators"],
    hasLiveDemo: false,
    githubUrl: "https://github.com/ardhrubo/researchtool"
  },
  {
    id: "usage-monitor",
    title: "System Usage Monitor",
    subtitle: "Resource & Metric Visualization",
    url: "https://github.com/ardhrubo/usage-monitor",
    category: "tools",
    categoryLabel: "Tools & DevOps",
    featured: false,
    image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Fusage-monitor&screenshot=true&meta=false&embed=screenshot.url",
    badge: "System Tool",
    desc: "A lightweight tool engineered to track, visualize, and report operating system and application resource consumption metrics.",
    longDesc: "Monitors CPU, memory, and process threads with real-time graph rendering and automated resource leak detection.",
    tech: ["JavaScript", "Node.js", "System Metrics", "CLI"],
    highlights: ["Real-time memory tracking", "Low overhead telemetry", "Threshold alert triggers"],
    hasLiveDemo: false,
    githubUrl: "https://github.com/ardhrubo/usage-monitor"
  },
  {
    id: "vibetest-docs",
    title: "VibeTest Documentation Hub",
    subtitle: "Developer Documentation Site",
    url: "https://github.com/ardhrubo/vibetest-docs",
    category: "fullstack",
    categoryLabel: "Full-Stack Web",
    featured: false,
    image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Fvibetest-docs&screenshot=true&meta=false&embed=screenshot.url",
    badge: "Docs Hub",
    desc: "Comprehensive technical documentation site built for the VibeTest platform featuring interactive code snippets and instant search.",
    longDesc: "Modern markdown-driven static documentation setup providing rapid load speeds, dark mode, and version switching.",
    tech: ["React", "Markdown", "Documentation", "Vite"],
    highlights: ["Instant client search", "Code syntax highlighting", "Mobile responsive navigation"],
    hasLiveDemo: false,
    githubUrl: "https://github.com/ardhrubo/vibetest-docs"
  },
  {
    id: "tiktactoe",
    title: "Interactive Tic-Tac-Toe Game",
    subtitle: "Web Logic & Minimax Game",
    url: "https://github.com/ardhrubo/tiktactoe",
    category: "tools",
    categoryLabel: "Tools & DevOps",
    featured: false,
    image: "https://api.microlink.io/?url=https%3A%2F%2Fgithub.com%2Fardhrubo%2Ftiktactoe&screenshot=true&meta=false&embed=screenshot.url",
    badge: "Interactive Game",
    desc: "A classic, interactive Tic-Tac-Toe game built for the web with responsive board UI, score state management, and smooth interaction.",
    longDesc: "Features smart state tracking, move history, game reset logic, and clean CSS grid animations.",
    tech: ["JavaScript", "HTML5", "CSS3", "Game Logic"],
    highlights: ["Zero dependency logic", "Instant responsive grid", "Score persistency"],
    hasLiveDemo: false,
    githubUrl: "https://github.com/ardhrubo/tiktactoe"
  }
];

export const skillsData = [
  {
    category: "Frontend Development",
    icon: "fa-brands fa-react",
    color: "#059669",
    description: "Building responsive, accessible, and ultra-fast web user interfaces.",
    skills: [
      { name: "React.js", level: "Advanced", icon: "fa-brands fa-react" },
      { name: "Next.js", level: "Proficient", icon: "fa-solid fa-n" },
      { name: "JavaScript (ES6+)", level: "Advanced", icon: "fa-brands fa-js" },
      { name: "HTML5 & CSS3", level: "Expert", icon: "fa-brands fa-html5" },
      { name: "Responsive UI/UX", level: "Advanced", icon: "fa-solid fa-mobile-screen-button" },
      { name: "Vite & Tooling", level: "Advanced", icon: "fa-solid fa-bolt" }
    ]
  },
  {
    category: "Backend & Systems",
    icon: "fa-solid fa-server",
    color: "#0d9488",
    description: "Architecting reliable REST APIs, database schemas, and microservices.",
    skills: [
      { name: "Node.js", level: "Advanced", icon: "fa-brands fa-node" },
      { name: "Express.js", level: "Advanced", icon: "fa-solid fa-network-wired" },
      { name: "Python", level: "Advanced", icon: "fa-brands fa-python" },
      { name: "RESTful APIs & Swagger", level: "Advanced", icon: "fa-solid fa-route" },
      { name: "Docker & Containers", level: "Proficient", icon: "fa-brands fa-docker" },
      { name: "SQL & Databases", level: "Proficient", icon: "fa-solid fa-database" }
    ]
  },
  {
    category: "Web Automation & Scraping",
    icon: "fa-solid fa-robot",
    color: "#16a34a",
    description: "Automating repetitive workflows, web crawling, and data extraction pipelines.",
    skills: [
      { name: "Puppeteer", level: "Expert", icon: "fa-solid fa-spider" },
      { name: "Web Scraping", level: "Expert", icon: "fa-solid fa-file-export" },
      { name: "Headless Browsers", level: "Expert", icon: "fa-solid fa-window-restore" },
      { name: "Anti-Bot Bypass", level: "Proficient", icon: "fa-solid fa-shield-halved" },
      { name: "Chrome Extensions", level: "Proficient", icon: "fa-brands fa-chrome" },
      { name: "Workflow Automation", level: "Advanced", icon: "fa-solid fa-gears" }
    ]
  },
  {
    category: "Scientific & Computational Research",
    icon: "fa-solid fa-atom",
    color: "#047857",
    description: "Conducting data modeling, uncertainty analysis, and quantum chemistry computations.",
    skills: [
      { name: "Monte Carlo Simulations", level: "Advanced", icon: "fa-solid fa-chart-line" },
      { name: "Health Risk Assessment (HRA)", level: "Advanced", icon: "fa-solid fa-heart-pulse" },
      { name: "DFT Modeling (ORCA/Gaussian)", level: "Proficient", icon: "fa-solid fa-dna" },
      { name: "Linux (Ubuntu Server)", level: "Advanced", icon: "fa-brands fa-linux" },
      { name: "Data Aggregation", level: "Advanced", icon: "fa-solid fa-chart-pie" }
    ]
  }
];

export const experienceData = [
  {
    role: "Academic Researcher",
    company: "Jagannath University",
    period: "Mar 2026 – Present",
    type: "Research & Computation",
    location: "Dhaka, Bangladesh",
    icon: "fa-solid fa-graduation-cap",
    color: "#059669",
    description: "Driving computational research in probabilistic environmental modeling and quantum molecular calculations.",
    achievements: [
      "Developing Python-based Monte Carlo simulations for Probabilistic Health Risk Assessment (HRA) to quantify uncertainties in environmental exposure.",
      "Conducting Density Functional Theory (DFT) molecular modeling utilizing ORCA and Gaussian computational packages on Linux (Ubuntu) high-performance clusters.",
      "Quantifying trace contaminant distributions to advance beyond deterministic single-point risk estimates for international publication."
    ],
    tech: ["Python", "Monte Carlo", "ORCA", "Gaussian", "Linux (Ubuntu)", "Data Analysis"]
  },
  {
    role: "Software Engineer",
    company: "DataAutomators",
    period: "Dec 2024 – Present",
    type: "Full-Stack & Automation",
    location: "Remote",
    icon: "fa-solid fa-laptop-code",
    color: "#10b981",
    description: "Core engineer powering the ScrapeAutomate platform and distributed web automation workflows.",
    achievements: [
      "Architected and deployed enterprise-grade web scraping pipelines using Puppeteer capable of extracting millions of records with high concurrency.",
      "Engineered anti-detection algorithms, proxy rotation mechanisms, and automated retry policies ensuring 99.9% scrape success rates.",
      "Built resilient backend microservices, real-time job queues, and developer-friendly documentation for client integration."
    ],
    tech: ["Node.js", "Puppeteer", "React", "REST APIs", "Docker", "Microservices"]
  },
  {
    role: "Researcher",
    company: "CRILab",
    period: "Mar 2024 – Present",
    type: "Scientific Tech",
    location: "Dhaka, Bangladesh",
    icon: "fa-solid fa-flask-vial",
    color: "#0d9488",
    description: "Leading technical research initiatives bridging chemistry, computation, and software engineering.",
    achievements: [
      "Spearheading development of analytical tools and computational data pipelines for scientific researchers.",
      "Automating data aggregation and preprocessing from diverse experimental repositories.",
      "Collaborating across multidisciplinary teams to translate scientific requirements into intuitive software utilities."
    ],
    tech: ["Python", "Data Aggregation", "Computational Chemistry", "Git", "Scientific Computing"]
  },
  {
    role: "Freelance Full-Stack & Back-End Developer",
    company: "Self-Employed",
    period: "Mar 2024 – Present",
    type: "Contract / Global",
    location: "Worldwide Remote",
    icon: "fa-solid fa-briefcase",
    color: "#16a34a",
    description: "Delivering end-to-end web applications, custom APIs, and tailored automation tools for international clients.",
    achievements: [
      "Architected back-end systems, responsive web applications, and scalable REST APIs (documented with Swagger) for diverse global clients in Australia, US, and Bangladesh.",
      "Successfully delivered 50+ diverse digital products spanning tax consulting portals, higher education directories, e-commerce stores, and Chrome extensions.",
      "Maintained 100% on-time delivery with ongoing client support, SEO optimization, and infrastructure tuning."
    ],
    tech: ["React", "Next.js", "Node.js", "Express", "Docker", "Tailored CSS", "Swagger"]
  }
];

export const servicesData = [
  {
    icon: "fa-solid fa-code",
    title: "Custom Web Application Development",
    subtitle: "Fast, responsive & conversion-driven",
    description: "Developing scalable frontend and full-stack applications using React, Next.js, and modern CSS. Focused on crisp UI, accessibility, and stellar performance.",
    points: ["Single Page Applications (React & Vite)", "Full-Stack Server Rendered Web (Next.js)", "Mobile-first responsive UX & Clean Design", "SEO optimization & Core Web Vitals"]
  },
  {
    icon: "fa-solid fa-robot",
    title: "Web Scraping & Automation Engines",
    subtitle: "Extract data at scale without getting blocked",
    description: "Engineering resilient crawlers and headless browser automations with Puppeteer and Python. Handling dynamic SPAs, captchas, and proxy rotation.",
    points: ["High-concurrency Puppeteer architectures", "Anti-detection & proxy pool management", "Automated data ETL (JSON, CSV, SQL)", "Scheduled bot monitors & alert systems"]
  },
  {
    icon: "fa-solid fa-server",
    title: "Backend & REST API Architecture",
    subtitle: "Secure, maintainable & documented",
    description: "Architecting backend microservices and RESTful endpoints using Node.js and Express. Complete with database schemas, authentication, and Swagger documentation.",
    points: ["RESTful API design & Swagger docs", "Authentication, JWT & role authorization", "Containerized microservices with Docker", "Third-party API & payment integrations"]
  },
  {
    icon: "fa-solid fa-atom",
    title: "Scientific Computing & Simulation",
    subtitle: "Uncertainty modeling & molecular research",
    description: "Translating computational scientific questions into reliable software code. Experience in Monte Carlo probabilistic modeling and quantum DFT simulations.",
    points: ["Python Monte Carlo probabilistic simulations", "Health Risk Assessment (HRA) data pipelines", "DFT calculation workflows (ORCA / Gaussian)", "Ubuntu Linux HPC cluster execution"]
  }
];
