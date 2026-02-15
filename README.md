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
- Docker Desktop (for database)

### Quick Start

```bash
# 1. Start Database
docker-compose up -d postgres

# 2. Start Backend
cd backend
npm install
npm run start:dev
npm run seed  # First time only - creates default admin accounts

# 3. Start Frontend (new terminal)
cd frontend
npm install
npm start
```

**Access:**
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000/api

### Alternative: Without Docker
If you don't have Docker, see [DATABASE_SETUP.md](DATABASE_SETUP.md) for local PostgreSQL setup or Supabase cloud database.

---

## View Database

```bash
# Connect to database
docker exec -it iss_orange_db psql -U iss_user -d iss_orange

# View tables and data
\dt                    # List tables
SELECT * FROM users;   # View users
\q                     # Exit
```

Or use pgAdmin/VS Code PostgreSQL extension with:
- Host: localhost, Port: 5432
- Database: iss_orange
- User: iss_user, Password: changeme

---

## Default Accounts

**Students** can create accounts via Sign Up page.

**Admin roles** (created by seed script):

| Role | Email | Password | 
|------|-------|----------|
| HR Manager | hr@orange.tn | changeme123 |
| Department Chief | chief@orange.tn | changeme123 |
| Supervisor | supervisor@orange.tn | changeme123 |

⚠️ **Change passwords after first login!**

---

## Docker Commands

```bash
docker-compose up -d postgres    # Start database
docker-compose ps                # Check status
docker-compose logs postgres     # View logs
docker-compose down              # Stop database
docker-compose down -v           # Stop & remove data
```

For detailed database setup options, see [DATABASE_SETUP.md](DATABASE_SETUP.md).

---

## Team
Nour Benzarti, Farah Marnissi, Raef Lefi, Ilyes Fatnassi, Mohamed Aziz Touhami

**Supervisors:** dr Asma amdouni, Mrs. Ons Kharrat
