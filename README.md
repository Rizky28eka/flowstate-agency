# AgencyFlow - Integrated Project & Client Management Platform

## 📖 Deskripsi Sistem
AgencyFlow adalah platform Software as a Service (SaaS) yang dirancang khusus untuk agency software dan kreatif. Platform ini mengintegrasikan seluruh siklus hidup proyek—dari quotation, manajemen tugas, hingga invoicing—dalam satu ekosistem terpadu.

Sistem ini dibangun untuk mengatasi masalah fragmentasi tools, kurangnya transparansi ke klien, dan inefisiensi administrasi yang sering dialami oleh agency.

## 🏗 Arsitektur Monorepo
Project ini menggunakan arsitektur **Monorepo** untuk menyatukan Frontend dan Backend dalam satu repository. Hal ini memudahkan pengelolaan kode, sharing type definitions, dan deployment.

### Struktur Folder
```
flowstate-agency/
├── frontend/                 # React + Vite (Web App)
│   ├── src/
│   │   ├── components/       # Reusable UI Components
│   │   ├── services/         # API Integration
│   │   ├── store/            # State Management
│   │   └── App.tsx           # Main Entry
│   ├── package.json
│   └── vite.config.ts
├── server/                   # Node.js + Express (API)
│   ├── src/
│   │   ├── modules/          # Feature-based Modules (Auth, Projects, etc.)
│   │   ├── shared/           # Shared Utils, DB Config, Middleware
│   │   ├── app.ts            # Express Setup
│   │   └── index.ts          # Server Entry
│   ├── package.json
│   └── tsconfig.json
├── package.json              # Root Workspace Config
└── README.md
```

## 🛠 Teknologi yang Digunakan

### Frontend
- **Framework**: React.js (TypeScript) + Vite
- **Styling**: Tailwind CSS
- **State Management**: Context API / Hooks
- **Data Fetching**: Axios / Fetch
- **Real-time**: Socket.io Client

### Backend
- **Runtime**: Node.js (TypeScript)
- **Framework**: Express.js
- **Database**: PostgreSQL (via `pg` driver)
- **Real-time**: Socket.io
- **Security**: Helmet, CORS, JWT Auth
- **Validation**: Zod (planned)

## 🚀 Cara Setup dan Menjalankan Project

### Prasyarat
- Node.js (v18+)
- PostgreSQL Database

### Langkah-langkah
1. **Clone & Install Dependencies**
   Jalankan perintah ini di root folder untuk menginstall dependencies di root, frontend, dan backend.
   ```bash
   npm install && cd frontend && npm install && cd ../server && npm install
   ```
   *(Note: Script root sudah disiapkan untuk kemudahan)*

2. **Konfigurasi Environment Database**
   Buat file `.env` di folder `server/` (copy dari `.env.example`).
   ```bash
   cp server/.env.example server/.env
   ```
   Isi `DATABASE_URL` dengan koneksi PostgreSQL Anda.

3. **Menjalankan Aplikasi (Development Mode)**
   Dari root folder, jalankan perintah berikut untuk menyalakan Frontend dan Backend secara bersamaan:
   ```bash
   npm run dev
   ```
   - Frontend akan berjalan di: `http://localhost:5173`
   - Backend akan berjalan di: `http://localhost:5001`

## ✨ Fitur Utama (Implementasi Skripsi)
1. **Manajemen Proyek & Task**: Kanban board, deadline tracking, task assignment.
2. **Quotation Builder**: Pembuatan penawaran harga otomatis dan konversi ke proyek.
3. **Client Portal**: Akses khusus klien untuk memantau progress dan approve deliverables.
4. **Invoicing & Finance**: Pembuatan invoice otomatis dan tracking status pembayaran.

---
*Dibuat untuk memenuhi kebutuhan Skripsi - Program Studi Teknik Informatika.*
