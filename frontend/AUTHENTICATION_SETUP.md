# Todo App - Authentication Setup

This project implements a complete authentication system using Better Auth with Next.js App Router.

## Features

- User registration (Sign Up)
- User login (Sign In)
- Session management
- Protected routes
- Responsive UI components

## Implementation Details

### Components

1. **AuthProvider** (`components/providers/AuthProvider.tsx`)
   - Custom React context that wraps Better Auth's functionality
   - Provides login, register, and logout methods
   - Manages authentication state

2. **Auth Pages**
   - `app/(auth)/sign-in/page.tsx` - Login form with validation
   - `app/(auth)/sign-up/page.tsx` - Registration form with validation
   - Both pages redirect to dashboard after successful authentication

3. **Layout Integration**
   - `app/layout.tsx` - Wraps the app with Better Auth's BaseProvider
   - Ensures authentication context is available throughout the app

### Configuration

- Better Auth client is configured with the backend API URL
- Authentication state is managed using Better Auth's React hooks
- Forms include proper validation and error handling

## How to Run

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. The app will be available at:
   - http://localhost:3000 (or http://localhost:3001 if port 3000 is in use)

## Environment Variables

Create a `.env.local` file in the frontend directory with:

```
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:8000
```

## Backend Integration

This frontend connects to a backend API that handles:
- User registration and authentication
- JWT token generation and validation
- User data management

The backend should be running on the configured URL for full functionality.