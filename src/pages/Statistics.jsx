/**
 * Statistics Page
 * Display analytics and metrics for tasks
 */

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import Sidebar from '../components/Sidebar';
import '../styles/Statistics.css';

export default function Statistics() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    totalTasks: 5,
    completedTasks: 2,
    inProgressTasks: 2,
    todoTasks: 1,
    completionRate: 40,
    averageTime: 3
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/login');
  };

  useEffect(() => {
    const userStr = localStorage.getItem('user');
    if (userStr) {
      setUser(JSON.parse(userStr));
    }
  }, []);

  return (
    <div className="dashboard">
      <Navbar user={user} onLogout={handleLogout} />
      
      <div className="dashboard-body">
        <Sidebar />
        
        <main className="main-content">
          <div className="page-header">
            <div className="page-title-section">
              <h1>📊 Statistics</h1>
              <nav className="breadcrumb">
                <span>Dashboard</span>
                <span>/</span>
                <span>Analytics</span>
              </nav>
            </div>
          </div>

          <div className="stats-container">
            {/* Stats Grid */}
            <div className="stats-grid">
              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-icon">📋</span>
                  <span className="stat-label">Total Tasks</span>
                </div>
                <div className="stat-value">{stats.totalTasks}</div>
                <div className="stat-trend">↑ 2 this week</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-icon">✓</span>
                  <span className="stat-label">Completed</span>
                </div>
                <div className="stat-value">{stats.completedTasks}</div>
                <div className="stat-trend positive">✓ {stats.completionRate}% rate</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-icon">⚡</span>
                  <span className="stat-label">In Progress</span>
                </div>
                <div className="stat-value">{stats.inProgressTasks}</div>
                <div className="stat-trend">Active now</div>
              </div>

              <div className="stat-card">
                <div className="stat-header">
                  <span className="stat-icon">📝</span>
                  <span className="stat-label">To Do</span>
                </div>
                <div className="stat-value">{stats.todoTasks}</div>
                <div className="stat-trend">Pending</div>
              </div>
            </div>

            {/* Charts Section */}
            <div className="charts-section">
              <div className="chart-card">
                <h3>Task Completion Rate</h3>
                <div className="progress-bar">
                  <div className="progress-fill" style={{ width: `${stats.completionRate}%` }}></div>
                </div>
                <div className="progress-text">{stats.completionRate}% Complete</div>
              </div>

              <div className="chart-card">
                <h3>Tasks by Status</h3>
                <div className="status-breakdown">
                  <div className="status-item">
                    <span className="status-label">To Do</span>
                    <span className="status-count">{stats.todoTasks}</span>
                    <div className="status-bar" style={{ backgroundColor: '#fca5a5', width: '20%' }}></div>
                  </div>
                  <div className="status-item">
                    <span className="status-label">In Progress</span>
                    <span className="status-count">{stats.inProgressTasks}</span>
                    <div className="status-bar" style={{ backgroundColor: '#fbbf24', width: '40%' }}></div>
                  </div>
                  <div className="status-item">
                    <span className="status-label">Completed</span>
                    <span className="status-count">{stats.completedTasks}</span>
                    <div className="status-bar" style={{ backgroundColor: '#86efac', width: '40%' }}></div>
                  </div>
                </div>
              </div>
            </div>

            {/* Activity Timeline */}
            <div className="activity-section">
              <h3>Recent Activity</h3>
              <div className="activity-list">
                <div className="activity-item">
                  <div className="activity-icon">✓</div>
                  <div className="activity-content">
                    <div className="activity-title">Task Completed</div>
                    <div className="activity-desc">"Add styling" was marked as done</div>
                    <div className="activity-time">2 hours ago</div>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon">➕</div>
                  <div className="activity-content">
                    <div className="activity-title">Task Created</div>
                    <div className="activity-desc">"Create components" added to In Progress</div>
                    <div className="activity-time">1 day ago</div>
                  </div>
                </div>

                <div className="activity-item">
                  <div className="activity-icon">📌</div>
                  <div className="activity-content">
                    <div className="activity-title">Task Updated</div>
                    <div className="activity-desc">"Setup React project" moved to In Progress</div>
                    <div className="activity-time">3 days ago</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
