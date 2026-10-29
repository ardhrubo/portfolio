import { ArrowUpRight, Layers } from 'lucide-react';
import { skillsData, projectsData } from '../data/portfolioData';
import '../styles/stack.css';

const groups = [
  { title: 'Interfaces & experiences', label: 'Frontend', tone: 'blue', description: 'Responsive interfaces, accessible interactions, and thoughtful state management.', tools: [['React', 'react'], ['Next.js', 'nextjs'], ['TypeScript', 'typescript'], ['JavaScript', 'javascript'], ['HTML5', 'html5'], ['CSS3', 'css3'], ['Tailwind CSS', 'tailwindcss'], ['Redux', 'redux'], ['Vite', 'vitejs']], project: 'brownsinterior' },
  { title: 'APIs & application logic', label: 'Backend', tone: 'mint', description: 'Services, authentication, and documented APIs that connect the product.', tools: [['Node.js', 'nodejs'], ['Express', 'express'], ['Python', 'python'], ['Swagger', 'swagger']], project: 'scrapeautomate' },
  { title: 'Data & persistence', label: 'Databases', tone: 'peach', description: 'Relational data, flexible documents, caching, and reliable schema design.', tools: [['PostgreSQL', 'postgresql'], ['Supabase', 'supabase'], ['MongoDB', 'mongodb'], ['Redis', 'redis'], ['Postman', 'postman']] },
  { title: 'Browsers that do the work', label: 'Automation', tone: 'violet', description: 'Browser testing, data extraction, extensions, and repeatable workflows.', tools: [['Puppeteer', 'puppeteer'], ['Playwright', 'playwright'], ['Chrome', 'chrome']] },
  { title: 'Models & visual thinking', label: 'Scientific computing', tone: 'blue', description: 'Numerical analysis and visualization, alongside SciPy, ORCA, Gaussian, and Monte Carlo methods.', tools: [['Python', 'python'], ['NumPy', 'numpy'], ['Three.js', 'threejs']] },
  { title: 'From local to live', label: 'Delivery & systems', tone: 'mint', description: 'Containers, Linux environments, version control, and automated delivery.', tools: [['Docker', 'docker'], ['Ubuntu', 'ubuntu'], ['Git', 'git'], ['GitHub Actions', 'githubactions'], ['Nginx', 'nginx']] },
];

export default function Skills() {
  return <section id="skills" className="section stack-section">
    <div className="container">
      <div className="section-header stack-heading">
        <div className="section-tag"><Layers size={15} aria-hidden="true" /><span>03 / Technical stack</span></div>
        <h2 className="section-title">Good tools.<br /><span className="gradient-text">Thoughtful execution.</span></h2>
        <p className="section-subtitle">The technologies I use to bring interfaces, systems, and scientific ideas to life.</p>
      </div>
      <div className="stack-gallery">
        <div className="stack-light stack-light--one" aria-hidden="true" /><div className="stack-light stack-light--two" aria-hidden="true" />
        {groups.map((group, index) => {
          const project = projectsData.find(item => item.id === group.project);
          return <article className={'stack-glass stack-glass--' + group.tone} key={group.label}>
            <header className="stack-card-heading"><span className="stack-category">{group.label}</span><span className="stack-index" aria-hidden="true">0{index + 1}</span></header>
            <h3>{group.title}</h3><p className="stack-description">{group.description}</p>
            <ul className="stack-tools" aria-label={group.label + ' technologies'}>
              {group.tools.map(([name, asset]) => <li className="stack-tool" key={asset}>
                <span className="stack-logo"><img src={'/tech/' + asset + '.svg'} alt="" width="34" height="34" loading="lazy" decoding="async" /></span><span>{name}</span>
              </li>)}
            </ul>
            <details className="stack-details"><summary>More about my {group.label.toLowerCase()} skills</summary><ul>{skillsData[index].skills.map(skill => <li key={skill.name}>{skill.name}</li>)}</ul></details>
            {project && <a className="stack-project" href={project.url} target="_blank" rel="noreferrer">Explore {project.title}<ArrowUpRight size={15} aria-hidden="true" /></a>}
          </article>;
        })}
      </div>
    </div>
  </section>;
}
