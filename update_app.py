import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# 1. Remove 'experience' from fileContents
content = re.sub(r"  'experience': \{[\s\S]*?  \},(\n  'package-json': \{)", r"\1", content)

# 2. Add SourceControlPanel component before fileContents
source_control_comp = """const SourceControlPanel = () => (
  <div className="source-control-panel">
    <div className="sidebar-header" style={{borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '10px'}}>
        <h2>SOURCE CONTROL</h2>
        <i className="fa-solid fa-check"></i>
    </div>
    <div style={{padding: '0 15px', overflowY: 'auto', maxHeight: 'calc(100vh - 120px)'}}>
      <h3 style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '15px', marginTop: '10px'}}>CAREER HISTORY</h3>
      <div className="git-timeline">
        <div className="git-commit">
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
        <div className="git-commit">
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
        <div className="git-commit">
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

const fileContents = {"""

content = content.replace("const fileContents = {", source_control_comp)

# 3. Add activeActivity state
content = content.replace("const [mobileMenuOpen, setMobileMenuOpen] = useState(false);", "const [mobileMenuOpen, setMobileMenuOpen] = useState(false);\n  const [activeActivity, setActiveActivity] = useState('explorer');")

# 4. Fix openFile('experience') in README button
readme_btn = """<button 
              onClick={() => openFile('experience')}"""
new_readme_btn = """<button 
              onClick={() => { setActiveActivity('source-control'); setMobileMenuOpen(true); }}"""
content = content.replace(readme_btn, new_readme_btn)

# 5. Fix openFile('experience') in Guide Modal
modal_btn = """onClick={() => { openFile('experience'); setShowGuide(false); }}"""
new_modal_btn = """onClick={() => { setActiveActivity('source-control'); setMobileMenuOpen(true); setShowGuide(false); }}"""
content = content.replace(modal_btn, new_modal_btn)

# 6. Update Activity Bar
old_activity_bar = """<div className="activity-icon active" title="Explorer" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
              <i className="fa-regular fa-copy"></i>
          </div>
          <div className="activity-icon" title="Source Control">
              <i className="fa-solid fa-code-branch"></i>
          </div>"""
new_activity_bar = """<div className={`activity-icon ${activeActivity === 'explorer' ? 'active' : ''}`} title="Explorer" onClick={() => { setActiveActivity('explorer'); setMobileMenuOpen(true); }}>
              <i className="fa-regular fa-copy"></i>
          </div>
          <div className={`activity-icon ${activeActivity === 'source-control' ? 'active' : ''}`} title="Source Control" onClick={() => { setActiveActivity('source-control'); setMobileMenuOpen(true); }}>
              <i className="fa-solid fa-code-branch"></i>
          </div>"""
content = content.replace(old_activity_bar, new_activity_bar)

# 7. Update Sidebar to conditionally render SourceControlPanel and remove controllers folder
sidebar_header = """<div className="sidebar-header">
              <h2>EXPLORER</h2>
              <i className="fa-solid fa-ellipsis"></i>
          </div>"""

# Find the block for 'controllers' and remove it entirely from file-tree
controllers_block = """                          <div className={`folder-item ${!folderOpen.controllers ? 'collapsed' : ''}`} onClick={() => toggleFolder('controllers')}>
                              <i className="fa-solid fa-chevron-down toggle-icon"></i>
                              <i className="fa-solid fa-folder" style={{color: '#dcb67a'}}></i>
                              <span>controllers</span>
                          </div>
                          {folderOpen.controllers && (
                            <div className="folder-contents">
                                <div className={`file-item file-md ${activeTab === 'experience' ? 'active' : ''}`} onClick={() => openFile('experience')} style={{paddingLeft: '55px'}}>
                                  <i className="fa-brands fa-js" style={{color: '#f1e05a'}}></i>
                                  <span>experience.js</span>
                                </div>
                            </div>
                          )}

"""

content = content.replace(controllers_block, "")

# Wrap sidebar content in activeActivity check
sidebar_start = """<div className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          <div className="sidebar-header">"""
          
new_sidebar_start = """<div className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>
          {activeActivity === 'explorer' ? (
            <>
          <div className="sidebar-header">"""
content = content.replace(sidebar_start, new_sidebar_start)

# Close the activeActivity check at the end of the sidebar
sidebar_end = """                </div>
              )}
          </div>
      </div>"""
new_sidebar_end = """                </div>
              )}
          </div>
            </>
          ) : (
            <SourceControlPanel />
          )}
      </div>"""
content = content.replace(sidebar_end, new_sidebar_end)

with open('src/App.jsx', 'w') as f:
    f.write(content)

print("Update complete")
