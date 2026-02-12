import React from 'react';

interface HeaderProps {
  onInfoClick?: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onInfoClick }) => {
  return (
    <header className="sticky top-0 z-50 bg-white/90 backdrop-blur-md border-b border-slate-100">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 h-18 py-3 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 relative group overflow-hidden rounded-xl">
            <img 
              src="/mah.jpg" 
              alt="AppHome Logo" 
              className="w-full h-full object-cover shadow-sm scale-110" 
            />
            <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors"></div>
          </div>
          <h1 className="text-xl font-extrabold text-slate-900 tracking-tight hidden xs:block">My AppHome</h1>
        </div>
        
        <div className="flex items-center space-x-3">
          {onInfoClick && (
            <button 
              onClick={onInfoClick}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-600 text-white hover:bg-blue-700 transition-all shadow-md shadow-blue-100 active:scale-95 group"
              title="Installationsanleitung öffnen"
            >
              <svg className="w-5 h-5 group-hover:rotate-12 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-black uppercase tracking-wider">Anleitung</span>
            </button>
          )}
          <button className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-slate-500 hover:bg-slate-200 transition-colors border border-slate-200/50">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
          </button>
        </div>
      </div>
    </header>
  );
};