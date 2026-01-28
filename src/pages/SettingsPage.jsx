/**
 * SettingsPage.jsx
 * Settings page - placeholder for future features
 */

import '../styles/Pages.css';

export default function SettingsPage() {
  return (
    <div className="page-container">
      <div className="page-header">
        <h1>Settings</h1>
        <p>Manage your preferences</p>
      </div>

      <div className="page-content">
        <div className="card">
          <h3>Settings</h3>
          <p className="text-secondary">
            Settings will be available soon. Stay tuned for more customization options!
          </p>
        </div>

        {/* Placeholder sections */}
        <div className="card">
          <h4>General Settings</h4>
          <p className="text-secondary">Theme, language, and notification preferences.</p>
        </div>

        <div className="card">
          <h4>Account Settings</h4>
          <p className="text-secondary">Change password, enable 2FA, manage sessions.</p>
        </div>

        <div className="card">
          <h4>Privacy & Security</h4>
          <p className="text-secondary">Data privacy, security settings, and login history.</p>
        </div>
      </div>
    </div>
  );
}
