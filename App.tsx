import React, { useEffect, useState, useMemo } from 'react';
import { Header } from './components/Header';
import { AppCard } from './components/AppCard';
import { AppDetail } from './components/AppDetail';
import { InstallPrompt } from './components/InstallPrompt';
import { InfoModal } from './components/InfoModal';
import { fetchApps } from './services/appService';
import { AppItem, InstallPromptType } from './types';
import { usePWA } from './hooks/usePWA';

const App: React.FC = () => {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false);
  const [installPlatform, setInstallPlatform] = useState<InstallPromptType>(null);
  const { pwaState, promptInstall } = usePWA();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchApps();
        setApps(data);
      } catch (e: any) {
        setError("Inhalte konnten nicht geladen werden. Bitte versuche es später erneut.");
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  const filteredApps = useMemo(() => {
    return apps.filter(app => 
      app.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.description.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [apps, searchQuery]);

  const handleInstallClick = () => {
    if (pwaState.isIOS) {
        setInstallPlatform('ios');
        setShowInstallModal(true);
    } else if (pwaState.isInstallable) {
        setInstallPlatform('android');
        setShowInstallModal(true);
    }
  };

  const handleAppClick = (app: AppItem) => {
    setSelectedApp(app);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (selectedApp) {
    return <AppDetail app={selectedApp} onBack={() => setSelectedApp(null)} />;
  }

  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-24">
      <Header onInfoClick={() => setShowInfoModal(true)} />

      <main className="max-w-5xl mx-auto px-6 pt-12">
        <div className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div className="flex-1">
                <h2 className="text-5xl font-black text-slate-900 tracking-tight mb-3">Entdecken</h2>
                <p className="text-slate-500 text-xl font-medium max-w-lg">Hochwertige Web-Applikationen, kuratiert von unserer KI für deine Produktivität.</p>
                
                {/* Install Button for Mobile */}
                {(pwaState.isInstallable || pwaState.isIOS) && (
                    <button 
                        onClick={handleInstallClick}
                        className="md:hidden mt-6 w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-6 rounded-2xl shadow-xl transition-all active:scale-95 flex items-center justify-center"
                    >
                        <svg className="w-6 h-6 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Store installieren
                    </button>
                )}
            </div>

            <div className="flex flex-col gap-4 w-full md:w-80">
                <div className="relative">
                    <input 
                      type="text"
                      placeholder="Apps durchsuchen..."
                      className="w-full pl-12 pr-4 py-4 bg-white border border-slate-200 rounded-2xl shadow-sm focus:ring-4 focus:ring-blue-100 focus:border-blue-400 transition-all outline-none font-medium"
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                    />
                    <svg className="w-6 h-6 text-slate-400 absolute left-4 top-1/2 -translate-y-1/2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
                
                {/* Desktop Install Button */}
                {(pwaState.isInstallable || pwaState.isIOS) && (
                    <button 
                        onClick={handleInstallClick}
                        className="hidden md:flex bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transition-all hover:shadow-blue-200 active:scale-95 items-center justify-center whitespace-nowrap"
                    >
                        <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                        Store installieren
                    </button>
                )}
            </div>
        </div>

        {error && (
            <div className="bg-red-50 border border-red-100 p-6 rounded-3xl text-red-600 font-bold flex items-center mb-8">
                <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>
                {error}
            </div>
        )}

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
             {[1, 2, 3, 4, 5, 6].map((i) => (
               <div key={i} className="bg-white rounded-[2rem] p-8 h-56 animate-pulse border border-slate-100 shadow-sm">
                  <div className="flex items-center space-x-5">
                    <div className="w-20 h-20 bg-slate-100 rounded-[1.5rem]"></div>
                    <div className="flex-1 space-y-3">
                       <div className="h-6 bg-slate-100 rounded w-3/4"></div>
                       <div className="h-4 bg-slate-100 rounded w-1/2"></div>
                    </div>
                  </div>
                  <div className="mt-6 space-y-2">
                      <div className="h-4 bg-slate-100 rounded w-full"></div>
                      <div className="h-4 bg-slate-100 rounded w-5/6"></div>
                  </div>
               </div>
             ))}
          </div>
        ) : (
          <>
            {filteredApps.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 animate-enter">
                  {filteredApps.map((app) => (
                    <AppCard 
                      key={app.id} 
                      app={app} 
                      onClick={handleAppClick} 
                    />
                  ))}
                </div>
            ) : (
                <div className="text-center py-24 bg-white rounded-[3rem] border border-slate-100">
                    <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-300">
                        <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                    </div>
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">Keine Apps gefunden</h3>
                    <p className="text-slate-500">Versuche es mit einem anderen Suchbegriff.</p>
                    <button 
                        onClick={() => setSearchQuery('')}
                        className="mt-6 text-blue-600 font-bold hover:underline"
                    >
                        Suche zurücksetzen
                    </button>
                </div>
            )}
          </>
        )}
      </main>

      <InstallPrompt 
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        platform={installPlatform}
        onAndroidInstall={promptInstall}
      />

      <InfoModal 
        isOpen={showInfoModal}
        onClose={() => setShowInfoModal(false)}
      />
    </div>
  );
};

export default App;