/**
 * Login Component
 * 
 * User authentication form with:
 * - Email and password fields
 * - Backend validation
 * - JWT token storage
 * - Error handling
 * - Navigation to dashboard
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser, checkHealth } from '../lib/api';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();
  const [backendStatus, setBackendStatus] = useState('checking...');

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  /**
   * Check backend health on mount
   */
  useEffect(() => {
    const checkBackend = async () => {
      try {
        await checkHealth();
        setBackendStatus('connected');
      } catch (err) {
        setBackendStatus('offline');
      }
    };

    checkBackend();
    // Check every 10 seconds
    const interval = setInterval(checkBackend, 10000);
    return () => clearInterval(interval);
  }, []);

  /**
   * Handle input change
   * Updates form state as user types
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error message when user starts typing
    if (error) setError('');
  };

  /**
   * Handle login submission
   * 
   * Process:
   * 1. Send email and password to backend
   * 2. Backend finds user and verifies password with bcrypt
   * 3. Backend generates JWT token with user ID
   * 4. Frontend saves JWT to localStorage
   * 5. Frontend redirects to dashboard
   * 
   * For subsequent requests:
   * - Axios interceptor automatically adds JWT to Authorization header
   * - Backend middleware verifies JWT
   * - User data is extracted from JWT payload
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Basic client-side validation
    if (!formData.email.trim() || !formData.password) {
      setError('Please provide email and password');
      setLoading(false);
      return;
    }

    try {
      // Send login request to backend
      // Backend will:
      // 1. Find user by email
      // 2. Compare password with bcrypt hash
      // 3. Generate JWT token
      // 4. Return token
      const response = await loginUser(formData.email, formData.password);

      // Save JWT token to localStorage
      // Axios interceptor will add this to all future requests
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Dispatch event to notify App component of login success
      // This updates isLoggedIn state in App.jsx
      window.dispatchEvent(new Event('login-success'));

      // Redirect to dashboard (with slight delay to ensure state updates)
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 100);

    } catch (err) {
      // Display error from backend
      let errorMessage = 'Login failed';
      
      if (err.response) {
        // Backend responded with error
        errorMessage = err.response.data?.message || `Server error (${err.response.status})`;
      } else if (err.request) {
        // Request was made but no response
        errorMessage = 'Network error - Unable to reach server. Make sure backend is running on port 5000.';
      } else if (err.message) {
        // Error in request setup
        errorMessage = err.message;
      }
      
      setError(errorMessage);
      console.error('Login error:', {
        message: err.message,
        response: err.response?.status,
        data: err.response?.data,
        request: !!err.request
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Login to your account</p>

        {/* Backend Status */}
        <div style={{
          padding: '8px 12px',
          marginBottom: '16px',
          borderRadius: '4px',
          fontSize: '12px',
          backgroundColor: backendStatus === 'connected' ? '#dcfce7' : '#fee2e2',
          color: backendStatus === 'connected' ? '#166534' : '#991b1b',
          textAlign: 'center'
        }}>
          Backend: <strong>{backendStatus === 'connected' ? '✓ Connected' : '✗ Offline'}</strong>
        </div>

        {/* Error message */}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Login form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Email field */}
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              disabled={loading}
              required
            />
          </div>

          {/* Password field */}
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              disabled={loading}
              required
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        {/* Link to registration */}
        <p className="auth-link">
          Don't have an account?{' '}
          <a href="/register">Create one here</a>
        </p>
      </div>
    </div>
  );
}
