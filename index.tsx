import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  
  // Render App
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );

  // Entferne den Loader erst, wenn der Browser bereit ist
  window.addEventListener('load', () => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 300);
    }
  });

  // Sicherheits-Fallback: Falls 'load' bereits gefeuert hat
  setTimeout(() => {
    const loader = document.getElementById('initial-loader');
    if (loader) {
      loader.style.opacity = '0';
      setTimeout(() => loader.remove(), 300);
    }
  }, 2000);
}