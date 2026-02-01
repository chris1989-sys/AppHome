import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-50/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-9 h-9 relative group">
            <img 
              src="/mah.jpg" 
              alt="AppHome Logo" 
              className="w-full h-full rounded-xl object-cover shadow-sm border border-slate-200"
            />
            <div className="absolute inset-0 rounded-xl bg-blue-500/0 group-hover:bg-blue-500/5 transition-colors"></div>
          </div>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">My AppHome</h1>
        </div>
        
        {/* User Profile Placeholder */}
        <button className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-300 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </button>
      </div>
    </header>
  );
};