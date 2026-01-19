// Error handling utilities

// Generic error type for API responses
export interface ApiError {
  message: string;
  status?: number;
  details?: any;
}

// Error handling function
export const handleApiError = (error: any): ApiError => {
  if (error instanceof Error) {
    return {
      message: error.message,
      details: error.cause,
    };
  }

  if (typeof error === 'object' && error !== null) {
    return {
      message: error.message || 'An unknown error occurred',
      status: error.status,
      details: error,
    };
  }

  return {
    message: String(error),
  };
};

// Form validation utilities
export const validateEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePassword = (password: string): boolean => {
  // Password should be at least 8 characters
  return password.length >= 8;
};

export const validateUserName = (name: string): boolean => {
  // Username should be between 1 and 50 characters
  return name.length >= 1 && name.length <= 50;
};

// Format error message for display
export const formatErrorMessage = (error: ApiError): string => {
  if (error.status === 401) {
    return 'Unauthorized: Please log in again.';
  }
  if (error.status === 403) {
    return 'Access denied: You do not have permission to perform this action.';
  }
  if (error.status === 404) {
    return 'Resource not found.';
  }
  if (error.status === 500) {
    return 'Server error: Please try again later.';
  }
  return error.message || 'An unknown error occurred.';
};

// Debounce utility function
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  delay: number
): ((...args: Parameters<T>) => void) => {
  let timeoutId: NodeJS.Timeout;
  return (...args: Parameters<T>) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => func(...args), delay);
  };
};

// Format date for display
export const formatDate = (dateString: string): string => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  });
};