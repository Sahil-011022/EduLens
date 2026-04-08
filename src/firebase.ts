import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyBK3xxJfpGg1uAp1YxUTmztrEzHIqFfKos",
  authDomain: "edulens-ff3aa.firebaseapp.com",
  projectId: "edulens-ff3aa",
  storageBucket: "edulens-ff3aa.firebasestorage.app",
  messagingSenderId: "719649220635",
  appId: "1:719649220635:web:3453c4ea80f7e3d1c7b0be",
  measurementId: "G-CB9C0MK5BW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);
