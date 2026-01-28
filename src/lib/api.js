/**
 * API Service Layer - Axios Configuration
 * 
 * This file centralizes all API communication
 * - Configures axios instance with base URL
 * - Adds JWT token to all requests automatically
 * - Handles errors globally
 * - Provides methods for auth and user endpoints
 */

import axios from 'axios';

// Create axios instance with default configuration
const api = axios.create({
  baseURL: 'http://localhost:5000/api',
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json'
  }
});

/**
 * Request Interceptor
 * Runs BEFORE every request
 * Adds JWT token from localStorage to Authorization header
 */
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    
    // If token exists, add it to request header
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => Promise.reject(error)
);

/**
 * Response Interceptor
 * Runs AFTER every response
 * Handles token expiration and redirects to login
 */
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // If 401 Unauthorized, token is invalid/expired
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login (done in component)
      window.location.href = '/login';
    }
    
    return Promise.reject(error);
  }
);

/**
 * Authentication API Calls
 */

// Register new user
export const registerUser = (email, password, name) => {
  return api.post('/auth/register', { email, password, name });
};

// Login user
export const loginUser = (email, password) => {
  return api.post('/auth/login', { email, password });
};

/**
 * User API Calls (Protected)
 */

// Get dashboard data
export const getDashboard = () => {
  return api.get('/user/dashboard');
};

// Health check
export const checkHealth = () => {
  return api.get('/health');
};

export default api;
