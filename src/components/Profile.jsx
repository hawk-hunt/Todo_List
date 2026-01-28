/**
 * Profile Component
 * User profile information page
 * 
 * Features:
 * - Display user details in cards
 * - Smooth loading animation
 * - Professional card layout
 * - Copy-to-clipboard for ID
 */

import { useState } from 'react';
import '../styles/Profile.css';

export default function Profile({ user }) {
  // Copied state for clipboard feedback
  const [copiedField, setCopiedField] = useState(null);

  /**
   * Copy text to clipboard
   * Show feedback for 2 seconds
   */
  const copyToClipboard = (text, field) => {
    navigator.clipboard.writeText(text).then(() => {
      setCopiedField(field);
      setTimeout(() => setCopiedField(null), 2000);
    }).catch(err => {
      console.error('Failed to copy:', err);
    });
  };

  return (
    <div className="profile-container">
      {/* Header section */}
      <div className="profile-header">
        <h1>My Profile</h1>
        <p className="profile-subtitle">Manage your account information</p>
      </div>

      {/* Profile content grid */}
      <div className="profile-grid">
        {/* Full Name Card */}
        <div className="profile-card">
          <div className="card-icon">👤</div>
          <div className="card-content">
            <label className="card-label">Full Name</label>
            <p className="card-value">{user?.name || 'N/A'}</p>
          </div>
        </div>

        {/* Email Card */}
        <div className="profile-card">
          <div className="card-icon">✉</div>
          <div className="card-content">
            <label className="card-label">Email Address</label>
            <p className="card-value">{user?.email || 'N/A'}</p>
          </div>
        </div>

        {/* Account ID Card - with copy button */}
        <div className="profile-card">
          <div className="card-icon">🆔</div>
          <div className="card-content">
            <label className="card-label">Account ID</label>
            <div className="card-value-with-action">
              <p className="card-value monospace">{user?.id || 'N/A'}</p>
              <button
                className={`copy-btn ${copiedField === 'id' ? 'copied' : ''}`}
                onClick={() => copyToClipboard(user?.id, 'id')}
                title="Copy to clipboard"
              >
                {copiedField === 'id' ? '✓ Copied' : '📋'}
              </button>
            </div>
          </div>
        </div>

        {/* Member Since Card */}
        <div className="profile-card">
          <div className="card-icon">📅</div>
          <div className="card-content">
            <label className="card-label">Member Since</label>
            <p className="card-value">
              {user?.createdAt
                ? new Date(user.createdAt).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })
                : 'N/A'}
            </p>
          </div>
        </div>

        {/* Account Status Card */}
        <div className="profile-card">
          <div className="card-icon">✓</div>
          <div className="card-content">
            <label className="card-label">Account Status</label>
            <p className="card-value status-active">Active</p>
          </div>
        </div>

        {/* Account Type Card */}
        <div className="profile-card">
          <div className="card-icon">🎯</div>
          <div className="card-content">
            <label className="card-label">Account Type</label>
            <p className="card-value">User</p>
          </div>
        </div>
      </div>

      {/* Additional information section */}
      <div className="profile-info-section">
        <h2>Account Information</h2>
        <p>
          Your account is fully verified and active. You have access to all dashboard features.
          For security purposes, please do not share your Account ID with anyone.
        </p>
      </div>

      {/* Action buttons */}
      <div className="profile-actions">
        <button className="action-btn action-edit" disabled>
          <span>✎</span> Edit Profile
        </button>
        <button className="action-btn action-password" disabled>
          <span>🔐</span> Change Password
        </button>
      </div>
    </div>
  );
}
