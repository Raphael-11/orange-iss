# Orange ISS Frontend

Angular 17 frontend application for the Orange Internship and PFE Management Platform.

## Technology Stack

- **Angular**: 17.x with standalone components
- **TypeScript**: 5.3
- **SCSS**: For styling with Orange brand colors
- **RxJS**: For reactive programming

## Project Structure

```
src/
├── app/
│   ├── core/                    # Core functionality (singleton services, guards, interceptors)
│   │   ├── guards/              # Route guards
│   │   │   ├── auth.guard.ts    # Authentication and role-based access
│   │   │   └── index.ts
│   │   ├── interceptors/        # HTTP interceptors
│   │   │   ├── auth.interceptor.ts    # Add JWT token to requests
│   │   │   ├── error.interceptor.ts   # Global error handling
│   │   │   └── index.ts
│   │   └── services/            # Core services
│   │       ├── auth.service.ts        # Authentication logic
│   │       ├── api.service.ts         # Base HTTP service
│   │       ├── local-storage.service.ts  # Type-safe storage wrapper
│   │       └── index.ts
│   ├── features/                # Feature modules
│   │   ├── public/              # Public pages
│   │   │   └── home/            # Landing page
│   │   ├── auth/                # Authentication pages
│   │   │   ├── login/           # Login component
│   │   │   ├── register/        # Registration component
│   │   │   └── auth.routes.ts
│   │   ├── student/             # Student portal
│   │   │   ├── offers/          # Browse and view offers
│   │   │   ├── applications/    # Manage applications
│   │   │   ├── profile/         # Student profile
│   │   │   ├── student-dashboard.component.ts
│   │   │   └── student.routes.ts
│   │   ├── chief/               # Department Chief portal
│   │   │   ├── offers/          # Create and manage offers
│   │   │   ├── applications/    # Review applications
│   │   │   ├── rankings/        # View AI rankings
│   │   │   ├── profile/         # Chief profile
│   │   │   ├── chief-dashboard.component.ts
│   │   │   └── chief.routes.ts
│   │   ├── hr/                  # HR portal
│   │   │   ├── offers/          # Manage all offers
│   │   │   ├── applications/    # Review all applications
│   │   │   ├── candidates/      # Manage candidates
│   │   │   ├── reports/         # Generate reports
│   │   │   ├── profile/         # HR profile
│   │   │   ├── hr-dashboard.component.ts
│   │   │   └── hr.routes.ts
│   │   └── supervisor/          # Supervisor portal
│   │       ├── interns/         # Manage assigned interns
│   │       ├── evaluations/     # Create and view evaluations
│   │       ├── profile/         # Supervisor profile
│   │       ├── supervisor-dashboard.component.ts
│   │       └── supervisor.routes.ts
│   ├── models/                  # TypeScript interfaces and types
│   │   ├── user.model.ts
│   │   ├── offer.model.ts
│   │   ├── application.model.ts
│   │   ├── ranking.model.ts
│   │   └── common.model.ts
│   ├── shared/                  # Shared components, directives, pipes
│   │   └── components/
│   │       ├── loading-spinner/
│   │       ├── empty-state/
│   │       └── index.ts
│   ├── app.component.ts         # Root component
│   ├── app.routes.ts            # Root routing configuration
│   └── app.config.ts            # Application configuration
├── environments/                # Environment configurations
│   ├── environment.ts           # Development
│   └── environment.prod.ts      # Production
├── styles/                      # Global styles
│   ├── styles.scss              # Main stylesheet
│   └── _variables.scss          # SCSS variables (Orange colors, spacing, etc.)
├── index.html                   # HTML entry point
└── main.ts                      # Application bootstrap

```

## Key Features

### Architecture
- **Standalone Components**: Using Angular 17's standalone component architecture
- **Lazy Loading**: Feature modules are lazy-loaded for optimal performance
- **Route Guards**: Authentication and role-based access control
- **HTTP Interceptors**: Automatic JWT injection and error handling
- **Path Aliases**: Clean imports using TypeScript path mapping

### Authentication Flow
1. User logs in through LoginComponent
2. AuthService handles authentication and stores JWT token
3. AuthGuard protects routes requiring authentication
4. AuthInterceptor adds JWT token to all HTTP requests
5. ErrorInterceptor handles 401/403 responses globally

### Routing Structure
- `/` - Home page (public)
- `/auth/login` - Login page
- `/auth/register` - Registration page
- `/student/*` - Student portal (requires STUDENT role)
- `/chief/*` - Department Chief portal (requires DEPARTMENT_CHIEF role)
- `/hr/*` - HR portal (requires HR role)
- `/supervisor/*` - Supervisor portal (requires SUPERVISOR role)

