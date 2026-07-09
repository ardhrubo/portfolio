import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# Add import
if "import Joyride" not in content:
    content = content.replace("import './App.css';", "import './App.css';\nimport Joyride, { STATUS } from 'react-joyride';")

# Replace tourStep state with Joyride state and Welcome modal state
state_old = "const [tourStep, setTourStep] = useState(0);"
state_new = """const [showWelcome, setShowWelcome] = useState(true);
  const [{ runTour, tourSteps }, setTourState] = useState({
    runTour: false,
    tourSteps: [
      {
        target: '#tour-explorer',
        content: 'On the left, the Explorer lets you open files like projects.js or README.md.',
        disableBeacon: true,
      },
      {
        target: '#tour-career',
        content: 'Click the Git Branch icon to view my career timeline, designed just like a real Git commit graph.',
      },
      {
        target: '#tour-settings',
        content: 'Click the Gear icon to open Settings. From there, you can switch between amazing color themes!',
      },
      {
        target: '#tour-editor',
        content: 'And finally, this is the main editor. View all my portfolio details here. Enjoy your stay!',
      }
    ]
  });

  const handleJoyrideCallback = (data) => {
    const { status } = data;
    const finishedStatuses = [STATUS.FINISHED, STATUS.SKIPPED];
    if (finishedStatuses.includes(status)) {
      setTourState({ runTour: false, tourSteps });
    }
  };"""
content = content.replace(state_old, state_new)

# Add IDs to Activity Bar
content = content.replace('title="Explorer"', 'id="tour-explorer" title="Explorer"')
content = content.replace('title="Career Control"', 'id="tour-career" title="Career Control"')
content = content.replace('title="Settings"', 'id="tour-settings" title="Settings"')
content = content.replace('className="editor-area"', 'id="tour-editor" className="editor-area"')

# Replace the old modal rendering with the new welcome modal + Joyride component
old_modal_regex = r"\{tourStep !== -1 && \([\s\S]*?\)\}"

new_modal = """{showWelcome && (
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
      styles={{
        options: {
          zIndex: 10000,
          primaryColor: '#e22f80',
          backgroundColor: '#080616',
          textColor: '#e0e0e0',
          arrowColor: '#080616',
          overlayColor: 'rgba(0, 0, 0, 0.6)'
        }
      }}
    />"""

content = re.sub(old_modal_regex, new_modal, content)

with open('src/App.jsx', 'w') as f:
    f.write(content)

print("Joyride patched into App.jsx")
