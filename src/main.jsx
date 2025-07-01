import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

import ApplicationContextProvider from './context/ApplicationContext'
import TostMsgContextProvider from './context/TostMsgContext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <ApplicationContextProvider>
      <TostMsgContextProvider>
        <App />
      </TostMsgContextProvider>
    </ApplicationContextProvider>
  </StrictMode>,
)
