# 🖥️ AmbaNet

Aplikasi berbasis web untuk mengelola operasional **Warung Internet (Warnet)**, mulai dari pengelolaan komputer, data member, produk, hingga transaksi rental komputer.

Project ini dikembangkan sebagai bagian dari tugas praktikum/UTS dengan menerapkan konsep **Model-View-Controller (MVC)** menggunakan Express.js, EJS, dan MySQL.

## 📌 Deskripsi Project

Sistem Manajemen Warnet merupakan aplikasi web yang dirancang untuk membantu pengelola warnet dalam mengelola aktivitas operasional secara terstruktur.

Melalui aplikasi ini, pengelola dapat mengelola data komputer yang tersedia, mencatat informasi member, mengatur produk yang dijual, serta mengelola transaksi penggunaan komputer.

Aplikasi dikembangkan menggunakan arsitektur MVC agar kode program lebih terorganisasi dan mudah dikembangkan.

## ✨ Fitur Sistem

Berikut fitur utama yang tersedia dalam aplikasi:

| Fitur | Deskripsi |
|---|---|
| Dashboard | Halaman utama aplikasi. |
| Manajemen Komputer | Menampilkan, menambahkan, mengubah, dan menghapus data komputer. |
| Manajemen Member | Mengelola informasi member, nomor HP, dan saldo. |
| Manajemen Produk | Mengelola data produk, kategori, harga, dan stok. |
| Manajemen Rental | Mengelola transaksi penggunaan komputer oleh member. |

### Detail Data

**1. Komputer**
- Nomor PC
- Jenis PC (Reguler, VIP, Premium)
- Spesifikasi komputer
- Status komputer (Tersedia, Digunakan, Maintenance)

**2. Member**
- Nama member
- Nomor HP
- Saldo
- Tanggal pendaftaran

**3. Produk**
- Nama produk
- Kategori
- Harga
- Stok

**4. Rental**
- Member
- Komputer yang digunakan
- Waktu mulai
- Waktu selesai
- Total biaya

## 🛠️ Teknologi yang Digunakan

| Teknologi | Kegunaan |
|---|---|
| Node.js | Runtime JavaScript di sisi server. |
| Express.js | Framework untuk membangun server dan routing. |
| EJS | Template engine untuk menghasilkan halaman HTML. |
| MySQL | Database relasional untuk menyimpan data aplikasi. |
| MySQL2 | Menghubungkan aplikasi Node.js dengan MySQL. |
| Tailwind CSS | Membantu proses styling antarmuka. |
| Git & GitHub | Version control dan kolaborasi pengembangan. |

## 🔄 Alur Kerja Sistem

Aplikasi menggunakan pola arsitektur **Model-View-Controller (MVC)**.

Secara umum, alur permintaan pada aplikasi adalah:

1. User mengakses halaman melalui browser.
2. Request diterima oleh Express.js dan diteruskan ke Routes.
3. Routes mengarahkan request ke Controller yang sesuai.
4. Controller memproses request dan berkomunikasi dengan Model jika membutuhkan data.
5. Model menjalankan query SQL ke database MySQL.
6. Database mengembalikan hasil query kepada Model.
7. Controller mengirimkan data ke View menggunakan `res.render()`.
8. EJS menghasilkan halaman HTML yang ditampilkan kepada user.

### Diagram Alur MVC

```text
             USER / BROWSER
                    |
                    | HTTP Request
                    v
               ROUTES
                    |
                    v
              CONTROLLER
                    |
                    v
                 MODEL
                    |
                    v
              MYSQL DATABASE
                    |
                    v
                 MODEL
                    |
                    v
              CONTROLLER
                    |
                    v
                 VIEW
                  (EJS)
                    |
                    v
              HTML RESPONSE
                    |
                    v
             USER / BROWSER
```

### Contoh Alur Pengelolaan Data Komputer

Ketika user membuka halaman komputer:

