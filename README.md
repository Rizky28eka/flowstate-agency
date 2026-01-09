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
│   │   ├── context/          # React Context (Auth, etc.)
│   │   ├── pages/            # Page Components
│   │   ├── services/         # API Integration Layer
│   │   └── App.tsx           # Main Entry
│   ├── package.json
│   └── vite.config.ts
├── server/                   # Node.js + Express (API)
│   ├── src/
│   │   ├── modules/          # Feature-based Modules
│   │   │   ├── auth/         # Authentication (JWT)
│   │   │   ├── projects/     # Project Management
│   │   │   ├── clients/      # Client Management
│   │   │   └── invoices/     # Invoicing
│   │   ├── shared/           
│   │   │   ├── middleware/   # Auth, RBAC
│   │   │   ├── infra/        # Database Config
│   │   │   └── utils/        # Helpers
│   │   ├── db/               # SQL Schemas
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
- **Styling**: Tailwind CSS v4
- **State Management**: Context API + Hooks
- **Data Fetching**: Axios with Interceptors
- **Real-time**: Socket.io Client (planned)
- **Routing**: React Router v7
- **Animations**: Framer Motion

### Backend
- **Runtime**: Node.js (TypeScript)
- **Framework**: Express.js
- **Database**: PostgreSQL (via `pg` driver)
- **Authentication**: JWT (jsonwebtoken) + bcrypt
- **Security**: Helmet, CORS
- **Validation**: Zod (planned)
- **Real-time**: Socket.io
- **Logging**: Morgan

### Database Schema
- **users**: Authentication & user management with RBAC
- **projects**: Project tracking with client relations
- **tasks**: Task management linked to projects
- **invoices**: (planned)
- **quotations**: (planned)

## 🚀 Cara Setup dan Menjalankan Project

### Prasyarat
- Node.js (v18+)
- PostgreSQL Database
- npm atau yarn

### Langkah-langkah

#### 1. Clone & Install Dependencies
```bash
# Install root dependencies
npm install

# Install workspace dependencies (frontend + server)
cd frontend && npm install
cd ../server && npm install
```

#### 2. Setup Database
Buat database PostgreSQL baru:
```bash
createdb agencyflow
```

Jalankan schema SQL untuk membuat tabel dan seed data:
```bash
psql -d agencyflow -f server/src/db/schema.sql
```

**PENTING**: Generate password hash yang benar untuk admin user:
```bash
cd server && npx ts-node src/scripts/generate-hash.ts
```

Copy hash yang dihasilkan, lalu update di database:
```bash
psql -d agencyflow -c "UPDATE users SET password_hash = 'PASTE_HASH_HERE' WHERE email = 'admin@agencyflow.com';"
```

#### 3. Konfigurasi Environment
Buat file `.env` di folder `server/`:
```bash
cp server/.env.example server/.env
```

Edit `server/.env` dengan kredensial database Anda:
```env
PORT=5001
DATABASE_URL=postgresql://your_username@localhost:5432/agencyflow
JWT_SECRET=your-super-secret-jwt-key-change-this-in-production
NODE_ENV=development
```

**Catatan**: Ganti `your_username` dengan username PostgreSQL Anda (biasanya nama user Mac Anda).

#### 4. Menjalankan Aplikasi (Development Mode)
Dari root folder:
```bash
npm run dev
```

Atau jalankan secara terpisah:
```bash
# Terminal 1 - Backend
cd server && npm run dev

# Terminal 2 - Frontend
cd frontend && npm run dev
```

**Akses Aplikasi:**
- Frontend: `http://localhost:5173`
- Backend API: `http://localhost:5001`

#### 5. Login dengan Akun Demo
Setelah menjalankan schema SQL, gunakan kredensial berikut:
- **Email**: `admin@agencyflow.com`
- **Password**: `admin123`

## ✨ Fitur yang Sudah Diimplementasi

### ✅ Authentication & Authorization
- [x] User Registration dengan validasi
- [x] User Login dengan JWT
- [x] Password hashing dengan bcrypt
- [x] Protected Routes (Frontend & Backend)
- [x] Role-Based Access Control (RBAC)
- [x] Token verification middleware
- [x] Auto-logout on token expiry

### ✅ User Interface
- [x] Landing Page (Premium Design)
- [x] Login/Register Page
- [x] Dashboard Layout dengan Sidebar
- [x] Responsive Design (Mobile-first)
- [x] Dark mode ready styling

### ✅ Project Management (Basic)
- [x] View Projects List
- [x] Project-User Relations
- [ ] Create New Project (Coming Soon)
- [ ] Edit Project (Coming Soon)
- [ ] Delete Project (Coming Soon)
- [ ] Kanban Board (Coming Soon)

### 🔜 Fitur Berikutnya (Roadmap)
1. **Task Management**: Kanban board, task assignment, time tracking
2. **Client Portal**: Dedicated client view, file sharing, approval system
3. **Quotation Builder**: Template-based quotation, one-click conversion to project
4. **Invoicing**: Auto-generation, payment tracking, reminders
5. **Real-time Collaboration**: WebSocket for live updates
6. **File Management**: Upload, preview, version control
7. **Reporting & Analytics**: Dashboard metrics, profitability reports

## 🧪 Testing

### Lint & Build
```bash
# Run linter
npm run lint

# Build production bundle
npm run build
```

### Manual Testing
1. Register akun baru di `/login`
2. Login dengan akun yang dibuat
3. Akses dashboard dan verifikasi data project muncul
4. Logout dan verifikasi redirect ke login

## 📚 API Documentation

### Authentication Endpoints

#### POST `/api/auth/register`
**Request:**
```json
{
  "email": "user@example.com",
  "password": "password123",
  "name": "John Doe",
  "role": "member"
}
```

**Response:**
```json
{
  "message": "User registered successfully",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "user@example.com",
    "name": "John Doe",
    "role": "member"
  }
}
```

#### POST `/api/auth/login`
**Request:**
```json
{
  "email": "admin@agencyflow.com",
  "password": "admin123"
}
```

**Response:**
```json
{
  "message": "Login successful",
  "token": "jwt_token_here",
  "user": {
    "id": 1,
    "email": "admin@agencyflow.com",
    "name": "Super Admin",
    "role": "superadmin"
  }
}
```

#### GET `/api/auth/me`
**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
{
  "user": {
    "id": 1,
    "email": "admin@agencyflow.com",
    "name": "Super Admin",
    "role": "superadmin",
    "created_at": "2026-01-09T00:00:00.000Z"
  }
}
```

### Projects Endpoints

#### GET `/api/projects`
**Headers:**
```
Authorization: Bearer {token}
```

**Response:**
```json
[
  {
    "id": 1,
    "name": "Website Redesign",
    "description": "Complete overhaul",
    "status": "In Progress",
    "progress": 45,
    "client_id": 2
  }
]
```

## 🔒 Security Features
- Password hashing dengan bcrypt (10 rounds)
- JWT dengan expiry (7 days)
- CORS protection
- Helmet.js security headers
- SQL injection protection (parameterized queries)
- XSS protection
- Rate limiting (planned)

## 🤝 Contributing
Ini adalah project skripsi. Untuk kontribusi atau pertanyaan, hubungi maintainer.

---

**Dibuat untuk memenuhi kebutuhan Skripsi - Program Studi Teknik Informatika**

*Last Updated: 2026-01-09*
