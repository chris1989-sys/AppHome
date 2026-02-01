import { AppItem } from '../types';
import { db } from './firebase';
import { collection, getDocs } from 'https://www.gstatic.com/firebasejs/11.4.0/firebase-firestore.js';

const APPS_COLLECTION = 'apps';

/**
 * Lädt die Liste der verfügbaren Apps ausschließlich aus Firebase Firestore.
 */
export const fetchApps = async (): Promise<AppItem[]> => {
  try {
    const appsCol = collection(db, APPS_COLLECTION);
    const querySnapshot = await getDocs(appsCol);
    
    if (querySnapshot.empty) {
      console.warn("Firestore Collection 'apps' ist leer. Lade statische Fallback-Daten.");
      return [
        {
          id: '1',
          name: 'TaskFlow',
          description: 'Intelligentes Aufgabenmanagement für moderne Teams. Optimiere deine Workflows mit Leichtigkeit.',
          category: 'Produktivität',
          iconUrl: '/mah.jpg',
          appUrl: 'https://taskflow.io'
        },
        {
          id: '2',
          name: 'ZenMind',
          description: 'Deine Oase für Meditation und Fokus im digitalen Alltag. Finde deine innere Ruhe.',
          category: 'Wellness',
          iconUrl: '/mah.jpg',
          appUrl: 'https://zenmind.app'
        },
        {
          id: '3',
          name: 'CodeCraft',
          description: 'Die ultimative Umgebung für Web-Entwicklung im Browser. Coden, wo immer du bist.',
          category: 'Development',
          iconUrl: '/mah.jpg',
          appUrl: 'https://codecraft.dev'
        }
      ];
    }

    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    } as AppItem));

  } catch (error) {
    console.error("Fehler beim Laden aus Firestore:", error);
    return [];
  }
};