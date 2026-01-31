import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthContextProvider from './store/AuthContextProvider.jsx'

import App from './App.jsx'
import CartContextProvider from './store/CartContextProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
      <CartContextProvider>
        <App />
      </CartContextProvider>
    
  </AuthContextProvider>  
  </StrictMode>,
)
