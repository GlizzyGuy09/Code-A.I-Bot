import React from "react";

export default function Navbar({ user, onLogin, onLogout, onToggleSettings }) {
  return (
    <nav className="navbar">
      <h1>Code Bot 💻</h1>
      <div className="nav-right">
        <button onClick={onToggleSettings} className="settings-btn" title="Settings">
          ⚙️
        </button>
        {user ? (
          <>
            <span className="user-email">{user.email}</span>
            <button onClick={onLogout}>Logout</button>
          </>
        ) : (
          <button onClick={onLogin}>Login with Google</button>
        )}
      </div>
    </nav>
  );
}
