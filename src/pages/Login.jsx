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

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../lib/api';
import './Auth.css';

export default function Login() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

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

      // Wait a moment for state to update, then redirect
      setTimeout(() => {
        navigate('/dashboard', { replace: true });
      }, 100);

    } catch (err) {
      // Display error from backend
      const errorMessage = err.response?.data?.message || err.message || 'Login failed';
      setError(errorMessage);
      console.error('Login error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Welcome Back</h1>
        <p className="auth-subtitle">Login to your account</p>

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
