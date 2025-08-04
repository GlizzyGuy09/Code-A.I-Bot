import React from "react";

export default function Settings({ darkMode, onToggleDarkMode, onClose }) {
  return (
    <div className="settings-modal">
      <div className="settings-content">
        <h2>Settings</h2>
        <label>
          <input
            type="checkbox"
            checked={darkMode}
            onChange={onToggleDarkMode}
          />
          Dark Mode
        </label>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
}
