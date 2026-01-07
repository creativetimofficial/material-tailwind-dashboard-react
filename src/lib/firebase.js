import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyCuO7kUgfPk5w0sCsJt9WPlWfint2IRNO0',
  authDomain: 'admin-dashboard-d8efe.firebaseapp.com',
  projectId: 'admin-dashboard-d8efe',
  storageBucket: 'admin-dashboard-d8efe.firebasestorage.app',
  messagingSenderId: '573808900654',
  appId: '1:573808900654:web:d9692e7f9956c2e81dbdbf',
  measurementId: 'G-R17ZJBK2J2',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
