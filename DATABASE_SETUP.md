# Database Setup Options

You have **3 options** to set up the database. Choose the one that works best for you:

---

## Option 1: Docker (Easiest - Recommended)

If you have Docker Desktop installed:

1. **Start PostgreSQL with Docker Compose:**
   ```bash
   cd Orange_iss
   docker-compose up -d postgres
   ```

2. **Verify it's running:**
   ```bash
   docker-compose ps
   ```

3. **Your .env is already configured!** The backend/.env is set to:
   - Host: localhost
   - Port: 5432
   - User: postgres
   - Password: postgres
   - Database: iss_orange

4. **Start the backend:**
   ```bash
   cd backend
   npm run start:dev
   ```

5. **Seed default users:**
   ```bash
   npm run seed
   ```

---

## Option 2: Install PostgreSQL Locally

1. **Download PostgreSQL:**
   - Go to: https://www.postgresql.org/download/windows/
   - Download and install PostgreSQL 14 or higher
   - During installation, set password to: `postgres` (or update backend/.env)

2. **Create the database:**
   Open pgAdmin or Command Prompt and run:
   ```sql
   CREATE DATABASE iss_orange;
   ```

3. **Your .env is already configured!** 
   - If you used a different password during install, update `DATABASE_PASSWORD` in backend/.env

4. **Start the backend:**
   ```bash
   cd backend
   npm run start:dev
   ```

5. **Seed default users:**
   ```bash
   npm run seed
   ```

---

## Option 3: Use Supabase (Cloud Database)

If you want to use Supabase:

1. **Verify your Supabase project:**
   - Go to: https://supabase.com/dashboard
   - Check if project `pexegznhienpfzllsczo` exists and is not paused
   - If paused, click "Resume" or "Restore"

2. **Get your database password:**
   - Go to: Settings > Database
   - Find "Database password"
   - Copy it

3. **Update backend/.env:**
   ```env
   DATABASE_HOST=db.pexegznhienpfzllsczo.supabase.co
   DATABASE_PORT=6543
   DATABASE_USER=postgres.pexegznhienpfzllsczo
   DATABASE_PASSWORD=your_actual_password_here
   DATABASE_NAME=postgres
   ```
   
   **Note:** Use port **6543** (connection pooler) instead of 5432 for better performance.

4. **Alternative: Try connection pooler:**
   ```env
   DATABASE_HOST=aws-0-us-east-1.pooler.supabase.com
   DATABASE_PORT=6543
   DATABASE_USER=postgres.pexegznhienpfzllsczo
   DATABASE_PASSWORD=your_actual_password_here
   DATABASE_NAME=postgres
   ```

5. **Start the backend:**
   ```bash
   cd backend
   npm run start:dev
   ```

6. **Seed default users:**
   ```bash
   npm run seed
   ```

---

## Current Status

✅ Backend code is ready
✅ .env configured for **Option 1 or 2** (local database)
❌ Database not running yet

**Recommended:** Use **Option 1 (Docker)** if you have Docker Desktop, or **Option 2** if you prefer local installation.

## Quick Start - Run Full Project

### 1. Start Database (Docker)
```bash
cd Orange_iss
docker-compose up -d postgres
```

### 2. Start Backend
```bash
cd backend
npm run start:dev
# Wait for "Nest application successfully started"
npm run seed
```

### 3. Start Frontend
```bash
cd frontend
npm start
```

**Access:**
- Frontend: http://localhost:4200
- Backend API: http://localhost:3000/api

---

## View Database Contents

### Option A: Using Docker Command
```bash
# Connect to PostgreSQL in Docker container
docker exec -it iss_orange_db psql -U iss_user -d iss_orange

# Inside psql, run:
\dt                    # List all tables
SELECT * FROM users;   # View users
SELECT * FROM offers;  # View offers
\q                     # Exit
```

### Option B: Using pgAdmin (GUI)
1. Download: https://www.pgadmin.org/download/
2. Connect with:
   - Host: localhost
   - Port: 5432
   - Database: iss_orange
   - Username: iss_user
   - Password: changeme

### Option C: VS Code Extension
1. Install: **PostgreSQL** extension by Chris Kolkman
2. Connect with same credentials above
3. Browse tables visually

---

## Docker Commands

```bash
# Start database
docker-compose up -d postgres

# View running containers
docker-compose ps

# View logs
docker-compose logs postgres

# Stop database
docker-compose down

# Stop and remove data (fresh start)
docker-compose down -v

# Restart database
docker-compose restart postgres
```

---

## Troubleshooting

**"Connection refused" or "ECONNREFUSED":**
- Database is not running
- Use one of the options above

**"ENOTFOUND" (Supabase):**
- Project doesn't exist or is paused
- Check Supabase dashboard
- Or switch to local database (Options 1 or 2)

**"Authentication failed":**
- Wrong password in .env
- Update DATABASE_PASSWORD with correct value
