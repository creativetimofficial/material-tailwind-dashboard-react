import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  authDomain: 'XXXXXXXXXXXXXX.firebaseapp.com',
  projectId: 'XXXXXXXXXXXXXX',
  storageBucket: 'XXXXXXXXXXXXXX.firebasestorage.app',
  messagingSenderId: 'XXXXXXXXXXXXXXXXX',
  appId: 'XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX',
  measurementId: 'XXXXXXXXXXXXXXXXXXXXXX',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
