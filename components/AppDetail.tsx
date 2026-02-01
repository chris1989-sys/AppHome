import React from 'react';
import { AppItem } from '../types';

interface AppDetailProps {
  app: AppItem;
  onBack: () => void;
}

export const AppDetail: React.FC<AppDetailProps> = ({ app, onBack }) => {
  // Plattform-Erkennung
  const isAndroid = /Android/i.test(navigator.userAgent);
  
  /**
   * Erstellt den Hard-Force Link für Android Chrome
   * Format: intent://[URL]#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=[ENCODED_URL];end
   */
  const getExternalUrl = (url: string) => {
    if (isAndroid) {
      const urlWithoutProtocol = url.replace(/^https?:\/\//, '');
      const encodedFullUrl = encodeURIComponent(url);
      return `intent://${urlWithoutProtocol}#Intent;scheme=https;package=com.android.chrome;S.browser_fallback_url=${encodedFullUrl};end`;
    }
    return url;
  };

  const externalUrl = getExternalUrl(app.appUrl);

  return (
    <div className="min-h-screen bg-white animate-enter">
      <header className="sticky top-0 z-10 bg-white/80 backdrop-blur-xl border-b border-slate-50 transition-all">
        <div className="max-w-2xl mx-auto px-4 h-16 flex items-center">
          <button 
            onClick={onBack}
            className="flex items-center text-blue-600 font-bold hover:opacity-60 transition-opacity py-2"
          >
            <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-6 pt-8 pb-32">
        <div className="flex space-x-6 mb-10">
          <div className="relative flex-shrink-0">
            <img 
              src={app.iconUrl} 
              alt={app.name} 
              className="w-32 h-32 rounded-[2rem] shadow-2xl object-cover bg-slate-50 border border-slate-100" 
              onError={(e) => {
                (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=random&size=256`;
              }}
            />
            <div className="absolute inset-0 bg-blue-500/5 blur-2xl rounded-full -z-10"></div>
          </div>
          <div className="flex flex-col justify-center min-w-0 flex-1">
            <h1 className="text-3xl font-extrabold text-slate-900 leading-tight mb-1 truncate">{app.name}</h1>
            <p className="text-slate-400 font-bold text-sm uppercase tracking-widest mb-6">{app.category}</p>
            
            <a 
              href={externalUrl}
              target={isAndroid ? undefined : "_blank"}
              rel="noopener noreferrer"
              className="hidden md:inline-flex items-center justify-center py-2.5 px-8 rounded-full bg-blue-600 text-white font-black text-sm tracking-widest transition-all shadow-lg hover:bg-blue-700 active:scale-95 w-fit uppercase"
            >
              Öffnen
            </a>
          </div>
        </div>

        <div className="h-px bg-slate-100 my-8"></div>

        <section className="mb-10">
          <h2 className="text-2xl font-bold text-slate-900 mb-4">Infos</h2>
          <p className="text-slate-600 leading-relaxed whitespace-pre-line text-lg font-medium">
            {app.description}
          </p>
        </section>

        {/* Info-Tabelle / Grid */}
        <section className="border-t border-slate-100 pt-8">
            <h3 className="text-xl font-bold text-slate-900 mb-6 uppercase tracking-wider text-sm opacity-50">Informationen</h3>
            <div className="divide-y divide-slate-50">
                <div className="py-4 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Anbieter</span>
                    <span className="text-slate-900 font-semibold">AppHome Community</span>
                </div>
                <div className="py-4 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Kategorie</span>
                    <span className="text-blue-600 font-semibold">{app.category}</span>
                </div>
                <div className="py-4 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Kompatibilität</span>
                    <span className="text-slate-900 font-semibold text-right max-w-[200px]">Erfordert Webbrowser</span>
                </div>
                <div className="py-4 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Sprachen</span>
                    <span className="text-slate-900 font-semibold">Deutsch, Englisch</span>
                </div>
                <div className="py-4 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Alter</span>
                    <span className="text-slate-900 font-semibold">4+</span>
                </div>
                <div className="py-4 flex justify-between items-center">
                    <span className="text-slate-400 font-medium">Urheberrecht</span>
                    <span className="text-slate-900 font-semibold">© 2025 AppHome Inc.</span>
                </div>
            </div>
        </section>

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