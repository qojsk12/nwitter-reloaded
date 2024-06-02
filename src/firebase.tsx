import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCYSobmckFwJfF2Z4dHOgfGV1gaZCyU53g",
  authDomain: "nwitter-relo.firebaseapp.com",
  projectId: "nwitter-relo",
  storageBucket: "nwitter-relo.appspot.com",
  messagingSenderId: "1053332000227",
  appId: "1:1053332000227:web:be7515140e28192a7a24d6",
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);

export const storage = getStorage(app);

export const db = getFirestore(app);
