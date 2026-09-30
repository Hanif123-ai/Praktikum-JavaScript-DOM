console.log("Bismillah Praktikum Dimulai");

// Aktivitas 1 DOM SELECTION / Seleksi elemen
// Kenapa kita harus seleksi karena "menangkap" atau ambil id/class
// Mengambil elemen html tersebut lalu disimpan di variabel javascript

// Mengambil Elemen Judul utama & Sub Judul
// document.getelementById("...") mengambil berdasarkan atribud id.

const judulUtama = document.getElementById("judul-utama"); // menangkap: <h1 id="judul-utama">

//document.querySelector("#...")
// tanda # artinya ID

const subjudul = document.querySelector("Sub-judul"); // menangkap: <p id="#sub-judul">

// 2. Mengambil Elemen pada kartu 1 (kartu Manipulasi Teks & Style)
const teksPreview = document.getElementById("teks-preview");
const boxPreview = document.getElementById("box-preview");
const cardManipulasi = document.getElementById("card-manipulasi");


// 3. Mengambil elemen tombol - tombol aksi pada kartu 1
const btnUbahTeks = document.getElementById("btn-ubah-teks");
const btnToggleWarna = document.getElementById("btn-toggle-warna");
const btnReset = document.getElementById("btn-reset");

// 4. Mengambil elemen pada Kartu 2 (Fitur Catatan Dinamis / To Do List Sederhana)
const inputCatatan = document.getElementById("input-catatan");
const btnTambah = document.getElementById("btn-tambah");
const daftarCatatan = document.getElementById("daftar-catatan");
const jumlahCatatan = document.getElementById("jumlah-catatan");
const pesanKosong = document.getElementById("pesan-kosong");

// Aktivitas ke 2 Manipulasi Teks & Style (Card 1)
// addEventListener("click", function() {...}) artinya adalah Tolong dengarkan dulu/ tunggu
// sampai di klik user. Jika di klik jalankan perintah didalam function

// A. Mengubah teks & Warna secara langsung

btnUbahTeks.addEventListener("click", function() {
    //..innerText = mengganti atau mengisi secara langsung teks yang ada di dalam elemen HTML
    teksPreview.innerText = "Hebat! Teks ini berhasil diubah pake DOM";

    //.style.color = mengubah warna teks secara langsung (Inline Style)
    teksPreview.style.color = "#4138ee"

    // console.log = mencetak pesan di console browser
    console.log("[DOM Teks Preview telah diperbaharui!");
})

// B. Manipulasi class css Menggunakan classList.toggle()
btnToggleWarna.addEventListener("click", function() {
    // classList.toggle("nama-class") = fitur saklar otomatis (ON/OFF)
    boxPreview.classList.toggle("active-mode");
    cardManipulasi.classList.toggle("highlight");

    console.log("[DOM Berhasil di switch!");


})

// C. Mengembalikan (Reset) Teks ke kondisi semula
btnReset.addEventListener("click", function() {
    // 1. Kembalikan teks semula teks asli
teksPreview.innerText = "Halo! Teks ini siap diubah oleh Javascript";

// 2. Kosongkan warna agar kembali ke warna CSS bawaan
    teksPreview.style.color = "";

    // 3. Hapus class khusus untuk menggunakan .classList.remove("")
    boxPreview.classList.remove("active-mode");
    cardManipulasi.classList.remove("highlight");

    console.log("[DOM Tampilan di reset!");
})


// Aktivitas 3 & 4 : Dinamis & Event Handling (To Do List Sederhana)
// Di aktivitas ini kita belajar elemen HTML bisa dibuat secara otomatis dalam Javascript. 
// mengisi teksnya, memberi tombol hapus, lalu menempelkan ke layar (<ul>

// Langkah 1: Membuat variabel Penampung angka jumlah catatan
// "let" digunakan untuk nilai variabel yang akan berubah ubah bisa bertambah bisa berkurang (counting)
let totalCatatan = 0;

// Langkah 2: Fungsi Update angka counter & pesan status
function perbaharuiJumlah() {
    // Masukkan angka total catatan terbaru ke dalam tag <spam id="jumlah-catatan">
    jumlahCatatan.innerText = totalCatatan;
    // Conditional statement berupa apakah catatannya itu kosong/ 0?
    if (totalCatatan === 0) {
        // Jika 0, Hapus class "hidden" supaya teks "belum ada catatan" muncul ke layar
        pesanKosong.classList.remove("hidden");
    } else {
        // Jika > 0, tambahkan class "hidden" agar teks "belum ada catatan" tersembunyi
        pesanKosong.classList.add("hidden");
    }
}


// Langkah 3: Fungsi untuk Logika Tambah Catatan Baru
function tambahCatatan() {
// 3.1 InputCatatan.value fungsi nya untuk mengambil teks yang diketik user
    //.trim() = menghapus spasi di awal dan diakhir
    const isiTeks = inputCatatan.value.trim();

    // 3.2 Validasi input: Jika isi teks kosong maka tampilkan alert
    if (isiTeks === "") {
        alert("Catatan kamu tidak boleh kosong!");
        return;

        // 3.3 document.createElement("li") = membuat memori di javascript secara dinamis
        const liBaru = document.createElement("li");
        liBaru.className = "note-item"; // menambahkan pada tag li

        // 3.4 .innerHTML = Mengisi struktur di dalam tag li dengan teks catatan dan tombol hapus
        // Tanda backtick (`)
        liBaru.innerHTML = `<span>${isiTeks}</span> <button class="btn-hapus">Hapus</button>`; 

        // 3.5 Menambahkan Telinga / Event Listener untuk tombol hapus pada catatan dinamis
        // libaru.querySelector(".btn-hapus") = menangkap tombol ber class "btn-hapus"khusus yang ada di dalam liBaru
        const btnHapus = liBaru.querySelector(".btn-hapus");
        btnHapus.addEventListener("click", function() {
           liBaru.remove(); // Menghapus elemen list dari layar HTML
           totalCatatan--; // totalCatatan dikurangin sebanyak 1x
           perbaharuiJumlah(); // Panggil fungsi perbaharuiJumlah untuk update angka dilayar
           console.log(`[DOM Catatan "${isiTeks}" dihapus!]`);
        });

        // 3.6 appendChild() = menmasukkan elemen li kedalam wadah <ul id="daftar-catatan">
        daftarCatatan.appendChild(liBaru);

        // 3.7 Mengosongkan kembali isi kolom input (inputCatatan.value = "") supaya bisa diketik lagi
        inputCatatan.value = "";

        // 3.8 totalCatatan++ artinya tambah nilai totalCatatan sebanyak 1, lalu update angka ke layar
        totalCatatan++;
        perbaharuiJumlah();

        console.log(`[DOM Catatan baru ditambahkan: "${isiTeks}"]`);
    }

}

// Langkah 4: Event Listener klik Tombol + "Tambah"
// ketika tombol "+tambah" diklik oleh user, maka jalankan fungsi tambahCatatan()
btnTambah.addEventListener("click", function() {
    tambahCatatan();
});

// Langkah 5: Event Listener tekan tombol "Enter" pada kolom input
// ketika user mengetik input dan melepas tombool keyboard ('Event keyup');
inputCatatan.addEventListener("keyup", function(event) {
    // Periksa apakah tombol keyboard yang ditekan user adalah enter?
    if (event.key === "Enter") {
        tambahCatatan(); // Jika ya, jalankan fungsi tambahCatatan()
    }
});


