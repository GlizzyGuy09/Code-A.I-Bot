import React, { useState, useEffect } from "react";
import {
  auth,
  provider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "./firebase";

import Navbar from "./components/Navbar";
import Chat from "./components/Chat";
import Settings from "./components/Settings";

export default function App() {
  const [user, setUser] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("darkMode") === "true"
  );

  useEffect(() => {
    onAuthStateChanged(auth, setUser);
  }, []);

  useEffect(() => {
    if (darkMode) document.body.classList.add("dark");
    else document.body.classList.remove("dark");
    localStorage.setItem("darkMode", darkMode);
  }, [darkMode]);

  function handleLogin() {
    signInWithPopup(auth, provider).then((result) => setUser(result.user));
  }

  function handleLogout() {
    signOut(auth).then(() => setUser(null));
  }

  function toggleSettings() {
    setShowSettings((show) => !show);
  }

  function toggleDarkMode() {
    setDarkMode((mode) => !mode);
  }

  return (
    <>
      <Navbar
        user={user}
        onLogin={handleLogin}
        onLogout={handleLogout}
        onToggleSettings={toggleSettings}
      />
      {showSettings && (
        <Settings
          darkMode={darkMode}
          onToggleDarkMode={toggleDarkMode}
          onClose={toggleSettings}
        />
      )}
      <main>{user ? <Chat backendUrl={import.meta.env.VITE_BACKEND_URL} /> : <p style={{textAlign:"center", marginTop:"2rem"}}>Please log in to start chatting.</p>}</main>
    </>
  );
}
