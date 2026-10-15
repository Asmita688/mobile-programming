import { initializeApp } from 'firebase/app';
import { child, get, getDatabase, onValue, push, ref, set } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyBzeWfMoJqngA5x5kTjh9JFbfepGczNVhY",
  authDomain: "mobile-programming-b6421.firebaseapp.com",
  databaseURL: "https://mobile-programming-b6421-default-rtdb.firebaseio.com",
  projectId: "mobile-programming-b6421",
  storageBucket: "mobile-programming-b6421.firebasestorage.app",
  messagingSenderId: "652419566199",
  appId: "1:652419566199:web:9e52b0930fda20001d9472"
};

const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
export { child, get, onValue, push, ref, set };

export default function FirebaseRoute() {
  return null;
}