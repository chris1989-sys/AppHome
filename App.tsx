import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { AppCard } from './components/AppCard';
import { AppDetail } from './components/AppDetail';
import { InstallPrompt } from './components/InstallPrompt';
import { fetchApps } from './services/appService';
import { AppItem, InstallPromptType } from './types';
import { usePWA } from './hooks/usePWA';

const App: React.FC = () => {
  // State
  const [apps, setApps] = useState<AppItem[]>([]);
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // PWA & Modal State
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [installPlatform, setInstallPlatform] = useState<InstallPromptType>(null);
  const { pwaState, promptInstall } = usePWA();

  // Load Data
  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        console.log("Fetching apps...");
        const data = await fetchApps();
        console.log("Apps fetched:", data);
        setApps(data);
      } catch (e: any) {
        console.error("Critical error loading apps:", e);
        setError(e.message || "Failed to load apps.");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Handlers
  const handleInstallClick = () => {
    if (pwaState.isIOS) {
        setInstallPlatform('ios');
        setShowInstallModal(true);
    } else if (pwaState.isInstallable) {
        setInstallPlatform('android');
        setShowInstallModal(true);
    }
  };

  const handleAndroidInstall = async () => {
    await promptInstall();
    setShowInstallModal(false);
  };

  const handleAppClick = (app: AppItem) => {
    setSelectedApp(app);
    window.scrollTo(0, 0);
  };

  // Render: Detail View
  if (selectedApp) {
    return <AppDetail app={selectedApp} onBack={() => setSelectedApp(null)} />;
  }

  // Render: Main View
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-8">
        
        {/* Welcome Header */}
        <div className="mb-8 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">AppHome</h2>
                <p className="text-slate-500 mt-1">Entdecken Sie ausgewählte Webanwendungen.</p>
            </div>
            
            {/* Install Button (Only visible if installable) */}
            {(pwaState.isInstallable || pwaState.isIOS) && (
                <button 
                    onClick={handleInstallClick}
                    className="bg-slate-900 hover:bg-slate-800 text-white font-medium py-2 px-5 rounded-full shadow-lg transition-transform active:scale-95 flex items-center justify-center self-start sm:self-auto"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Store Installieren
                </button>
            )}
        </div>

        {/* Loading State */}
        {loading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {[1, 2, 3].map((i) => (
               <div key={i} className="bg-white rounded-3xl p-4 h-32 animate-pulse border border-slate-100 flex items-center space-x-4">
                  <div className="w-16 h-16 bg-slate-200 rounded-2xl"></div>
                  <div className="flex-1 space-y-2">
                     <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                     <div className="h-3 bg-slate-200 rounded w-1/2"></div>
                  </div>
               </div>
             ))}
          </div>
        )}

        {/* Error State */}
        {!loading && error && (
            <div className="p-6 bg-red-50 text-red-600 rounded-2xl border border-red-100 text-center">
                <p className="font-bold">Error loading content</p>
                <p className="text-sm mt-1">{error}</p>
            </div>
        )}

        {/* Empty State */}
        {!loading && !error && apps.length === 0 && (
            <div className="text-center py-20 bg-white rounded-3xl border border-slate-100 shadow-sm">
                <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-400">
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
                </div>
                <h3 className="text-lg font-bold text-slate-900">No Apps Found</h3>
                <p className="text-slate-500 mt-2 max-w-xs mx-auto">
                    Your Firestore collection "apps" is empty. Add a document in the Firebase Console to see it here.
                </p>
            </div>
        )}

        {/* Content Grid */}
        {!loading && !error && apps.length > 0 && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {apps.map((app) => (
              <AppCard 
                key={app.id} 
                app={app} 
                onClick={handleAppClick} 
              />
            ))}
          </div>
        )}
      </main>

      <InstallPrompt 
        isOpen={showInstallModal}
        onClose={() => setShowInstallModal(false)}
        platform={installPlatform}
        onAndroidInstall={handleAndroidInstall}
      />
    </div>
  );
};

export default App;