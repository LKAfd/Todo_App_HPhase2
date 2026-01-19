import { createAuthClient } from 'better-auth/react';

// Initialize the Better Auth client
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL || 'http://localhost:8000', // Update this to your backend URL
});

export const { signIn, signUp, signOut, useSession } = authClient;