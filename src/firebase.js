import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const app = firebase.initializeApp({
    apiKey: "AIzaSyA4FdKs9IwLRuvH5_PLFeX2YgQyOCSPTH8",
    authDomain: "gestion-usuarios-2eb63.firebaseapp.com",
    projectId: "gestion-usuarios-2eb63",
    storageBucket: "gestion-usuarios-2eb63.appspot.com",
    messagingSenderId: "457474724212",
    appId: "1:457474724212:web:729daec00b823321a89c21"
})

export const auth = firebase.auth();
export const db = app.firestore();

export default app;