### State Management
- **AuthService**: Manages user authentication state using BehaviorSubject
- **LocalStorageService**: Type-safe localStorage wrapper for persistence
- **RxJS Observables**: Reactive state management throughout the application

## Development

### Prerequisites
- Node.js 18.x or higher
- npm 9.x or higher

### Install Dependencies
```bash
cd frontend
npm install
```

### Development Server
```bash
npm start
```
Navigate to `http://localhost:4200`. The application will automatically reload if you change any source files.

### Build
```bash
npm run build
```
Build artifacts will be stored in the `dist/` directory.

### Production Build
```bash
npm run build:prod
```
Creates an optimized production build with AOT compilation.

### Linting
```bash
npm run lint
```

## Environment Configuration

The application uses environment files for configuration:

### Development (`environment.ts`)
- API URL: `http://localhost:3000/api`
- Production flag: `false`

### Production (`environment.prod.ts`)
- API URL: `https://api.production.com/api`
- Production flag: `true`

## Styling Guidelines

### Orange Brand Colors
The application uses Orange's corporate colors defined in `_variables.scss`:
- Primary Orange: `#ff7900`
- Dark Orange: `#cc5200`
- Light Orange: `#ffb380`

### Component Styling
- Use SCSS for component styles
- Follow BEM naming convention for CSS classes
- Utilize CSS custom properties (variables) for consistency
- Mobile-first responsive design

### Common Classes
- `.btn`, `.btn-primary`, `.btn-outline` - Button styles
- `.form-control`, `.form-group` - Form elements
- `.card`, `.content-card` - Card containers
- `.badge` - Status badges

## Code Style Guidelines

### TypeScript
- Strict mode enabled
- Explicit return types for functions
- Interface over type when possible
- Use readonly for immutable properties

### Component Structure
1. Imports
2. Component decorator with metadata
3. Class definition
4. Properties (public, then private)
5. Constructor with dependency injection using `inject()`
6. Lifecycle hooks (OnInit, OnDestroy, etc.)
7. Public methods
8. Private methods

### Comments
- JSDoc comments for all public methods and services
- Inline comments for complex logic only
- No emoji in comments
- Clear, professional documentation

## API Integration

### ApiService
Base HTTP service with methods for all REST operations:
- `get<T>(endpoint, params?)`: GET request
- `post<T>(endpoint, body)`: POST request
- `put<T>(endpoint, body)`: PUT request
- `patch<T>(endpoint, body)`: PATCH request
- `delete<T>(endpoint)`: DELETE request
- `upload<T>(endpoint, formData)`: File upload

### Usage Example
```typescript
import { ApiService } from '@core/services/api.service';

export class MyService {
  private api = inject(ApiService);

  getOffers() {
    return this.api.get<Offer[]>('offers');
  }

  createOffer(offer: Offer) {
    return this.api.post<Offer>('offers', offer);
  }
}
```

## Testing

### Unit Tests
```bash
npm test
```

### End-to-End Tests
```bash
npm run e2e
```

## Deployment

### Docker
The frontend is containerized and can be built using Docker:
```bash
docker build -t orange-iss-frontend .
docker run -p 4200:80 orange-iss-frontend
```

### Production Deployment
1. Build the production bundle
2. Deploy the `dist/` folder to your web server
3. Configure server to serve `index.html` for all routes
4. Set up environment variables for API URL

## Troubleshooting

### Common Issues

**Issue**: Module not found errors
**Solution**: Check TypeScript path aliases in `tsconfig.json` and ensure imports use the correct alias

**Issue**: HTTP requests failing
**Solution**: Verify API URL in environment file and check CORS configuration on backend

**Issue**: Authentication not working
**Solution**: Check JWT token in localStorage and verify AuthInterceptor is configured in `app.config.ts`

## Future Enhancements

- [ ] Add unit tests for all components and services
- [ ] Implement e2e tests with Cypress
- [ ] Add progressive web app (PWA) support
- [ ] Implement internationalization (i18n)
- [ ] Add accessibility improvements (WCAG 2.1)
- [ ] Optimize bundle size with tree-shaking
- [ ] Add service worker for offline support

## Contributing

Please follow the established project structure and coding guidelines. All code must:
- Pass linting checks
- Include appropriate comments
- Follow TypeScript best practices
- Be mobile-responsive
- Match the Orange brand styling

## License

Proprietary - Orange Digital Center
