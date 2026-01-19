import { getToken } from './auth';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:8000';

interface ApiOptions {
  method?: string;
  headers?: Record<string, string>;
  body?: any;
}

export class ApiClient {
  private baseUrl: string;

  constructor(baseUrl?: string) {
    this.baseUrl = baseUrl || API_BASE_URL;
  }

  private async request<T>(endpoint: string, options: ApiOptions = {}): Promise<T> {
    const { method = 'GET', headers = {}, body } = options;

    // Prepare headers
    const requestHeaders: Record<string, string> = {
      'Content-Type': 'application/json',
      ...headers,
    };

    // Add JWT token if available
    const token = getToken();
    if (token) {
      requestHeaders['Authorization'] = `Bearer ${token}`;
    }

    // Prepare request config
    const config: RequestInit = {
      method,
      headers: requestHeaders,
    };

    // Add body if provided
    if (body) {
      config.body = typeof body === 'string' ? body : JSON.stringify(body);
    }

    try {
      const response = await fetch(`${this.baseUrl}${endpoint}`, config);

      // Handle token expiration or invalid token
      if (response.status === 401) {
        // Optionally clear the token and redirect to login
        // removeToken(); // Import this from auth.ts if needed
        throw new Error('Unauthorized: Please log in again');
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Some endpoints might not return JSON (like DELETE)
      const contentType = response.headers.get('content-type');
      if (contentType && contentType.includes('application/json')) {
        return await response.json();
      } else {
        return await response.text() as unknown as T;
      }
    } catch (error) {
      console.error(`API request failed: ${method} ${endpoint}`, error);
      throw error;
    }
  }

  // Authentication endpoints
  async signup(userData: { email: string; password: string; name: string }) {
    return this.request('/api/auth/signup', {
      method: 'POST',
      body: userData,
    });
  }

  async signin(credentials: { email: string; password: string }) {
    return this.request('/api/auth/signin', {
      method: 'POST',
      body: credentials,
    });
  }

  async signout() {
    return this.request('/api/auth/signout', {
      method: 'POST',
    });
  }

  // Task endpoints
  async getTasks() {
    return this.request('/api/tasks');
  }

  async createTask(taskData: { title: string; description?: string; completed?: boolean }) {
    return this.request('/api/tasks', {
      method: 'POST',
      body: taskData,
    });
  }

  async updateTask(taskId: string | number, taskData: Partial<{ title: string; description?: string; completed?: boolean }>) {
    return this.request(`/api/tasks/${taskId}`, {
      method: 'PUT',
      body: taskData,
    });
  }

  async deleteTask(taskId: string | number) {
    return this.request(`/api/tasks/${taskId}`, {
      method: 'DELETE',
    });
  }

  async toggleTask(taskId: string | number) {
    return this.request(`/api/tasks/${taskId}/toggle`, {
      method: 'PATCH',
    });
  }
}

// Create a singleton instance
export const apiClient = new ApiClient();

// Export individual methods for convenience
export const {
  signup,
  signin,
  signout,
  getTasks,
  createTask,
  updateTask,
  deleteTask,
  toggleTask
} = apiClient;