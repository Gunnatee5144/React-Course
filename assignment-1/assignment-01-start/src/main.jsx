import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App.jsx'
import { TeamProvider } from './context/TeamContext.jsx'
import './index.css'

// R4: TeamProvider ครอบสูงกว่า App ทั้งหมด (Nav ใช้ useTeam ได้ทุกหน้า)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <TeamProvider>
        <App />
      </TeamProvider>
    </BrowserRouter>
  </StrictMode>
)
