// User entity type definition
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

// Task entity type definition
export interface Task {
  id: string | number;
  title: string;
  description?: string;
  completed: boolean;
  userId: string | number;
  createdAt: Date;
  updatedAt: Date;
}

// Task creation input type
export interface CreateTaskInput {
  title: string;
  description?: string;
  completed?: boolean;
}

// Task update input type
export interface UpdateTaskInput {
  title?: string;
  description?: string;
  completed?: boolean;
}

// Authentication types
export interface AuthCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
}

export interface AuthResponse {
  success: boolean;
  user: User;
  token: string;
}

// API response types
export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Context types
export interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: AuthCredentials) => Promise<void>;
  logout: () => Promise<void>;
  register: (userData: SignupData) => Promise<void>;
}

// Form types
export interface TaskFormData {
  title: string;
  description?: string;
  completed?: boolean;
}

export interface LoginFormValues {
  email: string;
  password: string;
}

export interface RegisterFormValues {
  email: string;
  password: string;
  name: string;
}