import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# 1. Change initial state to prioritize projects on mobile
state_old = """function App() {
  const [activeTab, setActiveTab] = useState('readme');
  const [tabs, setTabs] = useState(['readme']);"""

state_new = """function App() {
  const isMobile = typeof window !== 'undefined' && window.innerWidth <= 768;
  const [activeTab, setActiveTab] = useState(isMobile ? 'projects' : 'readme');
  const [tabs, setTabs] = useState(isMobile ? ['projects'] : ['readme']);"""

content = content.replace(state_old, state_new)

# 2. Swap Top Projects and README in the Guide Modal
btn_readme = """            <button 
              className="tour-btn"
              onClick={() => { openFile('readme'); setShowGuide(false); }}
            >
              <i className="fa-brands fa-markdown" style={{color: '#699dfb', width: '20px', textAlign: 'center'}}></i> About Me (README.md)
            </button>"""
            
btn_projects = """            <button 
              className="tour-btn"
              onClick={() => { openFile('projects'); setShowGuide(false); }}
            >
              <i className="fa-solid fa-code" style={{color: '#f1e05a', width: '20px', textAlign: 'center'}}></i> Top Projects
            </button>"""
            
# Find both buttons and replace them in the opposite order
both_btns = f"{btn_readme}\n{btn_projects}"
swapped_btns = f"{btn_projects}\n{btn_readme}"

content = content.replace(both_btns, swapped_btns)

with open('src/App.jsx', 'w') as f:
    f.write(content)

print("Updated mobile priorities")
