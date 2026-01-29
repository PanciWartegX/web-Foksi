import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCd0sX2V0c5PJDyYIzHfKe3kDG5PF555Eo",
  authDomain: "web-foksi.firebaseapp.com",
  projectId: "web-foksi",
  storageBucket: "web-foksi.firebasestorage.app",
  messagingSenderId: "292184437429",
  appId: "1:292184437429:web:2883877cbc61993b9a44fc"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
