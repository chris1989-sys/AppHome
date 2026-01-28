import { collection, getDocs, QuerySnapshot, DocumentData } from 'firebase/firestore';
import { db } from './firebase';
import { AppItem } from '../types';

const APPS_COLLECTION = 'apps';

export const fetchApps = async (): Promise<AppItem[]> => {
  try {
    const querySnapshot: QuerySnapshot<DocumentData> = await getDocs(collection(db, APPS_COLLECTION));
    
    if (querySnapshot.empty) {
      console.log("Firestore connected but collection 'apps' is empty.");
      return [];
    }

    return querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as AppItem));

  } catch (error) {
    console.error("Error fetching apps from Firestore:", error);
    return [];
  }
};