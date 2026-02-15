# ISS Orange Backend API

## Overview

NestJS-based RESTful API server for the ISS Orange platform. Handles authentication, business logic, database operations, and AI service integration.

## Technology Stack

- **Framework:** NestJS 10.x
- **Language:** TypeScript 5.x
- **Database ORM:** TypeORM 0.3.x
- **Database:** PostgreSQL 14
- **Authentication:** JWT with Passport
- **Validation:** class-validator & class-transformer
- **Documentation:** Swagger/OpenAPI
- **Testing:** Jest

## Project Structure

```
src/
├── auth/                    # Authentication module
│   ├── strategies/          # Passport strategies (JWT, Local)
│   ├── guards/              # Auth guards
│   ├── dto/                 # Data Transfer Objects
│   └── auth.service.ts      # Auth business logic
├── users/                   # User management module
│   ├── entities/            # User entity
│   ├── dto/                 # User DTOs
│   └── users.service.ts     # User business logic
├── offers/                  # Offer management module
│   ├── entities/            # Offer entity
│   ├── dto/                 # Offer DTOs
│   └── offers.service.ts    # Offer business logic
├── applications/            # Application handling module
│   ├── entities/            # Application entity
│   ├── dto/                 # Application DTOs
│   └── applications.service.ts
├── ai-ranking/              # AI integration module
│   └── ai-ranking.service.ts
├── evaluations/             # Evaluation module
│   ├── entities/            # Evaluation entity
│   └── evaluations.service.ts
├── notifications/           # Notification system
│   └── notifications.service.ts
├── common/                  # Shared resources
│   ├── decorators/          # Custom decorators
│   ├── enums/               # Enums and constants
│   ├── filters/             # Exception filters
│   ├── guards/              # Global guards
│   └── interceptors/        # HTTP interceptors
├── config/                  # Configuration files
│   └── typeorm.config.ts    # Database configuration
├── migrations/              # Database migrations
├── app.module.ts            # Root module
├── app.controller.ts        # Root controller
├── app.service.ts           # Root service
└── main.ts                  # Application entry point
```

## Setup Instructions

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0
- PostgreSQL >= 14

### Installation

```bash
# Install dependencies
npm install

# Copy environment file
cp ../.env.example ../.env

# Edit .env with your configuration
```

### Database Setup

```bash
# Create database
createdb iss_orange

# Or using SQL
psql -U postgres
CREATE DATABASE iss_orange;
CREATE USER iss_user WITH PASSWORD 'your_password';
GRANT ALL PRIVILEGES ON DATABASE iss_orange TO iss_user;
```

### Run Migrations

```bash
# Generate migration from entities
npm run migration:generate -- -n InitialSchema

# Run migrations
npm run migration:run

# Revert last migration
npm run migration:revert
```

### Development

```bash
# Start development server with hot reload
npm run start:dev

# The server will start on http://localhost:3000
# API documentation available at http://localhost:3000/api/docs
```

### Building

```bash
# Build for production
npm run build

# Run production build
npm run start:prod
```

## Testing

```bash
# Run unit tests
npm test

# Run unit tests in watch mode
npm run test:watch

# Generate coverage report
npm run test:cov

# Run e2e tests
npm run test:e2e
```

## Code Quality

```bash
# Lint code
npm run lint

# Format code
npm run format
```

## API Documentation

Once the server is running, access Swagger documentation at:

```
http://localhost:3000/api/docs
```

## Environment Variables

Required environment variables (see `.env.example`):

```env
# Database
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_NAME=iss_orange
DATABASE_USER=iss_user
DATABASE_PASSWORD=your_password

# Application
PORT=3000
NODE_ENV=development

# JWT
JWT_SECRET=your_secret_key
JWT_EXPIRATION=7d

# Frontend
FRONTEND_URL=http://localhost:4200

# AI Service
AI_SERVICE_URL=http://localhost:5000
```

## Module Development Guide

### Creating a New Module

```bash
# Generate complete CRUD resource
nest g resource module-name

# Generate individual components
nest g module module-name
nest g controller module-name
nest g service module-name
```

###Adding Authentication to Routes

```typescript
import { UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/auth/guards/jwt-auth.guard';
import { RolesGuard } from '@/auth/guards/roles.guard';
import { Roles } from '@/common/decorators';
import { UserRole } from '@/common/enums';

@Controller('offers')
@UseGuards(JwtAuthGuard, RolesGuard)
export class OffersController {
  @Post()
  @Roles(UserRole.DEPARTMENT_CHIEF)
  createOffer() {
    // Only department chiefs can access
  }
}
```

### Creating DTOs with Validation

```typescript
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateOfferDto {
  @ApiProperty({ description: 'Offer title', example: 'Full Stack Development Internship' })
  @IsString()
  @IsNotEmpty()
  @MinLength(10)
  title: string;
}
```

## Common Commands

```bash
# Generate migration
npm run typeorm migration:generate -- -n MigrationName

# Run migrations
npm run typeorm migration:run

# Revert migration
npm run typeorm migration:revert

# Check migration status
npm run typeorm migration:show

# Create empty migration
npm run typeorm migration:create -- -n MigrationName
```

## Troubleshooting

### Port Already in Use

```bash
# Kill process on port 3000 (Linux/Mac)
lsof -ti:3000 | xargs kill -9

# Kill process on port 3000 (Windows)
netstat -ano | findstr :3000
taskkill /PID <PID> /F
```

### Database Connection Issues

1. Verify PostgreSQL is running
2. Check DATABASE_* environment variables
3. Ensure database exists
4. Verify user permissions

### Migration Errors

```bash
# Drop all tables and start fresh (DEVELOPMENT ONLY)
npm run typeorm schema:drop

# Run migrations again
npm run typeorm migration:run
```

## Best Practices

1. **Always use DTOs** for request validation
2. **Document all endpoints** with Swagger decorators
3. **Write tests** for all services and controllers
4. **Use decorators** for common functionality (auth, validation)
5. **Follow naming conventions** (see WORKFLOW.md)
6. **Keep services thin** - business logic in services, not controllers
7. **Use transactions** for multi-step database operations
8. **Handle errors properly** with exception filters
9. **Log important events** for debugging
10. **Never commit sensitive data** (.env files)

## Contributing

See [WORKFLOW.md](../WORKFLOW.md) for development workflow and coding standards.

## Support

For issues or questions:
- Check this README
- Review API documentation
- Create GitHub issue
- Contact development team
