import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyAZhDA9Ch6ZHYLCwh0QRRfTNP42HSusoZY",
    authDomain: "ethlnagbox.firebaseapp.com",
    databaseURL: "https://ethlnagbox-default-rtdb.firebaseio.com",
    projectId: "ethlnagbox",
    storageBucket: "ethlnagbox.appspot.com",
    messagingSenderId: "715856553378",
    appId: "1:715856553378:web:a9623dda8c3d27088bfefb",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app) 
const auth = getAuth(app)

export { app, db, auth, firebaseConfig }