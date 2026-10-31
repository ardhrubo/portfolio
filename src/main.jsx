import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './styles/theme.css'
import './styles/fonts.css'
import './index.css'
import './styles/refinement.css'
import './styles/components.css'
import './styles/studio.css'
import './styles/typography.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
