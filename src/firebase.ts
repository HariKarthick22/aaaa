import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

// Firebase web config for project: sovereign-omnis
// Get apiKey, messagingSenderId, appId from:
//   Firebase Console -> sovereign-omnis -> Project Settings -> Your apps -> Web app config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY ?? '',
  authDomain: 'sovereign-omnis.firebaseapp.com',
  projectId: 'sovereign-omnis',
  storageBucket: 'sovereign-omnis.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID ?? '',
  appId: import.meta.env.VITE_FIREBASE_APP_ID ?? '',
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore(app)
