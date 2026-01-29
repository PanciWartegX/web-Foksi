import { auth, db } from "./firebase.js";
import {
  addDoc, collection, serverTimestamp
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

kirim.onclick = async () => {
  await addDoc(collection(db, "absensi"), {
    uid: auth.currentUser.uid,
    status: status.value,
    keterangan: ket.value,
    waktu: serverTimestamp()
  });

  alert("Absensi berhasil");
  location.href = "anggota.html";
};
