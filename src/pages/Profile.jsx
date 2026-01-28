/**
 * Profile Page
 * User profile management and information
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/Profile.css';

export default function Profile() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    department: '',
    role: '',
    bio: ''
  });
  const [edited, setEdited] = useState(false);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      const userData = JSON.parse(userStr);
      setUser(userData);
      setFormData(prev => ({
        ...prev,
        name: userData.name || '',
        email: userData.email || ''
      }));
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    setEdited(true);
  };

  const handleSave = async () => {
    setSaving(true);
    setTimeout(() => {
      const updated = { ...user, ...formData };
      localStorage.setItem('user', JSON.stringify(updated));
      setUser(updated);
      setEdited(false);
      setSaving(false);
    }, 1000);
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
              <h1>👤 Profile</h1>
              <nav className="breadcrumb">
                <span>Dashboard</span>
                <span>/</span>
                <span>Profile</span>
              </nav>
            </div>
          </div>

          <div className="profile-container">
            {/* Profile Header */}
            <div className="profile-header">
              <div className="avatar-section">
                <div className="avatar-large">
                  {formData.name?.split(' ').map(w => w[0]).join('').toUpperCase()}
                </div>
                <button className="change-avatar-btn">Change Avatar</button>
              </div>

              <div className="profile-info">
                <h2>{formData.name}</h2>
                <p>{formData.email}</p>
                <p className="join-date">Member since 2024</p>
              </div>
            </div>

            {/* Profile Form */}
            <div className="profile-form">
              <h3>Personal Information</h3>
              
              <div className="form-row">
                <div className="form-group">
                  <label>Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="Your full name"
                  />
                </div>

                <div className="form-group">
                  <label>Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    disabled
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Phone</label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="+1 (555) 123-4567"
                  />
                </div>

                <div className="form-group">
                  <label>Department</label>
                  <select name="department" value={formData.department} onChange={handleChange}>
                    <option value="">Select department</option>
                    <option value="dev">Development</option>
                    <option value="design">Design</option>
                    <option value="marketing">Marketing</option>
                    <option value="sales">Sales</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <label>Bio</label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleChange}
                  placeholder="Tell us about yourself..."
                  rows="4"
                ></textarea>
              </div>

              <div className="form-actions">
                <button 
                  className="btn btn-primary"
                  onClick={handleSave}
                  disabled={!edited || saving}
                >
                  {saving ? 'Saving...' : 'Save Changes'}
                </button>
                <button 
                  className="btn btn-secondary"
                  onClick={() => setEdited(false)}
                >
                  Cancel
                </button>
              </div>
            </div>

            {/* Account Settings */}
            <div className="account-settings">
              <h3>Account Settings</h3>
              
              <div className="settings-group">
                <div className="setting-item">
                  <div>
                    <h4>Email Notifications</h4>
                    <p>Receive updates about your tasks</p>
                  </div>
                  <label className="toggle">
                    <input type="checkbox" defaultChecked />
                    <span className="toggle-slider"></span>
                  </label>
                </div>

                <div className="setting-item">
                  <div>
                    <h4>Two-Factor Authentication</h4>
                    <p>Secure your account with 2FA</p>
                  </div>
                  <button className="btn btn-small">Enable</button>
                </div>

                <div className="setting-item">
                  <div>
                    <h4>Change Password</h4>
                    <p>Update your password regularly</p>
                  </div>
                  <button className="btn btn-small">Change</button>
                </div>
              </div>
            </div>

            {/* Danger Zone */}
            <div className="danger-zone">
              <h3>Danger Zone</h3>
              <button className="btn btn-danger">Delete Account</button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
