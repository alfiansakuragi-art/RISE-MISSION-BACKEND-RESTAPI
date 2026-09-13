# Video Belajar - Backend REST API

API Backend untuk aplikasi Video Belajar yang dibangun menggunakan Node.js, Express.js, dan MySQL.

---

## 🛠️ Teknologi & Dependensi

- **Runtime**: Node.js
- **Framework**: Express.js (v5)
- **Database**: MySQL (driver `mysql2` dengan `promise`)
- **Autentikasi & Keamanan**:
  - `bcrypt` (Hashing password)
  - `jsonwebtoken` (JWT Authentication)
- **Utilities**:
  - `dotenv` (Manajemen environment variable)
  - `cors` (Cross-Origin Resource Sharing)
  - `nodemon` (Development server hot-reload)

---

## 📋 Prasyarat Sistem

Sebelum menjalankan project ini, pastikan Anda telah menginstall:
1. **Node.js** (versi 16.x atau lebih baru) & **npm**
2. **MySQL Server** (bisa menggunakan XAMPP, Laragon, MySQL Server, atau Docker)

---

## 🚀 Langkah Instalasi & Konfigurasi

### 1. Clone / Unduh Repository
Masuk ke direktori project:
```bash
cd BACKEND-2
```

### 2. Install Dependensi
Jalankan perintah berikut untuk meng-install semua library pendukung:
```bash
npm install
```

### 3. Konfigurasi Environment Variable (`.env`)
Buat file `.env` di root direktori project (sejajar dengan `package.json`), kemudian sesuaikan nilainya:

```env
DB_HOST=127.0.0.1
DB_PORT=3306
DB_USER=root
DB_PASSWORD=
DB_NAME=VIDEO BELAJAR

JWT_SECRET=rahasia_jwt_anda
POST_KEY=kunci_post_anda
```

> **Catatan**: 
> - Sesuaikan `DB_USER`, `DB_PASSWORD`, dan `DB_PORT` dengan konfigurasi MySQL lokal Anda.
> - `POST_KEY` digunakan sebagai verifikasi header `Authorization` pada beberapa endpoint proteksi (seperti membuat/menghapus produk).

---

## 🗄️ Persiapan Database

Buat database MySQL dengan nama yang sesuai pada file `.env` (misal: `VIDEO BELAJAR`), dan buat tabel-tabel berikut:

### 1. Tabel `user`
```sql
CREATE TABLE `user` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255) NOT NULL UNIQUE,
  `password` VARCHAR(255) NOT NULL,
  `role_id` INT DEFAULT 1,
  `phone_number` VARCHAR(50),
  `region` VARCHAR(100),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 2. Tabel `product`
```sql
CREATE TABLE `product` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `category_id` INT,
  `tutor_id` INT,
  `author_id` INT,
  `title` VARCHAR(255) NOT NULL,
  `description` TEXT,
  `picture` VARCHAR(255),
  `price` DECIMAL(10, 2),
  `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

### 3. Tabel `tutor`
```sql
CREATE TABLE `tutor` (
  `id` INT AUTO_INCREMENT PRIMARY KEY,
  `name` VARCHAR(255) NOT NULL,
  `email` VARCHAR(255),
  `avatar` VARCHAR(255),
  `bio` TEXT
);
```

---

## 🏃 Memulai Server

### Mode Development
Untuk menjalankan server dengan mode auto-reload (`nodemon`):
```bash
npm run dev
```

Server akan berjalan pada:
```
http://localhost:3000
```

---

## 📌 Daftar Endpoint API

### 🔑 Autentikasi & Pengguna

| Method | Endpoint | Deskripsi | Auth Required |
| :--- | :--- | :--- | :--- |
| `POST` | `/register` | Pendaftaran akun pengguna baru | Tidak |
| `POST` | `/login` | Masuk & mendapatkan Token JWT | Tidak |
| `PATCH` | `/user/:id` | Mengubah informasi profil user berdasarkan ID | Tidak |

### 📚 Produk / Kursus

| Method | Endpoint | Deskripsi | Auth / Header Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/products` | Mengambil seluruh daftar produk | Tidak |
| `GET` | `/product/:id` | Mengambil detail produk berdasarkan ID | Tidak |
| `POST` | `/product` | Menambahkan produk baru | Header `Authorization: <POST_KEY>` |
| `DELETE` | `/product/:id` | Menghapus produk berdasarkan ID | Header `Authorization: <POST_KEY>` |

### 👨‍🏫 Tutor

| Method | Endpoint | Deskripsi | Auth Required |
| :--- | :--- | :--- | :--- |
| `GET` | `/tutors` | Mengambil seluruh daftar tutor | Tidak |

---

## 📁 Struktur Direktori Project

```text
BACKEND-2/
├── src/
│   ├── config/
│   │   └── database.js       # Konfigurasi koneksi MySQL Pool
│   ├── controllers/
│   │   ├── productControllers.js
│   │   ├── registerControllers.js
│   │   ├── tutorControllers.js
│   │   └── userControllers.js
│   ├── middleware/
│   │   ├── loginAuth.js
│   │   └── postMiddleware.js
│   ├── models/
│   │   ├── productModels.js
│   │   ├── tutorModels.js
│   │   └── userModels.js
│   ├── routers/
│   │   └── router.js          # Definisi routing utama Express
│   └── server.js              # Entry point server Express
├── .env                       # Environment variables (local)
├── package.json
└── README.md
```
