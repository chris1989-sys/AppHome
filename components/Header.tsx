import React from 'react';

export const Header: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-50/90 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <img src="https://my-apphome.vercel.app/images/MyAPP.jpg" alt="App Store Logo" className="w-8 h-8 rounded-lg shadow-sm"/>
          <h1 className="text-xl font-bold text-slate-900 tracking-tight">My AppHome</h1>
        </div>
        
        {/* User Profile Placeholder (Future Auth) */}
        <button className="w-9 h-9 rounded-full bg-slate-200 flex items-center justify-center text-slate-500 hover:bg-slate-300 transition-colors">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
        </button>
      </div>
    </header>
  );
};