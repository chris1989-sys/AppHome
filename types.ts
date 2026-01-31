export interface AppItem {
  id: string;
  name: string;
  description: string;
  iconUrl: string;
  appUrl: string;
  category: string;
}

export interface PWAState {
  isInstallable: boolean;
  isIOS: boolean;
  deferredPrompt: any | null; // BeforeInstallPromptEvent
}

export type InstallPromptType = 'ios' | 'android' | null;