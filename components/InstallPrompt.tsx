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
    <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center pointer-events-none">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm pointer-events-auto transition-opacity" 
        onClick={onClose}
      />

      {/* Sheet / Modal */}
      <div className="relative w-full max-w-sm mx-4 mb-4 sm:mb-0 bg-white rounded-3xl shadow-2xl p-6 pointer-events-auto animate-in slide-in-from-bottom-10 fade-in duration-300">
        <div className="absolute top-3 right-3">
             <button onClick={onClose} className="p-2 bg-slate-100 rounded-full hover:bg-slate-200 text-slate-500">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
             </button>
        </div>

        <div className="flex flex-col items-center text-center">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg mb-4">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                </svg>
            </div>
            
            <h3 className="text-xl font-bold text-slate-900 mb-2">Install AppHome</h3>
            
            {platform === 'ios' ? (
                <>
                    <p className="text-slate-600 mb-6 text-sm leading-relaxed">
                        To install this app on your iPhone or iPad:
                    </p>
                    <ol className="text-left text-sm text-slate-700 space-y-3 bg-slate-50 p-4 rounded-xl w-full">
                        <li className="flex items-center">
                            <span className="flex items-center justify-center w-6 h-6 bg-slate-200 rounded-full mr-3 text-xs font-bold">1</span>
                            <span>Tap the <strong>Share</strong> button <svg className="w-4 h-4 inline mx-1 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" /></svg> in your browser bar.</span>
                        </li>
                        <li className="flex items-center">
                            <span className="flex items-center justify-center w-6 h-6 bg-slate-200 rounded-full mr-3 text-xs font-bold">2</span>
                            <span>Scroll down and tap <strong>Add to Home Screen</strong>.</span>
                        </li>
                    </ol>
                </>
            ) : (
                <>
                    <p className="text-slate-600 mb-6 text-sm">
                        Install AppHome for a better experience with quick access and fullscreen mode.
                    </p>
                    <button 
                        onClick={onAndroidInstall}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl transition-colors shadow-lg shadow-blue-200"
                    >
                        Install Now
                    </button>
                </>
            )}
        </div>
      </div>
    </div>
  );
};