/**
 * Dashboard Component
 * 
 * Protected route showing user information
 * - Fetches user data using JWT token
 * - Displays welcome message
 * - Logout functionality
 * - Handles token expiration
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDashboard } from '../lib/api';
import './Dashboard.css';

export default function Dashboard() {
  const navigate = useNavigate();

  // State management
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  /**
   * useEffect Hook
   * Runs once when component mounts
   * 
   * Flow:
   * 1. Check if user is logged in (token exists)
   * 2. If not, redirect to login
   * 3. If yes, fetch user dashboard data
   * 4. Backend verify JWT and returns user info
   * 5. Display user info in dashboard
   */
  useEffect(() => {
    const fetchDashboard = async () => {
      try {
        // Check if token exists in localStorage
        const token = localStorage.getItem('token');
        if (!token) {
          // No token, redirect to login
          navigate('/login', { replace: true });
          return;
        }

        // Fetch protected dashboard data
        // Axios interceptor automatically adds JWT to request
        const response = await getDashboard();

        // Set user data from response
        setUser(response.data.user);
        setError('');
      } catch (err) {
        console.error('Dashboard fetch error:', err);
        
        // If token is invalid/expired
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          navigate('/login', { replace: true });
        } else {
          setError('Failed to load dashboard data: ' + (err.response?.data?.message || err.message));
        }
      } finally {
        setLoading(false);
      }
    };

    fetchDashboard();
  }, [navigate]);

  /**
   * Handle logout
   * 
   * 1. Remove JWT token from localStorage
   * 2. Remove user data
   * 3. Redirect to login page
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  // Show loading state
  if (loading) {
    return (
      <div className="dashboard-container">
        <div className="dashboard-loading">
          <p>Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="dashboard-container">
        <div className="alert alert-error">{error}</div>
        <button onClick={handleLogout} className="btn btn-danger">
          Return to Login
        </button>
      </div>
    );
  }

  // Show dashboard
  return (
    <div className="dashboard-container">
      {/* Header with logout button */}
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <button onClick={handleLogout} className="btn btn-danger">
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="dashboard-card">
        <div className="welcome-section">
          <h2>Welcome, {user?.name}! 👋</h2>
          <p className="subtitle">You are successfully logged in</p>
        </div>

        {/* User information */}
        <div className="user-info">
          <h3>Your Account Information</h3>
          <div className="info-grid">
            <div className="info-item">
              <label>Name</label>
              <p>{user?.name}</p>
            </div>
            <div className="info-item">
              <label>Email</label>
              <p>{user?.email}</p>
            </div>
            <div className="info-item">
              <label>Member Since</label>
              <p>{new Date(user?.createdAt).toLocaleDateString()}</p>
            </div>
            <div className="info-item">
              <label>Account ID</label>
              <p className="monospace">{user?.id}</p>
            </div>
          </div>
        </div>

        {/* Additional features section */}
        <div className="features-section">
          <h3>What's Next?</h3>
          <ul className="feature-list">
            <li>✓ You are authenticated with a JWT token</li>
            <li>✓ Token is stored in localStorage</li>
            <li>✓ Token is automatically sent with requests</li>
            <li>✓ Backend verifies token on protected routes</li>
            <li>✓ Token expires in 7 days</li>
          </ul>
        </div>

        {/* Technical info */}
        <div className="tech-info">
          <h3>How This Works</h3>
          <p>
            <strong>Login Process:</strong> You sent your email and password to the backend. 
            The backend hashed your password, verified it against the database, and returned a JWT token.
          </p>
          <p>
            <strong>JWT Token:</strong> Your token is now stored in localStorage. 
            With each API request, the Axios interceptor automatically adds it to the Authorization header.
          </p>
          <p>
            <strong>Protected Routes:</strong> When you access protected routes like this dashboard, 
            the backend middleware verifies your token signature, checks expiration, and extracts your user ID.
          </p>
          <p>
            <strong>Data Isolation:</strong> The dashboard endpoint queries the database for data 
            associated with your user ID extracted from the token payload.
          </p>
        </div>
      </div>
    </div>
  );
}
