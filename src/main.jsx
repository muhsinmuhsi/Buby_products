import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { ThemeProvider } from "@material-tailwind/react"; 
import { Context } from './Pages/Context.jsx';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Context>
    <ThemeProvider>
      <App />
    </ThemeProvider>
    </Context>
  </React.StrictMode>,
)