1. User mengakses `/computers`.
2. Express menjalankan route GET `/computers`.
3. Controller memanggil fungsi pengambilan data pada Model.
4. Model mengambil seluruh data komputer dari database.
5. Controller menerima data dan mengirimkannya ke halaman EJS.
6. Halaman komputer ditampilkan di browser.

Ketika user menambahkan komputer:

1. User membuka halaman tambah komputer.
2. User mengisi formulir dan menekan tombol simpan.
3. Browser mengirimkan request POST ke server.
4. Controller menerima data dari `req.body`.
5. Model menjalankan query INSERT ke database.
6. Jika berhasil, user diarahkan kembali ke halaman komputer.

Alur serupa diterapkan pada fitur Member, Produk, dan Rental.

## 📂 Struktur Direktori Project

Berikut gambaran struktur direktori aplikasi:

```text
warnet/
│
├── config/
│   └── database.js
│
├── controllers/
│   ├── computer.controller.js
│   ├── rental.controller.js
│   └── produk.controller.js
│
├── models/
│   ├── computer.model.js
│   ├── rental.model.js
│   └── produk.model.js
│
├── routes/
│   ├── computer.routes.js
│   ├── rental.routes.js
│   └── produk.routes.js
│
├── views/
│   ├── pages/
│   │   ├── computers/
│   │   │   ├── index.ejs
│   │   │   ├── tambah.ejs
│   │   │   └── edit.ejs
│   │   │
│   │   ├── rentals/
│   │   │   ├── index.ejs
│   │   │   ├── tambah.ejs
│   │   │   └── edit.ejs
│   │   │
│   │   └── products/
│   │       ├── index.ejs
│   │       ├── tambah.ejs
│   │       └── edit.ejs
│   │
│   └── partials/
│       ├── header.ejs
│       ├── sidebar.ejs
│       └── footer.ejs
│
├── public/
│   └── (file statis seperti gambar, CSS, dan JavaScript)
│
├── .env
├── .env.example
├── .gitignore
├── app.js
├── db_warnet.sql
├── package.json
└── package-lock.json
```

**Keterangan:**

- `config/`: Konfigurasi koneksi database.
- `controllers/`: Mengatur logika aplikasi dan request dari user.
- `models/`: Mengelola komunikasi dan query ke database.
- `routes/`: Mendefinisikan endpoint aplikasi.
- `views/pages/`: Menyimpan halaman utama aplikasi menggunakan EJS.
- `views/partials/`: Menyimpan komponen tampilan yang digunakan kembali.
- `public/`: Menyimpan file statis seperti CSS, gambar, dan JavaScript.
- `app.js`: Entry point aplikasi Express.js.

*Catatan: Sesuaikan struktur direktori ini dengan kondisi final repository, termasuk file Member yang mungkin belum tercantum di atas.*

## 🗄️ Database

Aplikasi menggunakan MySQL dengan nama database:

```sql
db_warnet
```

Database memiliki tabel utama berikut:

| Tabel | Fungsi |
|---|---|
| `computer` | Menyimpan informasi komputer. |
| `member` | Menyimpan informasi member. |
| `produk` | Menyimpan informasi produk. |
| `rental` | Menyimpan transaksi rental komputer. |

### Relasi Antar Tabel

- Tabel `rental` memiliki relasi dengan tabel `member` melalui `id_member`.
- Tabel `rental` memiliki relasi dengan tabel `computer` melalui `id_computer`.
- Satu member dapat memiliki beberapa transaksi rental.
- Satu komputer dapat tercatat dalam beberapa transaksi rental pada waktu yang berbeda.

## ⚙️ Persyaratan Sistem

Sebelum menjalankan project, pastikan perangkat sudah memiliki:

