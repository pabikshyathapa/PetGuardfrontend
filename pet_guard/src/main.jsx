import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AppRouter from './router/AppRouter.jsx'
import AuthContextProvider from './auth/AuthProvider.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthContextProvider>
    <AppRouter />
  </AuthContextProvider>
  </StrictMode>,
)
