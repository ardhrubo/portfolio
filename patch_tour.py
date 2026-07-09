import re

with open('src/App.jsx', 'r') as f:
    content = f.read()

# Replace state
content = content.replace("const [showGuide, setShowGuide] = useState(true);", "const [tourStep, setTourStep] = useState(0);")

# Replace old modal logic
old_modal_regex = r"\{showGuide && \([\s\S]*?\)\}"

new_modal = """{tourStep !== -1 && (
      <div className="guide-modal-overlay">
        <div className="guide-modal" style={{minHeight: '300px', display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
          {tourStep === 0 && (
            <div className="tour-content" style={{animation: 'modalPop 0.3s ease-out'}}>
              <h2><i className="fa-solid fa-terminal" style={{color: 'var(--syntax-keyword)', marginRight: '10px'}}></i>Welcome to Dhrubo's IDE!</h2>
              <p style={{marginBottom: '30px', color: 'var(--text-muted)', lineHeight: '1.5'}}>This portfolio is designed like a real code editor. Would you like a quick tour to see how to navigate?</p>
              <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }}>
                <button className="tour-btn" style={{background: 'var(--accent)', color: 'var(--bg-darkest)', border: 'none', fontWeight: 'bold'}} onClick={() => setTourStep(1)}>Take a Tour</button>
                <button className="tour-btn" onClick={() => setTourStep(-1)}>Explore Freely</button>
              </div>
            </div>
          )}

          {tourStep === 1 && (
            <div className="tour-content" style={{animation: 'modalPop 0.3s ease-out'}}>
              <h2><i className="fa-regular fa-copy" style={{color: '#699dfb', marginRight: '10px'}}></i>1. File Explorer</h2>
              <p style={{marginBottom: '20px', color: 'var(--text-muted)', lineHeight: '1.5'}}>On the left, the Explorer lets you open files like <code>projects.js</code> or <code>README.md</code>. They will open in the main editor area as tabs!</p>
              <div style={{ background: 'var(--bg-dark)', padding: '10px', borderRadius: '6px', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <i className="fa-solid fa-code" style={{color: '#f1e05a'}}></i> <span style={{fontFamily: 'Fira Code', fontSize: '13px'}}>projects.js</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                <button className="tour-btn" style={{padding: '8px 15px', fontSize: '13px'}} onClick={() => setTourStep(-1)}>Skip Tour</button>
                <button className="tour-btn" style={{background: 'var(--accent)', color: 'var(--bg-darkest)', border: 'none', fontWeight: 'bold'}} onClick={() => setTourStep(2)}>Next <i className="fa-solid fa-arrow-right"></i></button>
              </div>
            </div>
          )}

          {tourStep === 2 && (
            <div className="tour-content" style={{animation: 'modalPop 0.3s ease-out'}}>
              <h2><i className="fa-solid fa-code-branch" style={{color: 'var(--accent)', marginRight: '10px'}}></i>2. Career Control</h2>
              <p style={{marginBottom: '20px', color: 'var(--text-muted)', lineHeight: '1.5'}}>Click the Git Branch icon in the Activity Bar to view my career timeline, designed just like a real Git commit graph with branching tracks.</p>
              <div style={{ background: 'var(--bg-dark)', padding: '10px', borderRadius: '6px', marginBottom: '25px', display: 'flex', alignItems: 'center', gap: '15px' }}>
                <div style={{width: '2px', height: '20px', background: 'var(--accent)'}}></div>
                <div style={{width: '10px', height: '10px', borderRadius: '50%', border: '2px solid var(--accent)', marginLeft: '-21px'}}></div>
                <span style={{fontFamily: 'Fira Code', fontSize: '13px', color: 'var(--syntax-func)'}}>feat(career): join team</span>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 'auto' }}>
                <button className="tour-btn" style={{padding: '8px 15px', fontSize: '13px'}} onClick={() => setTourStep(-1)}>Skip Tour</button>
                <button className="tour-btn" style={{background: 'var(--accent)', color: 'var(--bg-darkest)', border: 'none', fontWeight: 'bold'}} onClick={() => setTourStep(3)}>Next <i className="fa-solid fa-arrow-right"></i></button>
              </div>
            </div>
          )}

          {tourStep === 3 && (
            <div className="tour-content" style={{animation: 'modalPop 0.3s ease-out'}}>
              <h2><i className="fa-solid fa-gear" style={{color: '#83cd29', marginRight: '10px'}}></i>3. Customization</h2>
              <p style={{marginBottom: '20px', color: 'var(--text-muted)', lineHeight: '1.5'}}>Click the Gear icon in the bottom left to open Settings. From there, you can instantly switch between incredible color themes!</p>
              <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '25px' }}>
                <div className="theme-swatch" style={{background: '#ffeed6', border: '1px solid var(--border)'}}></div>
                <div className="theme-swatch" style={{background: '#e22f80', border: '1px solid var(--border)'}}></div>
                <div className="theme-swatch" style={{background: '#8eca3c', border: '1px solid var(--border)'}}></div>
                <div className="theme-swatch" style={{background: '#2f2fe4', border: '1px solid var(--border)'}}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', marginTop: 'auto' }}>
                <button className="tour-btn" style={{background: 'var(--accent)', color: 'var(--bg-darkest)', border: 'none', fontWeight: 'bold', width: '100%', justifyContent: 'center'}} onClick={() => setTourStep(-1)}><i className="fa-solid fa-check"></i> Finish & Explore</button>
              </div>
            </div>
          )}
          
          {tourStep > 0 && (
            <div className="tour-progress" style={{display: 'flex', justifyContent: 'center', gap: '8px', marginTop: '20px'}}>
              <div style={{width: '8px', height: '8px', borderRadius: '50%', background: tourStep === 1 ? 'var(--accent)' : 'var(--bg-dark)'}}></div>
              <div style={{width: '8px', height: '8px', borderRadius: '50%', background: tourStep === 2 ? 'var(--accent)' : 'var(--bg-dark)'}}></div>
              <div style={{width: '8px', height: '8px', borderRadius: '50%', background: tourStep === 3 ? 'var(--accent)' : 'var(--bg-dark)'}}></div>
            </div>
          )}
        </div>
      </div>
    )}"""

content = re.sub(old_modal_regex, new_modal, content)

with open('src/App.jsx', 'w') as f:
    f.write(content)

print("Tour steps injected")
