import { useState, useEffect } from 'react';
import { PWAState } from '../types';

export const usePWA = () => {
  const [pwaState, setPwaState] = useState<PWAState>({
    isInstallable: false,
    isIOS: false,
    deferredPrompt: null,
  });

  useEffect(() => {
    // Check if iOS
    const isIOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !(window as any).MSStream;
    
    // Check if already in standalone mode (installed)
    const isStandalone = window.matchMedia('(display-mode: standalone)').matches || (navigator as any).standalone;

    // Handle Android/Desktop Install Prompt
    const handleBeforeInstallPrompt = (e: any) => {
      e.preventDefault(); // Prevent Chrome 67 and earlier from automatically showing the prompt
      setPwaState(prev => ({
        ...prev,
        isInstallable: true,
        deferredPrompt: e,
        isIOS: isIOS // Persist iOS state
      }));
    };

    window.addEventListener('beforeinstallprompt', handleBeforeInstallPrompt);

    // Initial state set
    setPwaState(prev => ({
      ...prev,
      isIOS: isIOS,
      isInstallable: !isStandalone // If not standalone, it might be installable
    }));

    return () => {
      window.removeEventListener('beforeinstallprompt', handleBeforeInstallPrompt);
    };
  }, []);

  const promptInstall = async () => {
    if (!pwaState.deferredPrompt) {
        return;
    }
    
    // Show the install prompt
    pwaState.deferredPrompt.prompt();
    
    // Wait for the user to respond to the prompt
    const { outcome } = await pwaState.deferredPrompt.userChoice;
    
    if (outcome === 'accepted') {
      console.log('User accepted the install prompt');
    } else {
      console.log('User dismissed the install prompt');
    }
    
    // Reset the deferred prompt variable, it can only be used once.
    setPwaState(prev => ({ ...prev, deferredPrompt: null, isInstallable: false }));
  };

  return { pwaState, promptInstall };
};