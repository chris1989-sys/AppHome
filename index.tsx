import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Service Worker Registrierung (Pfad relativ zum Root)
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('SW registriert'))
      .catch(err => console.log('SW Fehler', err));
  });
}

const rootElement = document.getElementById('root');
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
}