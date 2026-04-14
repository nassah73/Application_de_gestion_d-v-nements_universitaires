import React from 'react' 
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'; 
{/*import App from './App';*/} 
import Event from './pages/student/Calendare'
import './index.css'

const root = createRoot(document.getElementById('root'))

root.render(
  <>
  {<React.StrictMode>
    <BrowserRouter>
  <Event />
     
    </BrowserRouter>
  </React.StrictMode>}
  </>
)