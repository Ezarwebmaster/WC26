import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

// Dynamically inject Google Analytics if configured
const gaId = import.meta.env.VITE_GA_ID;
if (gaId && typeof window !== "undefined") {
  const script = document.createElement("script");
  script.async = true;
  script.src = `https://www.googletagmanager.com/gtag/js?id=${gaId}`;
  document.head.appendChild(script);

  const inlineScript = document.createElement("script");
  inlineScript.textContent = `
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
    gtag('config', ${JSON.stringify(gaId)}, { page_path: window.location.pathname });
  `;
  document.head.appendChild(inlineScript);
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
