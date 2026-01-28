/**
 * DashboardHome Component
 * Main dashboard overview page
 * 
 * Features:
 * - Welcome message
 * - Quick stats
 * - Feature highlights
 * - Account information summary
 */

import '../styles/DashboardHome.css';

export default function DashboardHome({ user }) {
  return (
    <div className="dashboard-home">
      {/* Welcome section */}
      <div className="welcome-banner">
        <div className="welcome-content">
          <h1>Welcome Back, {user?.name}! 👋</h1>
          <p>You are successfully logged in to your TaskBoard Dashboard</p>
        </div>
        <div className="welcome-icon">📊</div>
      </div>

      {/* Quick stats */}
      <div className="stats-container">
        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div className="stat-info">
            <h3>Tasks Ready</h3>
            <p className="stat-number">Manage your daily tasks</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">👤</div>
          <div className="stat-info">
            <h3>Profile Complete</h3>
            <p className="stat-number">100% Verified</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔐</div>
          <div className="stat-info">
            <h3>Secure Account</h3>
            <p className="stat-number">JWT Protected</p>
          </div>
        </div>
      </div>

      {/* Features section */}
      <div className="features-grid">
        <div className="feature-card">
          <div className="feature-icon">✓</div>
          <h3>To-Do Management</h3>
          <p>Create, edit, and manage your daily tasks with ease. Track your progress and stay organized.</p>
          <span className="feature-badge">Active</span>
        </div>

        <div className="feature-card">
          <div className="feature-icon">👤</div>
          <h3>Profile Management</h3>
          <p>View and manage your profile information. Keep your account details up to date.</p>
          <span className="feature-badge">Available</span>
        </div>

        <div className="feature-card">
          <div className="feature-icon">💾</div>
          <h3>Local Storage</h3>
          <p>Your data is safely stored locally. No data is lost even after browser refresh.</p>
          <span className="feature-badge">Enabled</span>
        </div>

        <div className="feature-card">
          <div className="feature-icon">⚙</div>
          <h3>Settings</h3>
          <p>Customize your dashboard experience. Coming soon with more personalization options.</p>
          <span className="feature-badge">Coming Soon</span>
        </div>
      </div>

      {/* Account overview */}
      <div className="account-overview">
        <h2>Account Overview</h2>
        <div className="overview-content">
          <div className="overview-item">
            <label>Account Email</label>
            <p>{user?.email}</p>
          </div>
          <div className="overview-item">
            <label>Member Since</label>
            <p>
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'N/A'}
            </p>
          </div>
          <div className="overview-item">
            <label>Account Status</label>
            <p className="status-badge">Active</p>
          </div>
        </div>
      </div>

      {/* Getting started guide */}
      <div className="getting-started">
        <h2>Getting Started</h2>
        <div className="steps">
          <div className="step">
            <div className="step-number">1</div>
            <div className="step-content">
              <h4>Create a Task</h4>
              <p>Navigate to "To-Do List" and click "+ Create Task" to add your first task.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">2</div>
            <div className="step-content">
              <h4>Manage Your Tasks</h4>
              <p>Edit, complete, or delete tasks. Your tasks are saved automatically.</p>
            </div>
          </div>

          <div className="step">
            <div className="step-number">3</div>
            <div className="step-content">
              <h4>View Your Profile</h4>
              <p>Check your profile information anytime from the "My Profile" section.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
