/**
 * NavbarItem Component
 * Individual sidebar menu item
 * 
 * Features:
 * - Icon support
 * - Active state highlighting
 * - Smooth hover animations
 * - Click handler
 */

import '../styles/NavbarItem.css';

export default function NavbarItem({
  icon,
  label,
  isActive,
  onClick,
}) {
  return (
    <button
      className={`navbar-item ${isActive ? 'active' : ''}`}
      onClick={onClick}
      title={label}
      aria-pressed={isActive}
    >
      <span className="navbar-icon">{icon}</span>
      <span className="navbar-label">{label}</span>
      {isActive && <span className="navbar-indicator" />}
    </button>
  );
}
