'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useSession, signIn, signOut } from '@/lib/better-auth-client';
import { User } from '@/lib/types';
import { storeToken, removeToken } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const { data: session, isPending } = useSession();
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Sync better-auth state with our context
  useEffect(() => {
    if (session !== undefined) {
      setIsLoading(false);
      setIsAuthenticated(!!session);

      // Store token in localStorage if available
      if (session?.token) {
        storeToken(session.token);
      }
    } else {
      setIsLoading(isPending);
      setIsAuthenticated(false);
    }
  }, [session, isPending]);

  const login = async (email: string, password: string) => {
    try {
      const result = await signIn('credential', {
        email,
        password,
        callbackURL: '/dashboard',
        fetchOptions: {
          redirect: 'manual',
        },
      });

      if (result?.error) {
        throw new Error(result.error || 'Login failed');
      }
    } catch (error) {
      console.error('Login failed:', error);
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const result = await signIn('register', {
        email,
        password,
        name,
        callbackURL: '/dashboard',
        fetchOptions: {
          redirect: 'manual',
        },
      });

      if (result?.error) {
        throw new Error(result.error || 'Registration failed');
      }
    } catch (error) {
      console.error('Registration failed:', error);
      throw error;
    }
  };

  const logout = async () => {
    try {
      await signOut({
        callbackURL: '/',
        fetchOptions: {
          redirect: 'manual',
        },
      });
      removeToken(); // Clean up token on logout
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const value = {
    user: session?.user as User | null,
    isAuthenticated,
    isLoading,
    login,
    logout,
    register,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

// Export the context for direct use if needed
export { AuthContext };

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};