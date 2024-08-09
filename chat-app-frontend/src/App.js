// src/App.js

import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SignUp from './components/SignUp';
import SignIn from './components/SignIn';
import Chat from './components/Chat';
import Header from './components/Header';
import './styles/App.css';

function App() {
  return (
    <Router>
      <div className="container">
        <Header />
        <Routes>
          <Route path="/signup" element={<SignUp />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/" element={<SignIn />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
