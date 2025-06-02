import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { BrowserRouter } from 'react-router'
import createStore from 'react-auth-kit/createStore'
import AuthProvider from 'react-auth-kit'


const store = createStore({
  authName:'_auth',
  authType:'localstorage',
});
createRoot(document.getElementById('root')!).render(
  // <StrictMode>
    <AuthProvider store={store}>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </ AuthProvider>
  /* </StrictMode>, */
)
