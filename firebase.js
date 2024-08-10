import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const app = initializeApp({
  apiKey: "AIzaSyDp3g2LHR97UdcsgMhAQNT9NK7KNibwOL0",
  authDomain: "williamandharry-9288e.firebaseapp.com",
  projectId: "williamandharry-9288e",
  storageBucket: "williamandharry-9288e.appspot.com",
  messagingSenderId: "346862769568",
  appId: "1:346862769568:web:4374117114cfb7841040c5",
  measurementId: "G-3KWSNNR1B2",
});

const db = getFirestore(app);

export { db };
