import { useState, useEffect } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Statistics from './pages/Statistics'
import Profile from './pages/Profile'
import Settings from './pages/Settings'
import Teams from './pages/Teams'
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
    // This handles: logout, login from other tabs, etc
    const handleStorageChange = () => {
      const newToken = localStorage.getItem('token');
      setIsLoggedIn(!!newToken);
    };

    // Also listen for custom event from Login component
    // This handles immediate redirect after login in same tab
    const handleLoginSuccess = () => {
      const newToken = localStorage.getItem('token');
      setIsLoggedIn(!!newToken);
    };

    window.addEventListener('storage', handleStorageChange);
    window.addEventListener('login-success', handleLoginSuccess);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('login-success', handleLoginSuccess);
    };
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

      {/* Protected Routes - Only accessible if logged in */}
      <Route 
        path="/dashboard" 
        element={isLoggedIn ? <Dashboard /> : <Navigate to="/login" replace />} 
      />

      <Route 
        path="/statistics" 
        element={isLoggedIn ? <Statistics /> : <Navigate to="/login" replace />} 
      />

      <Route 
        path="/profile" 
        element={isLoggedIn ? <Profile /> : <Navigate to="/login" replace />} 
      />

      <Route 
        path="/settings" 
        element={isLoggedIn ? <Settings /> : <Navigate to="/login" replace />} 
      />

      <Route 
        path="/teams" 
        element={isLoggedIn ? <Teams /> : <Navigate to="/login" replace />} 
      />

      {/* Default route - Redirect to dashboard if logged in, login if not */}
      <Route 
        path="/" 
        element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
      />

      {/* Catch all - redirect based on login status */}
      <Route 
        path="*" 
        element={isLoggedIn ? <Navigate to="/dashboard" replace /> : <Navigate to="/login" replace />} 
      />
    </Routes>
  )
}

export default App
