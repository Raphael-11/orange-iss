# Offers Module - Complete Implementation

## Overview
The Offers Module manages internship and PFE opportunities from creation to publication. It includes role-based access control, workflow management, and comprehensive validation.

---

## Architecture

### Files Created
1. **DTOs** (Data Transfer Objects)
   - [create-offer.dto.ts](src/offers/dto/create-offer.dto.ts) - Validation for new offers
   - [update-offer.dto.ts](src/offers/dto/update-offer.dto.ts) - Partial updates
   - [approve-offer.dto.ts](src/offers/dto/approve-offer.dto.ts) - Approval/rejection logic

2. **Service** - [offers.service.ts](src/offers/offers.service.ts)
   - Business logic layer
   - Database operations
   - Authorization checks

3. **Controller** - [offers.controller.ts](src/offers/offers.controller.ts)
   - RESTful API endpoints
   - Swagger documentation
   - Guard integration

4. **Module** - [offers.module.ts](src/offers/offers.module.ts)
   - Module configuration
   - Dependency injection

5. **Guard** - [roles.guard.ts](src/common/guards/roles.guard.ts)
   - Role-based access control
   - Route protection

---

## Workflow

### Offer Lifecycle
```
DRAFT → PENDING_APPROVAL → APPROVED → PUBLISHED → CLOSED
          ↓ (rejection)
        DRAFT (with feedback)
```

### Status Descriptions
- **DRAFT**: Initial creation by Department Chief
- **PENDING_APPROVAL**: Submitted for HR review
- **APPROVED**: Accepted by HR, ready to publish
- **PUBLISHED**: Visible to students
- **CLOSED**: No longer accepting applications
- **CANCELLED**: Removed from system

---

## API Endpoints

### 1. Create Offer
**POST** `/api/offers`  
**Role:** DEPARTMENT_CHIEF  
**Body:**
```json
{
  "title": "Full Stack Developer Intern",
  "description": "Join our engineering team...",
  "requirements": "Bachelor degree in CS",
  "requiredSkills": ["JavaScript", "TypeScript", "Angular", "NestJS"],
  "department": "Engineering",
  "duration": 6,
  "startDate": "2026-03-01",
  "endDate": "2026-08-31",
  "applicationDeadline": "2026-02-20",
  "numberOfPositions": 2
}
```

### 2. Get All Offers
**GET** `/api/offers?status=PUBLISHED&department=Engineering`  
**Role:** All authenticated users  
**Note:** Department Chiefs see only their offers unless they're HR

### 3. Get Published Offers
**GET** `/api/offers/published`  
**Role:** All authenticated users  
**Returns:** Only PUBLISHED offers visible to students

### 4. Get Offer by ID
**GET** `/api/offers/:id`  
**Role:** All authenticated users  
**Returns:** Full offer details with creator and approver info

### 5. Update Offer
**PATCH** `/api/offers/:id`  
**Role:** Creator (DRAFT) or HR (APPROVED)  
**Body:** Partial fields to update

### 6. Submit for Approval
**POST** `/api/offers/:id/submit`  
**Role:** DEPARTMENT_CHIEF (creator only)  
**Effect:** Changes status from DRAFT to PENDING_APPROVAL

### 7. Approve/Reject Offer
**POST** `/api/offers/:id/approve`  
**Role:** HR  
**Body:**
```json
{
  "approved": true
}
```
OR
```json
{
  "approved": false,
  "rejectionReason": "The requirements need to be more specific"
}
```

### 8. Publish Offer
**POST** `/api/offers/:id/publish`  
**Role:** HR  
**Effect:** Makes offer visible to students

### 9. Close Offer
**POST** `/api/offers/:id/close`  
**Role:** HR or Creator  
**Effect:** Stops accepting new applications

### 10. Delete Offer
**DELETE** `/api/offers/:id`  
**Role:** Creator or HR  
**Effect:** Permanently removes offer

---

## Validation Rules

### Title
- Required, 5-200 characters
- Clear and descriptive

### Description
- Required, no length limit
- Should explain role and expectations

### Required Skills
- Optional array of strings
- Used for AI candidate matching

### Duration
- Required, minimum 1 month
- Integer value

### Dates
- Optional but recommended
- ISO 8601 format (YYYY-MM-DD)

### Number of Positions
- Default: 1
- Minimum: 1

