import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import CurrInputContextProvider from "./Context/CurrInputContextProvider";


createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <CurrInputContextProvider>
      <App />
    </CurrInputContextProvider>
  </StrictMode>,
)
