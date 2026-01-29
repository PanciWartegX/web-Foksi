import { auth, db } from "./firebase.js";
import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import {
  setDoc, doc
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

tambahAkun.onclick = async () => {
  const email = username.value + "@foksi.id";
  const cred = await createUserWithEmailAndPassword(auth, email, password.value);

  await setDoc(doc(db, "users", cred.user.uid), {
    nama: nama.value,
    username: username.value,
    jabatan: jabatan.value,
    regional: regional.value,
    sekolah: sekolah.value,
    role: "anggota"
  });

  alert("Akun anggota berhasil dibuat");
};

setAbsensi.onclick = async () => {
  await setDoc(doc(db, "setting", "absensi"), {
    kegiatan: kegiatan.value,
    tanggal: tanggal.value,
    buka: buka.value,
    tutup: tutup.value
  });

  alert("Jadwal absensi disimpan");
};

<div class="section">
  <h3>Data Absensi</h3>

  <div class="table-wrapper">
    <table>
      <thead>
        <tr>
          <th>Nama</th>
          <th>Jabatan</th>
          <th>Regional</th>
          <th>Sekolah</th>
          <th>Status</th>
          <th>Keterangan</th>
          <th>Tanggal</th>
          <th>Jam</th>
        </tr>
      </thead>
      <tbody id="tableAbsensi">
        <!-- data otomatis -->
      </tbody>
    </table>
  </div>
</div>

import {
  collection,
  getDocs
} from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

async function loadAbsensi() {
  const tbody = document.getElementById("tableAbsensi");
  tbody.innerHTML = "";

  const querySnap = await getDocs(collection(db, "absensi"));

  querySnap.forEach(docu => {
    const d = docu.data();

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${d.nama || "-"}</td>
      <td>${d.jabatan || "-"}</td>
      <td>${d.regional || "-"}</td>
      <td>${d.sekolah || "-"}</td>
      <td>
        <span class="badge ${statusClass(d.status)}">
          ${d.status}
        </span>
      </td>
      <td>${d.keterangan || "-"}</td>
      <td>${d.waktu?.toDate().toLocaleDateString() || "-"}</td>
      <td>${d.waktu?.toDate().toLocaleTimeString() || "-"}</td>
    `;
    tbody.appendChild(tr);
  });
}

function statusClass(s) {
  if (s === "H") return "hadir";
  if (s === "I") return "izin";
  if (s === "S") return "sakit";
  return "alpa";
}

loadAbsensi();
