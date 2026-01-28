/**
 * ProfilePage.jsx
 * User profile information page
 * Clean card-based layout
 */

import { useState } from 'react';
import '../styles/Pages.css';

export default function ProfilePage({ user }) {
  const [copied, setCopied] = useState(null);

  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopied(field);
    setTimeout(() => setCopied(null), 2000);
  };

  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Profile</h1>
        <p>Your account information</p>
      </div>

      <div className="page-content">
        {/* Profile Cards */}
        <div className="profile-grid">
          <div className="card card-interactive">
            <div className="card-icon">👤</div>
            <h3>Full Name</h3>
            <p className="card-value">{user?.name || 'N/A'}</p>
          </div>

          <div className="card card-interactive">
            <div className="card-icon">✉</div>
            <h3>Email</h3>
            <p className="card-value">{user?.email || 'N/A'}</p>
          </div>

          <div className="card card-interactive">
            <div className="card-icon">🆔</div>
            <h3>Account ID</h3>
            <p className="card-value monospace">{user?.id || 'N/A'}</p>
            <button 
              className="copy-btn"
              onClick={() => copyToClipboard(user?.id, 'id')}
            >
              {copied === 'id' ? '✓ Copied' : 'Copy'}
            </button>
          </div>

          <div className="card card-interactive">
            <div className="card-icon">📅</div>
            <h3>Member Since</h3>
            <p className="card-value">
              {user?.createdAt 
                ? new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })
                : 'N/A'}
            </p>
          </div>

          <div className="card card-interactive">
            <div className="card-icon">✓</div>
            <h3>Status</h3>
            <p className="card-value status-active">Active</p>
          </div>

          <div className="card card-interactive">
            <div className="card-icon">🎯</div>
            <h3>Account Type</h3>
            <p className="card-value">User</p>
          </div>
        </div>

        {/* Account Information */}
        <div className="card">
          <h3>Account Information</h3>
          <p className="text-secondary">
            Your account is fully verified and active. You have complete access to all dashboard features.
            Your information is secure and never shared.
          </p>
        </div>
      </div>
    </div>
  );
}
