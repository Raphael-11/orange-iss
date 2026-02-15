# Supabase Setup Guide

## Overview
This project uses Supabase as the PostgreSQL database only. We're not using Supabase Auth, Storage, or any other features - just the PostgreSQL database.

## Your Supabase Info
- **Project URL**: https://pexegznhienpfzllsczo.supabase.co
- **Project Ref**: pexegznhienpfzllsczo
- **Database Host**: db.pexegznhienpfzllsczo.supabase.co

## Setup Steps

### 1. Get Your Database Password

1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/project/pexegznhienpfzllsczo)
2. Click on **Settings** (gear icon in sidebar)
3. Click on **Database** in the settings menu
4. Scroll down to **Connection string** section
5. Click **Show password** or find the password you set when creating the project

### 2. Update Environment File

Open `backend/.env` and replace `YOUR_PASSWORD_HERE` with your actual database password:

```env
DATABASE_PASSWORD=your_actual_password
```

### 3. Test Connection

Run the backend:
```bash
cd backend
npm run start:dev
```

You should see database connection logs. If successful, you'll see:
```
[NestFactory] Starting Nest application...
[TypeOrmModule] dependencies initialized
```

### 4. Seed the Database

Create default user accounts:
```bash
npm run seed
```

## Database Structure

The application will automatically create these tables in your Supabase database:
- `users` - All user accounts
- `offers` - Internship offers
- `applications` - Student applications (coming soon)
- `evaluations` - Performance evaluations (coming soon)
- `notifications` - System notifications (coming soon)

## Viewing Your Data

You can view and manage your data in Supabase:
1. Go to your [Supabase Dashboard](https://supabase.com/dashboard/project/pexegznhienpfzllsczo)
2. Click on **Table Editor** in the sidebar
3. You'll see all your tables and data

## Notes

- ✅ Using: PostgreSQL database
- ❌ Not using: Supabase Auth (we use our own JWT auth)
- ❌ Not using: Supabase Storage
- ❌ Not using: Supabase Realtime
- ❌ Not using: Supabase Edge Functions

We're simply using Supabase as a hosted PostgreSQL database with our NestJS backend handling all the business logic.

## Connection Info

```
Host: db.pexegznhienpfzllsczo.supabase.co
Port: 5432
Database: postgres
User: postgres
Password: [Your password]
SSL: Required (automatically configured)
```

## Troubleshooting

**Connection timeout or refused:**
- Make sure you're using the correct password
- Check that SSL is enabled (it's automatic in our config)
- Verify your IP is not blocked in Supabase settings

**Tables not created:**
- The app creates tables automatically on first run (synchronize: true in development)
- Check the backend logs for any errors

**Can't see tables in Supabase:**
- Go to Table Editor in your Supabase dashboard
- Tables appear after the backend connects and creates them
