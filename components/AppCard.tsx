import React from 'react';
import { AppItem } from '../types';

interface AppCardProps {
  app: AppItem;
  onClick: (app: AppItem) => void;
}

export const AppCard: React.FC<AppCardProps> = ({ app, onClick }) => {
  return (
    <div 
      onClick={() => onClick(app)}
      className="bg-white rounded-[2.5rem] p-6 shadow-sm hover:shadow-2xl transition-all duration-500 border border-slate-100 flex flex-col h-full cursor-pointer active:scale-[0.98] group relative overflow-hidden"
    >
      <div className="flex items-start space-x-5 mb-6">
        <div className="relative flex-shrink-0">
          <img 
            src={app.iconUrl} 
            alt={app.name} 
            className="w-20 h-20 rounded-[1.5rem] object-cover shadow-md bg-slate-100 group-hover:scale-105 transition-transform duration-500 z-10 relative"
            loading="lazy"
            onError={(e) => {
               (e.target as HTMLImageElement).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(app.name)}&background=random&size=128`;
            }}
          />
          <div className="absolute inset-0 bg-blue-500/10 blur-xl rounded-full group-hover:bg-blue-500/20 transition-colors"></div>
        </div>
        <div className="flex-1 min-w-0 pt-1">
          <h3 className="text-xl font-black text-slate-900 truncate leading-tight group-hover:text-blue-600 transition-colors">{app.name}</h3>
          <p className="text-[11px] font-black text-slate-400 uppercase tracking-widest mt-1.5 bg-slate-50 w-fit px-2 py-0.5 rounded-md">{app.category}</p>
        </div>
      </div>
      
      <p className="text-slate-500 line-clamp-2 mb-6 flex-grow leading-relaxed font-medium">
        {app.description}
      </p>

      <div className="mt-auto flex justify-between items-center">
        <div className="flex -space-x-2">
            {[1,2,3].map(i => (
                <div key={i} className="w-6 h-6 rounded-full border-2 border-white bg-slate-200"></div>
            ))}
        </div>
        {/* 'Ansehen' Button entfernt wie angefordert */}
        <div className="w-2 h-2 rounded-full bg-slate-200 group-hover:bg-blue-400 transition-colors"></div>
      </div>
    </div>
  );
};