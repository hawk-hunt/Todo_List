/**
 * Settings Page
 * Application and preference settings
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/Settings.css';

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [settings, setSettings] = useState({
    notifications: {
      email: true,
      push: true,
      sms: false,
      dailyDigest: true
    },
    appearance: {
      theme: 'light',
      compactMode: false,
      fontSize: 'medium'
    },
    privacy: {
      profileVisibility: 'public',
      allowMessages: true,
      showOnlineStatus: true
    }
  });
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleNotificationChange = (key) => {
    setSettings(prev => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: !prev.notifications[key]
      }
    }));
  };

  const handleAppearanceChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      appearance: {
        ...prev.appearance,
        [key]: value
      }
    }));
  };

  const handlePrivacyChange = (key) => {
    setSettings(prev => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: !prev.privacy[key]
      }
    }));
  };

  const handleSave = () => {
    localStorage.setItem('settings', JSON.stringify(settings));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={handleLogout} />
      
      <div className="dashboard-body">
        <Sidebar />
        
        <main className="main-content">
          <div className="page-header">
            <div className="page-title-section">
              <h1>⚙️ Settings</h1>
              <nav className="breadcrumb">
                <span>Dashboard</span>
                <span>/</span>
                <span>Settings</span>
              </nav>
            </div>
          </div>

          <div className="settings-container">
            {/* Save Notification */}
            {saved && (
              <div className="save-notification">
                ✓ Settings saved successfully
              </div>
            )}

            {/* Notification Settings */}
            <div className="settings-section">
              <h3>🔔 Notifications</h3>
              
              <div className="setting-option">
                <div className="setting-info">
                  <h4>Email Notifications</h4>
                  <p>Receive task updates via email</p>
                </div>
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.email}
                    onChange={() => handleNotificationChange('email')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-option">
                <div className="setting-info">
                  <h4>Push Notifications</h4>
                  <p>Get browser push notifications</p>
                </div>
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.push}
                    onChange={() => handleNotificationChange('push')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-option">
                <div className="setting-info">
                  <h4>SMS Notifications</h4>
                  <p>Get text message alerts</p>
                </div>
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.sms}
                    onChange={() => handleNotificationChange('sms')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-option">
                <div className="setting-info">
                  <h4>Daily Digest</h4>
                  <p>Receive daily summary of tasks</p>
                </div>
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={settings.notifications.dailyDigest}
                    onChange={() => handleNotificationChange('dailyDigest')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            {/* Appearance Settings */}
            <div className="settings-section">
              <h3>🎨 Appearance</h3>
              
              <div className="setting-option">
                <div className="setting-info">
                  <h4>Theme</h4>
                  <p>Choose your preferred theme</p>
                </div>
                <select 
                  value={settings.appearance.theme}
                  onChange={(e) => handleAppearanceChange('theme', e.target.value)}
                  className="settings-select"
                >
                  <option value="light">Light</option>
                  <option value="dark">Dark</option>
                  <option value="auto">Auto</option>
                </select>
              </div>

              <div className="setting-option">
                <div className="setting-info">
                  <h4>Font Size</h4>
                  <p>Adjust text size</p>
                </div>
                <select 
                  value={settings.appearance.fontSize}
                  onChange={(e) => handleAppearanceChange('fontSize', e.target.value)}
                  className="settings-select"
                >
                  <option value="small">Small</option>
                  <option value="medium">Medium</option>
                  <option value="large">Large</option>
                </select>
              </div>

              <div className="setting-option">
                <div className="setting-info">
                  <h4>Compact Mode</h4>
                  <p>Reduce spacing and padding</p>
                </div>
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={settings.appearance.compactMode}
                    onChange={() => handleAppearanceChange('compactMode', !settings.appearance.compactMode)}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            {/* Privacy Settings */}
            <div className="settings-section">
              <h3>🔒 Privacy</h3>
              
              <div className="setting-option">
                <div className="setting-info">
                  <h4>Profile Visibility</h4>
                  <p>Control who can see your profile</p>
                </div>
                <select 
                  value={settings.privacy.profileVisibility}
                  onChange={(e) => setSettings(prev => ({
                    ...prev,
                    privacy: { ...prev.privacy, profileVisibility: e.target.value }
                  }))}
                  className="settings-select"
                >
                  <option value="public">Public</option>
                  <option value="private">Private</option>
                  <option value="friends">Friends Only</option>
                </select>
              </div>

              <div className="setting-option">
                <div className="setting-info">
                  <h4>Allow Messages</h4>
                  <p>Let others message you</p>
                </div>
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={settings.privacy.allowMessages}
                    onChange={() => handlePrivacyChange('allowMessages')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>

              <div className="setting-option">
                <div className="setting-info">
                  <h4>Show Online Status</h4>
                  <p>Let others see when you're online</p>
                </div>
                <label className="toggle">
                  <input 
                    type="checkbox" 
                    checked={settings.privacy.showOnlineStatus}
                    onChange={() => handlePrivacyChange('showOnlineStatus')}
                  />
                  <span className="toggle-slider"></span>
                </label>
              </div>
            </div>

            {/* Save Button */}
            <div className="settings-actions">
              <button className="btn btn-primary" onClick={handleSave}>
                Save All Settings
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
