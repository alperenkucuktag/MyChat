// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAqcA9aPuFk-gPo9Jlj5vbUWMOD4PBmrO8",
  authDomain: "action-project-1c692.firebaseapp.com",
  projectId: "action-project-1c692",
  storageBucket: "action-project-1c692.appspot.com",
  messagingSenderId: "282942419531",
  appId: "1:282942419531:web:239a32653054fd20d313ce",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//auth referansını alma
export const auth = getAuth(app);
//sağlayıcının kurulumunu yapma
export const provider = new GoogleAuthProvider();

//*veritabanı referansını alma

export const db = getFirestore(app);