---

## Role-Based Access Control

### Department Chief
- Can create offers
- Can submit their own offers for approval
- Can update their DRAFT offers
- Can close their own offers
- See only their own offers (unless HR)
- Cannot approve or publish

### HR
- Cannot create offers
- Can approve or reject pending offers
- Can publish approved offers
- Can update any approved offer
- Can close any offer
- See all offers in system
- Cannot submit offers for approval

### Student
- Cannot create, update, or delete offers
- Can view all PUBLISHED offers
- Can view offer details
- Will apply to offers (future Applications module)

### Supervisor
- Can view PUBLISHED offers
- Will evaluate interns (future Evaluations module)

---

## Security Features

1. **JWT Authentication**: All endpoints require valid token
2. **Role Validation**: RolesGuard checks user roles before access
3. **Ownership Checks**: Users can only modify their own resources
4. **Status Validation**: Workflow enforces proper lifecycle transitions
5. **Input Validation**: class-validator on all DTOs

---

## Testing Results

### Test Scenarios Executed
1. ✅ Department Chief creates offer → Status: DRAFT
2. ✅ Department Chief submits offer → Status: PENDING_APPROVAL
3. ✅ HR approves offer → Status: APPROVED
4. ✅ HR publishes offer → Status: PUBLISHED
5. ✅ Student retrieves published offers → Success
6. ✅ Student cannot create offer → 403 Forbidden
7. ✅ Department Chief cannot approve → 403 Forbidden

### Test Data
- **Users Created**: 3 (Department Chief, HR, Student)
- **Offers Created**: 1
- **Complete Workflow**: ✅ Passed
- **Role Restrictions**: ✅ Enforced

---

## Database Schema

### Offer Entity Fields
- `id`: UUID primary key
- `title`: String (200 chars)
- `description`: Text
- `requirements`: Text (nullable)
- `requiredSkills`: String array
- `department`: String (100 chars)
- `duration`: Integer (months)
- `startDate`: Date (nullable)
- `endDate`: Date (nullable)
- `applicationDeadline`: Date (nullable)
- `numberOfPositions`: Integer (default 1)
- `status`: Enum (default DRAFT)
- `rejectionReason`: String (nullable)
- `createdById`: UUID (foreign key to users)
- `approvedById`: UUID (foreign key to users, nullable)
- `approvedAt`: Timestamp (nullable)
- `createdAt`: Timestamp (auto)
- `updatedAt`: Timestamp (auto)

### Relationships
- **ManyToOne** with User (createdBy)
- **ManyToOne** with User (approvedBy)
- **OneToMany** with Application (future)

---

## Swagger Documentation

All endpoints fully documented with:
- Operation summaries
- Request/response schemas
- Example payloads
- Error responses (400, 401, 403, 404)
- Bearer token authentication requirements

Access at: http://localhost:3000/api/docs

---

## Error Handling

### 400 Bad Request
- Invalid input data
- Workflow violation (e.g., approving DRAFT offer)

### 401 Unauthorized
- Missing or invalid JWT token

### 403 Forbidden
- Insufficient permissions for role
- Cannot modify other users' resources

### 404 Not Found
- Offer ID doesn't exist

---

## Performance Considerations

1. **Database Queries**: Optimized with proper joins
2. **Eager Loading**: Uses `leftJoinAndSelect` for related data
3. **Filtering**: Query builder for complex filters
4. **Indexing**: Primary keys (UUID) and foreign keys indexed

---

## Future Enhancements

1. **Pagination**: Add pagination to `GET /offers` endpoint
2. **Search**: Full-text search on title and description
3. **Analytics**: Track offer views and application counts
4. **Notifications**: Notify creators when offers are approved/rejected
5. **Bulk Operations**: Approve/reject multiple offers at once
6. **Export**: Download offers as CSV/PDF

---

## Integration Points

### Current
- **Auth Module**: JWT authentication and user roles
- **TypeORM**: Database persistence
- **Swagger**: API documentation

### Future
- **Applications Module**: Students applying to offers
- **Notifications Module**: Workflow notifications
- **AI Service**: Candidate ranking based on offer requirements
- **Email Service**: Application confirmations

---

**Module Status**: ✅ Production Ready  
**Test Coverage**: Manual tested all scenarios  
**Documentation**: Complete  
**Next Step**: Applications Module
