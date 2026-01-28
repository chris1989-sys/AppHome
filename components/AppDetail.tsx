import React from 'react';
import { AppItem } from '../types';

interface AppDetailProps {
  app: AppItem;
  onBack: () => void;
}

export const AppDetail: React.FC<AppDetailProps> = ({ app, onBack }) => {
  // Safe platform check
  const isIOS = typeof navigator !== 'undefined' && 
    /iPad|iPhone|iPod/.test(navigator.userAgent) && 
    !(window as any).MSStream;

  if (!app) return null;

  return (
    <div className="min-h-screen bg-white animate-enter">
      {/* Sticky Header with Back Button */}
      <header className="sticky top-0 z-10 bg-white/90 backdrop-blur-md border-b border-slate-100 transition-all">
        <div className="max-w-2xl mx-auto px-4 h-14 flex items-center justify-between">
          <button 
            onClick={onBack}
            className="flex items-center text-blue-600 font-medium hover:opacity-70 transition-opacity py-2"
          >
            <svg className="w-6 h-6 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" />
            </svg>
            Back
          </button>
        </div>
      </header>

      <div className="max-w-2xl mx-auto px-5 pt-6 pb-32">
        {/* App Header Info */}
        <div className="flex space-x-5 mb-8">
          <img 
            src={app.iconUrl} 
            alt={app.name} 
            className="w-28 h-28 rounded-[1.5rem] shadow-lg object-cover bg-slate-100 flex-shrink-0 border border-slate-100" 
          />
          <div className="flex flex-col justify-center min-w-0 flex-1">
            <h1 className="text-2xl font-bold text-slate-900 leading-tight mb-2">{app.name}</h1>
            <p className="text-slate-500 font-medium mb-4 text-sm uppercase tracking-wide">{app.category}</p>
            
            {/* Desktop/Tablet Action Button */}
            <a 
              href={app.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`hidden md:inline-flex items-center justify-center py-2 px-6 rounded-full font-bold text-sm tracking-wide transition-all shadow-md active:scale-95 w-fit
                ${isIOS 
                  ? 'bg-blue-600 text-white hover:bg-blue-700' 
                  : 'bg-green-600 text-white hover:bg-green-700'
                }`}
            >
              {isIOS ? 'OPEN APP' : 'INSTALL / OPEN'}
            </a>
          </div>
        </div>

        <div className="h-px bg-slate-100 my-6"></div>

        {/* Description Section */}
        <section>
          <h2 className="text-xl font-bold text-slate-900 mb-4">About</h2>
          <p className="text-slate-600 leading-relaxed whitespace-pre-line text-base">
            {app.description}
          </p>
        </section>

        {/* Floating Action Button (Mobile) */}
        <div className="fixed bottom-0 left-0 right-0 p-5 bg-gradient-to-t from-white via-white to-transparent md:hidden pb-8">
             <a 
              href={app.appUrl}
              target="_blank"
              rel="noopener noreferrer"
              className={`flex items-center justify-center w-full shadow-xl py-4 rounded-2xl font-bold text-white text-lg transition-transform active:scale-95
                ${isIOS ? 'bg-blue-600' : 'bg-green-600'}`}
            >
              {isIOS ? 'Open App' : 'Download / Open'}
            </a>
        </div>
      </div>
    </div>
  );
};