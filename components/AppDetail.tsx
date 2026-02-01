import React from 'react';
import { AppItem } from '../types';

interface AppDetailProps {
  app: AppItem;
  onBack: () => void;
}

export const AppDetail: React.FC<AppDetailProps> = ({ app, onBack }) => {
  // Plattform-Erkennung für Android
  const isAndroid = /Android/i.test(navigator.userAgent);
  
  /**
   * Hilfsfunktion zur Generierung der Ziel-URL.
   * Strategie:
   * 1. Android: Nutze "intent://", um das System zu zwingen, die Chrome-App zu öffnen (nicht Webview).
   * 2. iOS/Desktop: Nutze normalen Link.
   */
  const getLinkUrl = (url: string) => {
    if (isAndroid) {
      // Protokoll entfernen für den Intent-Host
      const urlWithoutProtocol = url.replace(/^https?:\/\//, '');
      
      // WICHTIG: Die Fallback-URL muss encodiert werden
      const fallback = encodeURIComponent(url);

      // Der Intent-String:
      // package=com.android.chrome -> Zwingt Chrome (wichtig für Install-Button!)
      // S.browser_fallback_url -> Falls Chrome fehlt, nimm den Standardbrowser
      return `intent://${urlWithoutProtocol}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${fallback};end`;
    }
    // iOS oder Desktop: Normale URL
    return url;
  };

  const externalUrl = getLinkUrl(app.appUrl);

  return (
    <div className="min-h-screen bg-white animate-enter">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-50 transition-all">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center">
          <button 
            onClick={onBack}
            className="flex items-center text-blue-600 font-bold hover:opacity-60 transition-opacity py-2"
          >
            <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto pb-32">
        <div className="px-6 pt-8 pb-6 flex flex-col items-center text-center">
          <div className="relative mb-6 group">
            <img 
              src={app.iconUrl} 
              alt={app.name} 
              className="w-32 h-32 rounded-[2.5rem] object-cover shadow-2xl shadow-blue-900/10 z-10 relative bg-white"
              onError={(e) => {
                 (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=random&size=256`;
              }}
            />
             <div className="absolute inset-0 bg-blue-500/20 blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
          </div>
          
          <h1 className="text-3xl font-black text-slate-900 mb-2 tracking-tight">{app.name}</h1>
          <span className="px-4 py-1.5 bg-slate-100 text-slate-500 rounded-full text-xs font-bold uppercase tracking-widest mb-6">
            {app.category}
          </span>

          {/* DESKTOP / TABLET BUTTON (Versteckt auf Mobile) */}
          <div className="hidden md:block w-full max-w-xs">
            <a 
              href={externalUrl}
              target={isAndroid ? undefined : "_blank"} // Android macht das Fenster selbst auf
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-2xl transition-all shadow-lg hover:shadow-blue-200 transform hover:-translate-y-1"
            >
              App Öffnen
            </a>
          </div>
        </div>

        <section className="px-6 py-6 border-t border-slate-50">
            <h2 className="text-lg font-bold text-slate-900 mb-4">Über diese App</h2>
            <p className="text-slate-600 leading-relaxed text-lg">
                {app.description}
            </p>
        </section>

        {/* MOBILE FLOATING BUTTON */}
        <div className="fixed bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-white via-white to-transparent md:hidden pb-10 z-20">
             <a 
              href={externalUrl}
              target={isAndroid ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="flex items-center justify-center w-full shadow-2xl py-4 rounded-2xl font-black text-white text-xl bg-blue-600 transition-transform active:scale-95 uppercase tracking-widest"
            >
              App Öffnen
            </a>
        </div>
      </div>
    </div>
  );
};