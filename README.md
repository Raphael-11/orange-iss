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
- PostgreSQL 14+

### 1. Setup Database
```sql
CREATE DATABASE iss_orange;
CREATE USER iss_user WITH PASSWORD 'changeme';
GRANT ALL PRIVILEGES ON DATABASE iss_orange TO iss_user;
```

### 2. Start Backend
```bash
cd backend
npm install
npm run start:dev
```
Backend runs on: **http://localhost:3000**

### 3. Start Frontend
```bash
cd frontend
npm install
npm start
```
Frontend runs on: **http://localhost:4200**

## Access
Open browser: **http://localhost:4200**

## Team
Nour Benzarti, Farah Marnissi, Raef Lefi, Ilyes Fatnassi, Mohamed Aziz Touhami

**Supervisors:** Dr. Lars E.O. Jacobson, Mrs. Ons Kharrat
