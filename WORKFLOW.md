# Development Workflow Guide

## Overview

This document outlines the development workflow, coding standards, and best practices for the ISS Orange project.

## Table of Contents

1. [Git Workflow](#git-workflow)
2. [Branch Strategy](#branch-strategy)
3. [Commit Guidelines](#commit-guidelines)
4. [Code Review Process](#code-review-process)
5. [Testing Requirements](#testing-requirements)
6. [Code Standards](#code-standards)
7. [Database Migrations](#database-migrations)
8. [Deployment Process](#deployment-process)

## Git Workflow

### Daily Development Cycle

```bash
# Step 1: Start your day by updating local repository
git checkout dev
git pull origin dev

# Step 2: Create a feature branch
git checkout -b feature/issue-number-description

# Step 3: Make your changes
# Edit files, add features, fix bugs

# Step 4: Commit changes following conventions
git add .
git commit -m "feat: add user authentication module"

# Step 5: Push to remote
git push origin feature/issue-number-description

# Step 6: Create Pull Request on GitHub
# Step 7: After approval and merge, clean up
git checkout dev
git pull origin dev
git branch -d feature/issue-number-description
```

## Branch Strategy

### Main Branches

- **main**: Production-ready code only. Protected branch requiring reviews.
- **dev**: Integration branch for features. All features merge here first.

### Supporting Branches

- **feature/**: New features or enhancements
  - Format: `feature/issue-number-short-description`
  - Example: `feature/25-cv-upload-functionality`

- **fix/**: Bug fixes
  - Format: `fix/issue-number-short-description`
  - Example: `fix/32-login-validation-error`

- **docs/**: Documentation updates
  - Format: `docs/issue-number-short-description`
  - Example: `docs/18-api-documentation`

- **refactor/**: Code refactoring
  - Format: `refactor/description`
  - Example: `refactor/optimize-database-queries`

- **test/**: Test additions or modifications
  - Format: `test/description`
  - Example: `test/add-authentication-tests`

### Branch Naming Rules

- Use lowercase letters
- Separate words with hyphens
- Keep names concise but descriptive
- Always prefix with type
- Include issue number when applicable

## Commit Guidelines

### Commit Message Format

```
<type>: <subject>

<body>

<footer>
```

### Types

- **feat**: New feature
- **fix**: Bug fix
- **docs**: Documentation changes
- **style**: Code formatting (no logic change)
- **refactor**: Code restructuring
- **test**: Adding or modifying tests
- **chore**: Build process or auxiliary tool changes
- **perf**: Performance improvements

### Examples

```bash
# Feature addition
git commit -m "feat: implement AI ranking algorithm"

# Bug fix
git commit -m "fix: resolve null pointer in CV parser"

# Documentation
git commit -m "docs: update API endpoint documentation"

# With body
git commit -m "feat: add email notification service

Implemented NodeMailer integration for sending email notifications.
Supports registration confirmation and application status updates.

Closes #45"
```

### Commit Best Practices

- Write in imperative mood (add not added)
- Keep subject line under 50 characters
- Capitalize first letter of subject
- No period at end of subject
- Separate subject from body with blank line
- Wrap body at 72 characters
- Reference issues in footer

## Code Review Process

### Before Requesting Review

- [ ] Code compiles without errors
- [ ] All tests pass
- [ ] No linting errors
- [ ] Code is self-documented with comments
- [ ] New features have tests
- [ ] Documentation is updated
- [ ] No sensitive data in commits

### Pull Request Template

```markdown
## Description
Brief description of changes

## Type of Change
- [ ] Bug fix
- [ ] New feature
- [ ] Breaking change
- [ ] Documentation update

## Related Issue
Closes #(issue number)

## Testing
Describe testing performed

## Screenshots
If applicable

## Checklist
- [ ] Code follows style guidelines
- [ ] Self-review performed
- [ ] Comments added to complex code
- [ ] Documentation updated
- [ ] No new warnings generated
- [ ] Tests added and passing
```

### Review Checklist

Reviewers should verify:

- [ ] Code logic is correct
- [ ] No security vulnerabilities
- [ ] Performance is acceptable
- [ ] Error handling is proper
- [ ] Code is readable and maintainable
- [ ] Tests cover new functionality
- [ ] Documentation is clear

## Testing Requirements

### Unit Tests

Required for:
- All service methods
- Utility functions
- Business logic
- Data transformations

```typescript
// Example: Backend service test
describe('OffersService', () => {
  it('should create a new offer', async () => {
    const dto = { title: 'Test Offer', ... };
    const result = await service.create(dto);
    expect(result).toBeDefined();
    expect(result.title).toEqual(dto.title);
  });
});
```

### Integration Tests

Required for:
- API endpoints
- Database operations
- External service calls

```typescript
// Example: Backend E2E test
describe('/offers (POST)', () => {
  it('should create offer with valid data', () => {
    return request(app.getHttpServer())
      .post('/offers')
      .send({ title: 'Test', ... })
      .expect(201);
  });
});
```

### Frontend Tests

Required for:
- Component logic
- Service methods
- Form validation

```typescript
// Example: Component test
describe('LoginComponent', () => {
  it('should show error for invalid credentials', () => {
    component.loginForm.setValue({ email: 'test', password: '' });
    component.onSubmit();
    expect(component.errorMessage).toBeDefined();
  });
});
```

### Test Coverage Requirements

- Minimum 70% code coverage
- Critical paths: 100% coverage
- Run before every commit

```bash
# Backend
npm run test:cov

# Frontend
npm run test:coverage
```

## Code Standards

### TypeScript/JavaScript

```typescript
// Use descriptive variable names
const userAuthentication = new AuthService();

// Add JSDoc comments for public methods
/**
 * Validates user credentials and returns JWT token
 * @param email User email address
 * @param password User password
 * @returns JWT token string
 * @throws UnauthorizedException if credentials invalid
 */
async validateUser(email: string, password: string): Promise<string> {
  // Implementation
}

// Use interfaces for type safety
interface CreateOfferDto {
  title: string;
  description: string;
  requiredSkills: Skill[];
}

// Avoid magic numbers
const MAX_OFFERS_PER_CHIEF = 3;
const TOKEN_EXPIRATION_DAYS = 7;

// Use async/await over promises
async getUserData(id: string): Promise<User> {
  const user = await this.userRepository.findOne(id);
  return user;
}
```

### Python

```python
# Follow PEP 8 style guide
# Use type hints
def calculate_skill_match(
    required_skills: List[Skill],
    candidate_skills: List[str]
) -> float:
    """
    Calculate skill matching score between requirements and candidate.
    
    Args:
        required_skills: List of required skills with weights
        candidate_skills: List of skills from candidate CV
        
    Returns:
        Matching score between 0 and 100
    """
    # Implementation
    pass

# Use descriptive variable names
skill_match_score = calculate_skill_match(skills, cv_skills)

# Constants in uppercase
MAX_FILE_SIZE = 5 * 1024 * 1024
ALLOWED_EXTENSIONS = ['pdf', 'docx']
```

### Naming Conventions

**Backend (NestJS)**
- Classes: PascalCase (UserService, AuthController)
- Methods: camelCase (createUser, validateToken)
- Constants: UPPER_SNAKE_CASE (MAX_RETRIES)
- Interfaces: PascalCase with I prefix (IUserRepository)
- Files: kebab-case (user.service.ts, auth.controller.ts)

**Frontend (Angular)**
- Components: PascalCase (LoginComponent)
- Services: PascalCase (AuthService)
- Methods: camelCase (getUserData)
- Files: kebab-case (login.component.ts)

**Database**
- Tables: snake_case (user_profiles, internship_offers)
- Columns: snake_case (first_name, created_at)

## Database Migrations

### Creating Migrations

```bash
# Generate migration from entity changes
npm run typeorm migration:generate -- -n MigrationName

# Create empty migration
npm run typeorm migration:create -- -n MigrationName
```

### Running Migrations

```bash
# Run pending migrations
npm run typeorm migration:run

# Revert last migration
npm run typeorm migration:revert

# Show migration status
npm run typeorm migration:show
```

### Migration Best Practices

- One logical change per migration
- Always test migrations on dev database first
- Include both up and down methods
- Never modify existing migrations
- Add descriptive comments

```typescript
export class CreateUsersTable1234567890 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Create table
    await queryRunner.createTable(
      new Table({
        name: 'users',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            default: 'uuid_generate_v4()',
          },
          // Additional columns
        ],
      }),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Rollback changes
    await queryRunner.dropTable('users');
  }
}
```

## Deployment Process

### Pre-Deployment Checklist

- [ ] All tests passing
- [ ] Code reviewed and approved
- [ ] Documentation updated
- [ ] Environment variables configured
- [ ] Database migrations ready
- [ ] Backup created

### Deployment Steps

```bash
# 1. Pull latest changes
git checkout main
git pull origin main

# 2. Build application
npm run build

# 3. Run database migrations
npm run migration:run

# 4. Start application
npm run start:prod

# 5. Verify deployment
curl http://localhost:3000/health
```

### Docker Deployment

```bash
# Build and start services
docker-compose up -d --build

# Check service status
docker-compose ps

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

## Additional Resources

- [NestJS Documentation](https://docs.nestjs.com/)
- [Angular Style Guide](https://angular.io/guide/styleguide)
- [TypeORM Documentation](https://typeorm.io/)
- [Conventional Commits](https://www.conventionalcommits.org/)
- [Git Flow](https://nvie.com/posts/a-successful-git-branching-model/)

## Getting Help

- Check documentation first
- Search existing issues
- Ask in team chat
- Create detailed issue if problem persists

## Updates

This document is living and will be updated as the project evolves. Last updated: 2026-02-06
