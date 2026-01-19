# Quickstart Guide: Todo Frontend Application

## Prerequisites
- Node.js 18+ installed
- Access to FastAPI backend service
- Better Auth configured for authentication

## Setup Instructions

1. **Clone and Install Dependencies**
   ```bash
   git clone <repository-url>
   cd frontend
   npm install
   ```

2. **Environment Configuration**
   ```bash
   cp .env.example .env.local
   # Update environment variables:
   NEXT_PUBLIC_API_BASE_URL=<backend-api-url>
   NEXTAUTH_SECRET=<secret-for-auth>
   ```

3. **Run Development Server**
   ```bash
   npm run dev
   # Application will be available at http://localhost:3000
   ```

## Key Features Walkthrough

1. **Authentication Flow**
   - Navigate to `/sign-up` to create an account
   - Use `/sign-in` to log in with existing credentials
   - Session persists via JWT token stored securely

2. **Task Management**
   - Visit `/dashboard` or `/tasks` to manage your tasks
   - Create new tasks using the "Add Task" button
   - Toggle task completion status with checkboxes
   - Edit or delete existing tasks

3. **Responsive Design**
   - Application adapts to mobile and desktop screens
   - Touch-friendly controls for mobile users
   - Consistent experience across devices

## Development Commands

```bash
# Run development server
npm run dev

# Run tests
npm run test
npm run test:e2e

# Build for production
npm run build

# Lint code
npm run lint

# Format code
npm run format
```

## Troubleshooting

- **Authentication Issues**: Verify backend API is accessible and credentials are correct
- **API Connection**: Check that NEXT_PUBLIC_API_BASE_URL is properly configured
- **Token Expiry**: Application handles token refresh automatically
- **UI Responsiveness**: All components are designed with mobile-first approach