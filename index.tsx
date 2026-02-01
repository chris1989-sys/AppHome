import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Hinweis: Service-Worker-Bereinigung wurde entfernt, da navigator.serviceWorker 
// in dieser Sandbox-Umgebung oft einen 'Invalid State' Fehler wirft.

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Loader sicher entfernen
  const hideLoader = () => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 300);
    }
  };

  if (document.readyState === 'complete') {
    hideLoader();
  } else {
    window.addEventListener('load', hideLoader);
  }
  
  // Backup-Entfernung des Loaders
  setTimeout(hideLoader, 1500);
}