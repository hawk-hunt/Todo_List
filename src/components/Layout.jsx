/**
 * Layout.jsx
 * Main layout wrapper combining Sidebar + Main Content
 * Sidebar stays fixed, content changes based on navigation
 */

import '../styles/Layout.css';

export default function Layout({ children }) {
  return (
    <div className="layout-wrapper">
      {children}
    </div>
  );
}
