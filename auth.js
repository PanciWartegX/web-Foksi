import { auth, db } from "./firebase.js";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  doc, getDoc, setDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

// AUTO CREATE ADMIN
const adminEmail = "renanda@foksi.id";
const adminPass = "Renan123";

const adminRef = doc(db, "users", "admin");
const adminSnap = await getDoc(adminRef);

if (!adminSnap.exists()) {
  const cred = await createUserWithEmailAndPassword(auth, adminEmail, adminPass);
  await setDoc(doc(db, "users", cred.user.uid), {
    nama: "Renanda",
    username: "Renanda",
    role: "admin"
  });
}

document.getElementById("loginBtn").onclick = async () => {
  const email = username.value + "@foksi.id";
  const pass = password.value;

  try {
    const userCred = await signInWithEmailAndPassword(auth, email, pass);
    const snap = await getDoc(doc(db, "users", userCred.user.uid));
    const role = snap.data().role;

    location.href = role === "admin" ? "admin.html" : "anggota.html";
  } catch {
    alert("Login gagal");
  }
};
