import React from 'react';

interface InstallPromptProps {
  isOpen: boolean;
  onClose: () => void;
  platform: 'ios' | 'android' | null;
  onAndroidInstall: () => void;
}

export const InstallPrompt: React.FC<InstallPromptProps> = ({ 
  isOpen, 
  onClose, 
  platform, 
  onAndroidInstall 
}) => {
  if (!isOpen || !platform) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-4">
      <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-md" onClick={onClose} />

      <div className="relative w-full max-w-sm bg-white rounded-[2.5rem] shadow-2xl p-8 animate-in slide-in-from-bottom-10 duration-500">
        <div className="flex flex-col items-center text-center">
            <div className="w-20 h-20 bg-blue-600 rounded-[1.5rem] flex items-center justify-center shadow-xl mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            </div>
            
            <h3 className="text-2xl font-black text-slate-900 mb-3 uppercase tracking-tight">Store installieren</h3>
            
            {platform === 'ios' ? (
                <>
                    <p className="text-slate-500 mb-8 text-sm leading-relaxed font-medium">
                        Installiere den Store auf deinem iPhone:
                    </p>
                    <div className="text-left text-sm text-slate-700 space-y-4 bg-slate-50 p-5 rounded-3xl w-full border border-slate-100">
                        <div className="flex items-start">
                            <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full mr-3 text-xs font-black shrink-0">1</span>
                            <span>Tippe auf den <strong>Teilen-Button</strong> <svg className="w-5 h-5 inline-block text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg> im Browser.</span>
                        </div>
                        <div className="flex items-start">
                            <span className="flex items-center justify-center w-6 h-6 bg-blue-100 text-blue-600 rounded-full mr-3 text-xs font-black shrink-0">2</span>
                            <span>Wähle <strong>Zum Home-Bildschirm</strong> aus.</span>
                        </div>
                    </div>
                </>
            ) : (
                <>
                    <p className="text-slate-500 mb-8 text-sm leading-relaxed">
                        Hole dir den Store für schnelleren Zugriff und Vollbildmodus auf dein Gerät.
                    </p>
                    <button 
                        onClick={onAndroidInstall}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-black py-4 px-8 rounded-2xl transition-all shadow-xl shadow-blue-200 uppercase tracking-widest text-sm"
                    >
                        Jetzt Installieren
                    </button>
                </>
            )}
            
            <button onClick={onClose} className="mt-6 text-slate-400 font-bold hover:text-slate-600 transition-colors text-sm uppercase tracking-widest">
                Vielleicht später
            </button>
        </div>
      </div>
    </div>
  );
};