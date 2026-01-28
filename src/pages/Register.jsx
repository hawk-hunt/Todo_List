/**
 * Register Component
 * 
 * User registration form with:
 * - Form validation
 * - Error display
 * - Loading state
 * - Axios integration
 * - Navigation to login after success
 */

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../lib/api';
import './Auth.css';

export default function Register() {
  const navigate = useNavigate();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  /**
   * Handle form input changes
   * Updates form state as user types
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when user starts typing
    if (error) setError('');
  };

  /**
   * Handle form submission
   * 
   * Process:
   * 1. Validate form data on client side
   * 2. Send to backend via registerUser API
   * 3. Backend validates and saves to MongoDB
   * 4. Backend returns JWT token
   * 5. Save token and redirect to dashboard
   */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    // Client-side validation
    if (!formData.name.trim()) {
      setError('Please provide your name');
      setLoading(false);
      return;
    }

    if (!formData.email.trim()) {
      setError('Please provide your email');
      setLoading(false);
      return;
    }

    if (!formData.password) {
      setError('Please provide a password');
      setLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters');
      setLoading(false);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      setLoading(false);
      return;
    }

    try {
      // Send registration request to backend
      // Backend will:
      // 1. Validate fields
      // 2. Check if email exists
      // 3. Hash password
      // 4. Save user to MongoDB
      // 5. Return JWT token
      const response = await registerUser(
        formData.email,
        formData.password,
        formData.name
      );

      // Successful registration
      setSuccess('Registration successful! Redirecting...');
      
      // Save token and user info
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));

      // Redirect to dashboard after 1 second
      setTimeout(() => {
        navigate('/dashboard');
      }, 1000);

    } catch (err) {
      // Error from backend
      const errorMessage = err.response?.data?.message || 'Registration failed';
      setError(errorMessage);
      console.error('Registration error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Create Account</h1>
        <p className="auth-subtitle">Join us today</p>

        {/* Error message display */}
        {error && <div className="alert alert-error">{error}</div>}

        {/* Success message display */}
        {success && <div className="alert alert-success">{success}</div>}

        {/* Registration form */}
        <form onSubmit={handleSubmit} className="auth-form">
          {/* Name field */}
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="John Doe"
              disabled={loading}
            />
          </div>

          {/* Email field */}
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="john@example.com"
              disabled={loading}
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
              placeholder="At least 6 characters"
              disabled={loading}
            />
          </div>

          {/* Confirm password field */}
          <div className="form-group">
            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              placeholder="Re-enter your password"
              disabled={loading}
            />
          </div>

          {/* Submit button */}
          <button
            type="submit"
            className="btn btn-primary"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Register'}
          </button>
        </form>

        {/* Link to login */}
        <p className="auth-link">
          Already have an account?{' '}
          <a href="/login">Login here</a>
        </p>
      </div>
    </div>
  );
}
