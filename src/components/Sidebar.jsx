import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

export default function Sidebar() {
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = [
    { id: 'dashboard', icon: '📊', label: 'Dashboard', route: '/dashboard' },
    { id: 'statistics', icon: '📈', label: 'Analytics', route: '/statistics' },
    { id: 'teams', icon: '👥', label: 'Teams', route: '/teams' },
    { id: 'profile', icon: '👤', label: 'Profile', route: '/profile' },
    { id: 'settings', icon: '⚙', label: 'Settings', route: '/settings' },
  ];

  const handleNavigation = (route) => {
    navigate(route);
    if (window.innerWidth < 768) {
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Sidebar Toggle for Mobile */}
      <button 
        className="sidebar-toggle"
        onClick={() => setIsOpen(!isOpen)}
      >
        ☰
      </button>

      {/* Sidebar */}
      <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <h3>Menu</h3>
          <button 
            className="sidebar-close"
            onClick={() => setIsOpen(false)}
          >
            ✕
          </button>
        </div>

        {/* Navigation Items */}
        <nav className="sidebar-nav">
          {menuItems.map(item => (
            <button
              key={item.id}
              className="nav-item"
              onClick={() => handleNavigation(item.route)}
              title={item.label}
            >
              <span className="nav-icon">{item.icon}</span>
              <span className="nav-label">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Sidebar Footer */}
        <div className="sidebar-footer">
          <button className="logout-btn">
            <span>🚪</span>
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="sidebar-overlay"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
}
