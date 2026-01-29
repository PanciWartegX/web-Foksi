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
  
