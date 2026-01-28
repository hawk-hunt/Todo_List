import '../styles/Navbar.css';

export default function Navbar({ user, onLogout }) {
  const handleLogout = () => {
    onLogout?.();
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo */}
        <div className="navbar-logo">
          <span className="logo-icon">✓</span>
          <span className="logo-text">TaskBoard</span>
        </div>

        {/* Center Navigation Links */}
        <div className="navbar-center">
          <a href="#/" className="nav-link">Dashboard</a>
          <a href="#/" className="nav-link">Statistics</a>
          <a href="#/" className="nav-link">Pages</a>
        </div>

        {/* Right Section */}
        <div className="navbar-right">
          {/* Search */}
          <div className="search-box">
            <input 
              type="text" 
              placeholder="Search..." 
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>

          {/* Logout Button */}
          <button 
            className="logout-btn"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
