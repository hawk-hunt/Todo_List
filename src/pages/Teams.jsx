/**
 * Teams Page
 * Manage team members and collaboration
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/Teams.css';

export default function Teams() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [members, setMembers] = useState([
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Admin', status: 'online', avatar: 'J' },
    { id: 2, name: 'Sarah Smith', email: 'sarah@example.com', role: 'Member', status: 'online', avatar: 'S' },
    { id: 3, name: 'Mike Wilson', email: 'mike@example.com', role: 'Member', status: 'offline', avatar: 'M' },
    { id: 4, name: 'Emma Brown', email: 'emma@example.com', role: 'Editor', status: 'online', avatar: 'E' },
  ]);
  const [showAddMember, setShowAddMember] = useState(false);
  const [newMember, setNewMember] = useState({ name: '', email: '', role: 'Member' });

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  const handleAddMember = () => {
    if (newMember.name && newMember.email) {
      setMembers([...members, {
        id: members.length + 1,
        ...newMember,
        status: 'pending',
        avatar: newMember.name[0]
      }]);
      setNewMember({ name: '', email: '', role: 'Member' });
      setShowAddMember(false);
    }
  };

  const handleRemoveMember = (id) => {
    setMembers(members.filter(m => m.id !== id));
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
              <div className="header-top">
                <h1>👥 Team Members</h1>
                <button 
                  className="btn btn-primary"
                  onClick={() => setShowAddMember(!showAddMember)}
                >
                  ➕ Add Member
                </button>
              </div>
              <nav className="breadcrumb">
                <span>Dashboard</span>
                <span>/</span>
                <span>Teams</span>
              </nav>
            </div>
          </div>

          <div className="teams-container">
            {/* Add Member Form */}
            {showAddMember && (
              <div className="add-member-form">
                <h3>Add New Team Member</h3>
                <div className="form-row">
                  <input
                    type="text"
                    placeholder="Full Name"
                    value={newMember.name}
                    onChange={(e) => setNewMember({...newMember, name: e.target.value})}
                  />
                  <input
                    type="email"
                    placeholder="Email"
                    value={newMember.email}
                    onChange={(e) => setNewMember({...newMember, email: e.target.value})}
                  />
                  <select 
                    value={newMember.role}
                    onChange={(e) => setNewMember({...newMember, role: e.target.value})}
                  >
                    <option value="Member">Member</option>
                    <option value="Editor">Editor</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
                <div className="form-actions">
                  <button className="btn btn-primary" onClick={handleAddMember}>Add Member</button>
                  <button className="btn btn-secondary" onClick={() => setShowAddMember(false)}>Cancel</button>
                </div>
              </div>
            )}

            {/* Members List */}
            <div className="members-list">
              <div className="members-header">
                <div>Member</div>
                <div>Role</div>
                <div>Status</div>
                <div>Actions</div>
              </div>

              {members.map(member => (
                <div key={member.id} className="member-row">
                  <div className="member-info">
                    <div className="member-avatar">{member.avatar}</div>
                    <div>
                      <div className="member-name">{member.name}</div>
                      <div className="member-email">{member.email}</div>
                    </div>
                  </div>
                  <div className="member-role">
                    <span className={`role-badge role-${member.role.toLowerCase()}`}>
                      {member.role}
                    </span>
                  </div>
                  <div className="member-status">
                    <span className={`status-badge status-${member.status}`}>
                      {member.status === 'pending' ? '⏳ Pending' : 
                       member.status === 'online' ? '🟢 Online' : '⚫ Offline'}
                    </span>
                  </div>
                  <div className="member-actions">
                    {member.id !== 1 && (
                      <button 
                        className="btn btn-danger btn-small"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        Remove
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Team Stats */}
            <div className="team-stats">
              <h3>Team Statistics</h3>
              <div className="stats-grid">
                <div className="stat-box">
                  <div className="stat-number">{members.length}</div>
                  <div className="stat-label">Total Members</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">{members.filter(m => m.status === 'online').length}</div>
                  <div className="stat-label">Online Now</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">{members.filter(m => m.role === 'Admin').length}</div>
                  <div className="stat-label">Admins</div>
                </div>
                <div className="stat-box">
                  <div className="stat-number">{members.filter(m => m.status === 'pending').length}</div>
                  <div className="stat-label">Pending</div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
