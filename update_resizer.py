import re

with open('src/App.css', 'r') as f:
    css = f.read()

resizer_css = """
.sidebar-resizer {
  width: 5px;
  background-color: transparent;
  cursor: col-resize;
  z-index: 100;
  transition: background-color 0.2s;
}
.sidebar-resizer:hover, .sidebar-resizer:active {
  background-color: var(--accent);
}
"""

css += resizer_css

with open('src/App.css', 'w') as f:
    f.write(css)

with open('src/App.jsx', 'r') as f:
    jsx = f.read()

# Fix Modal Icons
jsx = jsx.replace('<i className="fa-brands fa-js" style={{color: \'#f1e05a\', width: \'20px\', textAlign: \'center\'}}></i> Top Projects', '<i className="fa-solid fa-code" style={{color: \'#f1e05a\', width: \'20px\', textAlign: \'center\'}}></i> Top Projects')
jsx = jsx.replace('<i className="fa-brands fa-js" style={{color: \'#f1e05a\', width: \'20px\', textAlign: \'center\'}}></i> Career Timeline', '<i className="fa-solid fa-code-branch" style={{color: \'var(--accent)\', width: \'20px\', textAlign: \'center\'}}></i> Career Timeline')
jsx = jsx.replace('<i className="fa-brands fa-node-js" style={{color: \'#83cd29\', width: \'20px\', textAlign: \'center\'}}></i> Socials (package.json)', '<i className="fa-solid fa-share-nodes" style={{color: \'#83cd29\', width: \'20px\', textAlign: \'center\'}}></i> Socials (package.json)')

# Add Resizer State
state_block = """  const [activeActivity, setActiveActivity] = useState('explorer');
  const [theme, setTheme] = useState('synthwave');
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
  }, [theme]);"""

# Replace old state block
old_state = """  const [activeActivity, setActiveActivity] = useState('explorer');
  const [theme, setTheme] = useState('synthwave');

  useEffect(() => {
    document.body.className = `theme-${theme}`;
  }, [theme]);"""
jsx = jsx.replace(old_state, state_block)

# Add Resizer to render and update sidebar style
sidebar_start_old = """      {/* Sidebar */}
      <div className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`}>"""
sidebar_start_new = """      {/* Sidebar */}
      <div className={`sidebar ${mobileMenuOpen ? 'mobile-open' : ''}`} style={{ width: mobileMenuOpen ? '80%' : `${sidebarWidth}px` }}>"""
jsx = jsx.replace(sidebar_start_old, sidebar_start_new)

sidebar_end_old = """          )}
      </div>

      {/* Editor Area */}"""
sidebar_end_new = """          )}
      </div>
      <div className="sidebar-resizer" onMouseDown={startResizing}></div>

      {/* Editor Area */}"""
jsx = jsx.replace(sidebar_end_old, sidebar_end_new)

with open('src/App.jsx', 'w') as f:
    f.write(jsx)

print("Updated resizer and icons")
