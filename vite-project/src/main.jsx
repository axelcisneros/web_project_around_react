import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './components/App.jsx'

createRoot(document.getElementById('page')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
