/**
 * DashboardPage.jsx
 * Main dashboard content page
 * Clean, organized layout
 */

import '../styles/Pages.css';

export default function DashboardPage({ user }) {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Dashboard</h1>
        <p>Welcome back!</p>
      </div>

      <div className="page-content">
        {/* Welcome Section */}
        <div className="card">
          <h2>Welcome, {user?.name || 'User'}! 👋</h2>
          <p>You are successfully logged in to your dashboard.</p>
        </div>

        {/* Stats Grid */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-value">✓</div>
            <div className="stat-label">Tasks Ready</div>
            <div className="stat-desc">Manage your daily work</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">👤</div>
            <div className="stat-label">Profile</div>
            <div className="stat-desc">View your information</div>
          </div>

          <div className="stat-card">
            <div className="stat-value">⚙</div>
            <div className="stat-label">Settings</div>
            <div className="stat-desc">Customize your experience</div>
          </div>
        </div>

        {/* Info Sections */}
        <div className="info-grid">
          <div className="card">
            <h3>Quick Links</h3>
            <ul className="link-list">
              <li>📋 View all tasks</li>
              <li>👤 Edit your profile</li>
              <li>⚙ Update settings</li>
            </ul>
          </div>

          <div className="card">
            <h3>Account Info</h3>
            <div className="account-info">
              <p><strong>Email:</strong> {user?.email}</p>
              <p><strong>Member Since:</strong> {user?.createdAt ? new Date(user.createdAt).toLocaleDateString() : 'N/A'}</p>
              <p><strong>Status:</strong> Active</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
