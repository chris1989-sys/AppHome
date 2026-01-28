import React, { useEffect, useState } from 'react';
import { Header } from './components/Header';
import { AppCard } from './components/AppCard';
import { AppDetail } from './components/AppDetail';
import { InstallPrompt } from './components/InstallPrompt';
import { fetchApps } from './services/appService';
import { AppItem, InstallPromptType } from './types';
import { usePWA } from './hooks/usePWA';

const App: React.FC = () => {
  const [apps, setApps] = useState<AppItem[]>([]);
  const [selectedApp, setSelectedApp] = useState<AppItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [showInstallModal, setShowInstallModal] = useState(false);
  const [installPlatform, setInstallPlatform] = useState<InstallPromptType>(null);
  
  const { pwaState, promptInstall } = usePWA();

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const data = await fetchApps();
      setApps(data);
      setLoading(false);
    };

    loadData();
  }, []);

  // Handle global "Install App" button visibility logic (for AppHome itself)
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

  // Navigation Logic
  const handleAppClick = (app: AppItem) => {
    setSelectedApp(app);
    window.scrollTo(0, 0); // Reset scroll when entering detail view
  };

  const handleBackClick = () => {
    setSelectedApp(null);
  };

  // If an app is selected, show the Detail View
  if (selectedApp) {
    return <AppDetail app={selectedApp} onBack={handleBackClick} />;
  }

  // Otherwise show the Main List View
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900 pb-20">
      <Header />

      <main className="max-w-4xl mx-auto px-4 pt-8">
        
        {/* Hero / Welcome Section */}
        <div className="mb-10 text-center sm:text-left sm:flex sm:items-end sm:justify-between">
            <div>
                <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight mb-2">Discover</h2>
                <p className="text-slate-500 text-lg">Best web apps, curated for you.</p>
            </div>
            
            {/* Conditional Install Button for the Store itself */}
            {(pwaState.isInstallable || pwaState.isIOS) && (
                <button 
                    onClick={handleInstallClick}
                    className="mt-4 sm:mt-0 bg-slate-900 hover:bg-slate-800 text-white font-medium py-2.5 px-5 rounded-full shadow-lg shadow-slate-200 transition-all active:scale-95 flex items-center justify-center mx-auto sm:mx-0"
                >
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" /></svg>
                    Install AppHome
                </button>
            )}
        </div>

        {/* Content Grid */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
             {[1, 2, 3, 4].map((i) => (
               <div key={i} className="bg-white rounded-3xl p-4 h-40 animate-pulse border border-slate-100">
                  <div className="flex space-x-4">
                     <div className="w-16 h-16 bg-slate-200 rounded-2xl"></div>
                     <div className="flex-1 py-1 space-y-2">
                         <div className="h-4 bg-slate-200 rounded w-3/4"></div>
                         <div className="h-3 bg-slate-200 rounded w-1/4"></div>
                     </div>
                  </div>
               </div>
             ))}
          </div>
        ) : (
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