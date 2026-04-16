import React from 'react' 
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; 
import App from './App';
{/*import Event from './pages/student/Analityc'*/}
import './index.css'
{/*import Dash from './pages/organisateur/OrganizerDashboard'*/}
const root = createRoot(document.getElementById('root'))

root.render(
  <>
  {<React.StrictMode>
    <BrowserRouter>
  <App />
     
    </BrowserRouter>
  </React.StrictMode>}
  </>
)