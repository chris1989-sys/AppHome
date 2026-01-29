import React from 'react';
import { AppItem } from '../types';

interface AppDetailProps {
  app: AppItem;
  onBack: () => void;
}

// Info-Box Komponente
const InfoBox: React.FC<{ icon: JSX.Element; title: string; subtitle: string }> = ({ icon, title, subtitle }) => (
  <div className="flex flex-col items-center text-center">
    {icon}
    <p className="text-xs text-slate-500 mt-1.5">{title}</p>
    <p className="font-bold text-sm text-slate-800">{subtitle}</p>
  </div>
);

export const AppDetail: React.FC<AppDetailProps> = ({ app, onBack }) => {
  const isIOS = typeof navigator !== 'undefined' && /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;

  if (!app) return null;

  return (
    <div className="min-h-screen bg-white animate-enter">
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <button onClick={onBack} className="flex items-center text-blue-600 font-medium hover:opacity-70 transition-opacity py-2">
            <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Zurück
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-5 pt-6 pb-32">
        <div className="flex space-x-5 mb-8">
          <img src={app.iconUrl} alt={app.name} className="w-28 h-28 rounded-[1.5rem] shadow-lg object-cover bg-slate-100 flex-shrink-0 border border-slate-100" />
          <div className="flex flex-col justify-center min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-2">{app.name}</h1>
            <p className="text-slate-500 font-medium mb-4 text-sm uppercase tracking-wide">{app.developer || 'Unknown Developer'}</p>
            <a href={app.appUrl} target="_blank" rel="noopener noreferrer" className={`hidden md:inline-flex items-center justify-center py-2 px-6 rounded-full font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 w-fit ${isIOS ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-green-600 text-white hover:bg-green-700'}`}>
              {isIOS ? 'ÖFFNEN' : 'INSTALLIEREN'}
            </a>
          </div>
        </div>

        {/* Info Sektion */}
        <div className="grid grid-cols-4 gap-4 py-4 px-2 bg-slate-50 rounded-2xl border border-slate-100 mb-8">
           <InfoBox 
            icon={<svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>}
            title="Preis"
            subtitle="Kostenlos"
          />
          <InfoBox 
            icon={<svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>}
            title="Werbung"
            subtitle="Nein"
          />
          <InfoBox 
            icon={<svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H4a3 3 0 00-3 3v8a3 3 0 003 3z"></path></svg>}
            title="In-App"
            subtitle="Keine"
          />
          <InfoBox 
            icon={<svg className="w-6 h-6 text-slate-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>}
            title="Kategorie"
            subtitle={app.category}
          />
        </div>
        
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">Über diese App</h2>
          <p className="text-slate-600 leading-relaxed whitespace-pre-line text-base">{app.description}</p>
        </section>

        <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent md:hidden pb-8">
             <a href={app.appUrl} target="_blank" rel="noopener noreferrer" className={`flex items-center justify-center w-full shadow-xl py-4 rounded-2xl font-bold text-white text-lg transition-transform active:scale-95 ${isIOS ? 'bg-blue-600' : 'bg-green-600'}`}>
              {isIOS ? 'ÖFFNEN' : 'INSTALLIEREN'}
            </a>
        </div>
      </div>
    </div>
  );
};