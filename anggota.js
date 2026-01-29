import { auth, db } from "./firebase.js";
import {
  doc, getDoc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

const user = auth.currentUser;
const snap = await getDoc(doc(db, "users", user.uid));
info.innerText = `${snap.data().nama} | ${snap.data().jabatan}`;

const setSnap = await getDoc(doc(db, "setting", "absensi"));

isiAbsensi.onclick = () => {
  const now = new Date().toTimeString().slice(0,5);
  if (now < setSnap.data().buka || now > setSnap.data().tutup) {
    alert("Absensi ditutup");
    return;
  }
  location.href = "absensi.html";
};
