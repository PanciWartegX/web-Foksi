// Import Firebase SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-app.js";
import { getFirestore, collection, doc, setDoc, getDoc, getDocs, query, where, updateDoc } from "https://www.gstatic.com/firebasejs/12.8.0/firebase-firestore.js";

// Konfigurasi Firebase Anda
const firebaseConfig = {
    apiKey: "AIzaSyCd0sX2V0c5PJDyYIzHfKe3kDG5PF555Eo",
    authDomain: "web-foksi.firebaseapp.com",
    projectId: "web-foksi",
    storageBucket: "web-foksi.firebasestorage.app",
    messagingSenderId: "292184437429",
    appId: "1:292184437429:web:2883877cbc61993b9a44fc",
    measurementId: "G-49XD722EFY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// --- FUNGSI GLOBAL ---

// 1. Fungsi Login (Digunakan di index.html)
window.handleLogin = async (e) => {
    e.preventDefault();
    const userIn = document.getElementById('username').value;
    const passIn = document.getElementById('password').value;
    const errorMsg = document.getElementById('error-msg');

    try {
        // Cari user di koleksi 'users'
        const q = query(collection(db, "users"), where("username", "==", userIn), where("password", "==", passIn));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const userData = querySnapshot.docs[0].data();
            // Simpan sesi di localStorage
            localStorage.setItem('foksi_user', JSON.stringify(userData));
            
            // Redirect berdasarkan role
            if (userData.role === 'admin') {
                window.location.href = 'admin.html';
            } else {
                window.location.href = 'member.html';
            }
        } else {
            errorMsg.innerText = "Username atau Password salah!";
            errorMsg.style.display = "block";
        }
    } catch (error) {
        console.error("Login Error:", error);
        errorMsg.innerText = "Terjadi kesalahan koneksi.";
    }
};

// 2. Fungsi Logout
window.logout = () => {
    localStorage.removeItem('foksi_user');
    window.location.href = 'index.html';
};

// 3. Cek Sesi (Dipanggil di awal admin/member html)
export const checkSession = (roleRequired) => {
    const user = JSON.parse(localStorage.getItem('foksi_user'));
    if (!user) {
        window.location.href = 'index.html';
        return null;
    }
    if (roleRequired && user.role !== roleRequired) {
        alert("Akses Ditolak!");
        window.location.href = 'index.html';
        return null;
    }
    return user;
};

// Export variable db agar bisa dipakai di logic spesifik halaman
export { db };
