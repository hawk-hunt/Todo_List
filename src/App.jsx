import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import './App.css'

/**
 * Main App Component
 * 
 * Handles routing:
 * - /login - Public login page
 * - /register - Public registration page
 * - /dashboard - Protected dashboard (requires JWT)
 * - / - Redirects to dashboard if logged in, otherwise to login
 * 
 * JWT Authentication Flow:
 * 1. User registers or logs in
 * 2. Backend returns JWT token
 * 3. Frontend saves token to localStorage
 * 4. Dashboard checks for token and fetches user data
 * 5. Axios interceptor sends token with protected requests
 */

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);

  /**
   * Check if user is logged in on app mount
   * Checks if JWT token exists in localStorage
   */
  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(!!token);
    setLoading(false);

    // Listen for storage changes (token added/removed)
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      setIsLoggedIn(!!newToken);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  if (loading) {
    return <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>Loading...</div>;
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route 
        path="/login" 
        element={<Login />} 
      />
      
      <Route 
        path="/register" 
        element={<Register />} 
      />

      {/* Protected Routes */}
      <Route 
        path="/dashboard" 
        element={<Dashboard />} 
      />

      {/* Default route */}
      <Route 
        path="/" 
        element={<Navigate to="/login" replace />} 
      />

      {/* Catch all - redirect to home */}
      <Route 
        path="*" 
        element={<Navigate to="/login" replace />} 
      />
    </Routes>
  )
}

export default App
