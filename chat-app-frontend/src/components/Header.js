import React from 'react';
import '../styles/Header.css';

function Header({ currentUser }) {
  return (
    <header className="header">
      <h1>Chat Application</h1>
      <div className="user-info">
        {currentUser ? (
          <p>Welcome, {currentUser.username}!</p>
        ) : (
          <p>Welcome, Guest!</p>
        )}
      </div>
    </header>
  );
}

export default Header;
