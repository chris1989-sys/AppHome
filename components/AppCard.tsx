export const AppCard: React.FC<AppCardProps> = ({ app, onClick }) => {
  return (
    <div 
      onClick={() => onClick(app)}
      className="bg-white rounded-3xl p-4 shadow-sm hover:shadow-md transition-all duration-300 border border-slate-100 flex flex-col h-full cursor-pointer active:scale-[0.98]"
    >
      <div className="flex items-start space-x-4 mb-3">
        <img 
          src={app.iconUrl} 
          alt={app.name} 
          className="w-16 h-16 rounded-2xl object-cover shadow-sm bg-slate-100 flex-shrink-0"
          loading="lazy"
        />
        <div className="flex-1 min-w-0 py-1">
          <h3 className="text-lg font-bold text-slate-900 truncate leading-tight mb-1">{app.name}</h3>
          <p className="text-xs font-semibold text-slate-400 uppercase tracking-wide">{app.category}</p>
        </div>
      </div>
      
      {/* Short description preview */}
      <p className="text-sm text-slate-500 line-clamp-3 mb-2 flex-grow leading-relaxed">
        {app.description}
      </p>

      {/* Der "VIEW"-Block wurde hier entfernt */}
    </div>
  );
};