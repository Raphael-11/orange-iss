# Orange ISS - Internship Management System

## What is this?
A platform to manage internships and student applications for Orange Digital Center.

## Tech Stack
- **Frontend**: Angular 17
- **Backend**: NestJS 10 + TypeORM
- **Database**: PostgreSQL 14
- **Auth**: JWT + Passport

## Project Structure
```
Orange_iss/
├── backend/           # NestJS API
│   ├── src/
│   │   ├── auth/     # Login & Register
│   │   ├── offers/   # Internship offers
│   │   ├── users/    # User management
│   │   └── common/   # Shared code
│   └── package.json
├── frontend/          # Angular App
│   ├── src/
│   │   └── app/
│   │       ├── features/  # All pages
│   │       ├── core/      # Auth & guards
│   │       └── shared/    # Reusable components
│   └── package.json
└── docker-compose.yml
```

## What Works
✅ User authentication (login/register)  
✅ Offers CRUD (create, read, update, delete)  
✅ Offer workflow (draft → submitted → approved → published)  
✅ Role-based access (Student, Chief, HR, Supervisor)  
✅ Dashboard pages for all roles  
✅ Responsive UI with modern styling

## How to Start

### Prerequisites
- Node.js 18+
- Supabase account (database provided)

### 1. Setup Database Connection

**Get your Supabase database password:**
1. Go to [Supabase Dashboard](https://supabase.com/dashboard)
2. Select your project
3. Go to **Settings** > **Database**
4. Find your database password (you set this when creating the project)

**Update backend/.env file:**
```bash
cd backend
# The .env file is already configured, just update the password:
DATABASE_PASSWORD=YOUR_SUPABASE_PASSWORD_HERE
```

### 2. Start Backend
```bash
cd backend
npm install
npm run start:dev
```
Backend runs on: **http://localhost:3000**

### 3. Seed Default Users (First Time Only)
```bash
cd backend
npm run seed
```
This creates default accounts for HR, Chief, and Supervisor roles.

### 4. Start Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs on: **http://localhost:4200**

## Default Accounts

**Students** can create their own accounts via the Sign Up page.

**Other roles** use these pre-created accounts:

| Role | Email | Password | 
|------|-------|----------|
| HR Manager | hr@orange.tn | changeme123 |
| Department Chief | chief@orange.tn | changeme123 |
| Supervisor | supervisor@orange.tn | changeme123 |

⚠️ **Change passwords after first login!**

## Access
Open browser: **http://localhost:4200**

## Team
Nour Benzarti, Farah Marnissi, Raef Lefi, Ilyes Fatnassi, Mohamed Aziz Touhami

**Supervisors:** dr Asma amdouni, Mrs. Ons Kharrat