1. [Node.js](https://nodejs.org/) dan npm.
2. [Git](https://git-scm.com/).
3. [MySQL](https://dev.mysql.com/downloads/mysql/) atau MySQL melalui XAMPP.
4. Code editor seperti [Visual Studio Code](https://code.visualstudio.com/).

## 🚀 Instalasi dan Menjalankan Project

Ikuti langkah-langkah berikut untuk menjalankan aplikasi di komputer lokal.

### 1. Clone Repository

Buka terminal atau Git Bash, kemudian jalankan:

```bash
git clone https://github.com/ryanthaaa/pemweb-uts-kelompok-1.git
```

Ganti URL tersebut dengan URL repository kelompok yang sebenarnya.

Masuk ke direktori project:

```bash
cd warnet
```

### 2. Install Dependencies

Jalankan perintah berikut untuk menginstal seluruh package yang dibutuhkan:

```bash
npm install
```

### 3. Konfigurasi Database

Buat database MySQL dengan nama:

```sql
CREATE DATABASE db_warnet;
```

Kemudian import file SQL project jika tersedia.

Pastikan tabel `computer`, `member`, `produk`, dan `rental` sudah dibuat sesuai struktur database aplikasi.

### 4. Konfigurasi Environment

Buat file `.env` di direktori utama project.

Contoh konfigurasi (sesuaikan nama variabel dengan yang digunakan pada `config/database.js`):

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=db_warnet
DB_PORT=3306

PORT=3000
```

**Penting:** Jangan mengunggah file `.env` yang berisi konfigurasi pribadi atau kredensial database ke GitHub. Gunakan `.env.example` sebagai template konfigurasi.

### 5. Jalankan Aplikasi

Jalankan aplikasi sesuai script yang tersedia di `package.json`.

Jika menggunakan script start:

```bash
npm start
```

Atau jika menggunakan script dev:

```bash
npm run dev
```

Apabila berhasil, server dapat diakses melalui:

```text
http://localhost:3000
```

## 🌿 Kolaborasi dengan Git dan GitHub

Project dikembangkan secara berkelompok menggunakan Git dan GitHub.

Setiap anggota mengerjakan fitur melalui branch masing-masing untuk memisahkan pekerjaan.

### Branch yang Digunakan

| Branch | Pekerjaan |
|---|---|
| `main` | Branch utama project. |
| `fitur/member` | Pengembangan fitur Member. |
| `fitur/produk` | Pengembangan fitur Produk. |
| `fitur/computer` | Pengembangan fitur Computer. |
| `fitur/rental` | Pengembangan fitur Rental. |

### Alur Kolaborasi

1. Setiap anggota mengerjakan fitur pada branch masing-masing.
2. Perubahan disimpan menggunakan `git add` dan `git commit`.
3. Anggota mengirim perubahan menggunakan `git push` ke branch masing-masing.
4. Perubahan fitur digabungkan ke branch `main` oleh anggota yang bertanggung jawab.
5. Anggota lain mengambil perubahan terbaru dari `main` ke branch pekerjaan masing-masing.

Contoh mengirim perubahan:

```bash
git add .
git commit -m "feat: add product feature"
git push origin fitur/produk
```

Contoh menggabungkan fitur ke `main`:

```bash
git switch main
git pull origin main
git merge origin/fitur/produk
git push origin main
```

## 👥 Anggota Kelompok

Berikut anggota yang berkontribusi dalam pengembangan aplikasi:

| Anggota | Tanggung Jawab | GitHub |
|---|---|---|
| Ryan | Pengembangan dan integrasi fitur Computer serta pengelolaan repository | [@ryanthaaa](https://github.com/ryanthaaa) |
| Dandi Prayata | Pengembangan fitur Member serta Merancang ERD | [@DandiPrayata-lgtm](https://github.com/DandiPrayata-lgtm) |
| Bayu Trias | Pengembangan fitur Produk dan Pengolahan Database | [@BayuuuTriasss](https://github.com/BayuuuTriasss) |
| Rama | Pengembangan fitur Computer | [@ramadiputra01](https://github.com/ramadiputra01) |

## 📄 Lisensi

Project ini dikembangkan untuk keperluan pembelajaran dan penyelesaian tugas perkuliahan.

---

**Developed by Kelompok 1 AmbaLord.**
