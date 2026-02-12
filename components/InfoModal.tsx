import React from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-lg bg-white rounded-[2.5rem] shadow-2xl p-8 max-h-[90vh] overflow-y-auto animate-in fade-in zoom-in duration-300">
        <button onClick={onClose} className="absolute top-6 right-6 text-slate-400 hover:text-slate-600 transition-colors">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        
        <div className="flex flex-col">
          <h3 className="text-2xl font-black text-slate-900 mb-2 pr-8 leading-tight">📲 So installierst du unsere Apps auf deinem Homescreen</h3>
          <p className="text-slate-500 mb-8 font-medium">Du kannst diese Web-App wie eine normale App nutzen, ohne den App Store zu besuchen.</p>
          
          <div className="space-y-8">
            <section>
              <h4 className="flex items-center text-lg font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm opacity-60">
                Apple iOS (Safari)
              </h4>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full mr-3 text-xs font-black shrink-0">1</span>
                  <span>Tippe unten in der Leiste auf das <strong>Teilen-Icon</strong> (Quadrat mit Pfeil nach oben).</span>
                </li>
                <li className="flex items-start bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full mr-3 text-xs font-black shrink-0">2</span>
                  <span>Scrolle nach unten und wähle <strong>„Zum Home-Bildschirm“</strong>.</span>
                </li>
                <li className="flex items-start bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full mr-3 text-xs font-black shrink-0">3</span>
                  <span>Tippe oben rechts auf <strong>„Hinzufügen“</strong>.</span>
                </li>
              </ul>
            </section>

            <div className="h-px bg-slate-100" />

            <section>
              <h4 className="flex items-center text-lg font-bold text-slate-900 mb-4 uppercase tracking-wider text-sm opacity-60">
                Android (Chrome)
              </h4>
              <ul className="space-y-4 text-slate-600">
                <li className="flex items-start bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full mr-3 text-xs font-black shrink-0">1</span>
                  <span>Tippe oben rechts auf die <strong>drei Punkte</strong> (Menü).</span>
                </li>
                <li className="flex items-start bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full mr-3 text-xs font-black shrink-0">2</span>
                  <span>Wähle <strong>„App installieren“</strong> oder <strong>„Zum Startbildschirm hinzufügen“</strong>.</span>
                </li>
                <li className="flex items-start bg-slate-50 p-3 rounded-2xl border border-slate-100">
                  <span className="flex items-center justify-center w-6 h-6 bg-green-100 text-green-600 rounded-full mr-3 text-xs font-black shrink-0">3</span>
                  <span>Bestätige die Installation im Pop-up.</span>
                </li>
              </ul>
            </section>
          </div>

          <button 
            onClick={onClose}
            className="mt-10 w-full bg-blue-600 text-white font-black py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-100 uppercase tracking-widest text-sm"
          >
            Verstanden
          </button>
        </div>
      </div>
    </div>
  );
};