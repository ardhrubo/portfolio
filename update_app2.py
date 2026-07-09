import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# 1. Remove mohan web
mohan_regex = r"\s*\{ name: \"mohan\",[^\}]+\},"
content = re.sub(mohan_regex, "", content)

# 2. Settings Panel Component
settings_comp = """
const SettingsPanel = ({ currentTheme, setTheme }) => (
  <div className="source-control-panel">
    <div className="sidebar-header" style={{borderBottom: '1px solid var(--border)', paddingBottom: '10px', marginBottom: '10px'}}>
        <h2>SETTINGS</h2>
        <i className="fa-solid fa-ellipsis"></i>
    </div>
    <div className="settings-panel">
      <h3 style={{fontSize: '11px', color: 'var(--text-muted)', marginBottom: '15px', marginTop: '10px'}}>COLOR THEME</h3>
      
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
    </div>
  </div>
);

const SourceControlPanel = () => ("""
content = content.replace("const SourceControlPanel = () => (", settings_comp)


# 3. SourceControlPanel updates (branching lines)
source_control_regex = r"(<div className=\"git-commit\">)([\s\S]*?<div className=\"git-message\">feat\(career\): join CRILab)"
replacement_c = r'<div className="git-commit branch">\n          <div className="git-branch-curve"></div>\n          <div className="git-merge-curve"></div>\2'
content = re.sub(source_control_regex, replacement_c, content)

source_control_regex2 = r"(<div className=\"git-commit\">)([\s\S]*?<div className=\"git-message\">init\(career\): start Freelance)"
replacement_f = r'<div className="git-commit branch">\n          <div className="git-branch-curve"></div>\2'
content = re.sub(source_control_regex2, replacement_f, content)


# 4. App state for Theme
app_state = """const [activeActivity, setActiveActivity] = useState('explorer');
  const [theme, setTheme] = useState('cafe');

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);"""
content = content.replace("const [activeActivity, setActiveActivity] = useState('explorer');", app_state)


# 5. Activity Bar Settings Icon
activity_bar_old = """<div className="activity-spacer"></div>
          <div className="activity-icon" title="Settings">
              <i className="fa-solid fa-gear"></i>
          </div>"""
activity_bar_new = """<div className="activity-spacer"></div>
          <div className={`activity-icon ${activeActivity === 'settings' ? 'active' : ''}`} title="Settings" onClick={() => { setActiveActivity('settings'); setMobileMenuOpen(true); }}>
              <i className="fa-solid fa-gear"></i>
          </div>"""
content = content.replace(activity_bar_old, activity_bar_new)


# 6. Sidebar rendering
sidebar_old = """          ) : (
            <SourceControlPanel />
          )}
      </div>"""
sidebar_new = """          ) : activeActivity === 'source-control' ? (
            <SourceControlPanel />
          ) : (
            <SettingsPanel currentTheme={theme} setTheme={setTheme} />
          )}
      </div>"""
content = content.replace(sidebar_old, sidebar_new)

with open('src/App.jsx', 'w') as f:
    f.write(content)

print("App updated")
