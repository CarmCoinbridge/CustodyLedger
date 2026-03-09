import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import MobileApp from './MobileApp.jsx'
import DriverApp from './DriverApp.jsx'

const path = window.location.pathname

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {path === '/mobile' ? <MobileApp /> : 
     path === '/driver' ? <DriverApp /> : 
     <App />}
  </React.StrictMode>
)
