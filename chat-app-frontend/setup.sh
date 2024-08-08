#!/bin/bash

# Create directories
mkdir -p src/components
mkdir -p src/styles

# Create component files with boilerplate code

# SignUp.js
cat <<EOF > src/components/SignUp.js
import React, { useState } from 'react';
import '../styles/Forms.css';

function SignUp() {
  const [formData, setFormData] = useState({ username: '', email: '', password: '', confirmPassword: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and API call to register user
    console.log('Form submitted:', formData);
  };

  return (
    <div className="form-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username" value={formData.username} onChange={handleChange} required />
        <input type="email" name="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <input type="password" name="confirmPassword" placeholder="Confirm Password" value={formData.confirmPassword} onChange={handleChange} required />
        <button type="submit">Sign Up</button>
      </form>
      <a href="/signin">Already have an account? Sign In</a>
    </div>
  );
}

export default SignUp;
EOF

# SignIn.js
cat <<EOF > src/components/SignIn.js
import React, { useState } from 'react';
import '../styles/Forms.css';

function SignIn() {
  const [formData, setFormData] = useState({ username: '', password: '' });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add validation and API call to sign in user
    console.log('Form submitted:', formData);
  };

  return (
    <div className="form-container">
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" name="username" placeholder="Username or Email" value={formData.username} onChange={handleChange} required />
        <input type="password" name="password" placeholder="Password" value={formData.password} onChange={handleChange} required />
        <button type="submit">Sign In</button>
      </form>
      <a href="/signup">Don't have an account? Sign Up</a>
      <a href="/forgot-password">Forgot Password?</a>
    </div>
  );
}

export default SignIn;
EOF

# Chat.js
cat <<EOF > src/components/Chat.js
import React, { useState } from 'react';
import '../styles/Chat.css';
import ContactList from './ContactList';
import MessageInput from './MessageInput';

function Chat() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    const newMessage = { text, sender: 'me', timestamp: new Date() };
    setMessages([...messages, newMessage]);
  };

  return (
    <div className="chat-container">
      <ContactList />
      <div className="chat-window">
        <div className="message-list">
          {messages.map((msg, index) => (
            <div key={index} className={\`message \${msg.sender === 'me' ? 'sent' : 'received'}\`}>
              <p>{msg.text}</p>
              <span className="timestamp">{msg.timestamp.toLocaleTimeString()}</span>
            </div>
          ))}
        </div>
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default Chat;
EOF

# ContactList.js
cat <<EOF > src/components/ContactList.js
import React from 'react';
import '../styles/Chat.css';

function ContactList() {
  const contacts = [
    { name: 'Alice', status: 'online' },
    { name: 'Bob', status: 'offline' },
    { name: 'Charlie', status: 'online' },
  ];

  return (
    <div className="contact-list">
      {contacts.map((contact, index) => (
        <div key={index} className="contact-list-item">
          <div className="avatar">{contact.name.charAt(0)}</div>
          <div className="contact-info">
            <p className="contact-name">{contact.name}</p>
            <p className={\`status \${contact.status}\`}>{contact.status}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
EOF

# MessageInput.js
cat <<EOF > src/components/MessageInput.js
import React, { useState } from 'react';

function MessageInput({ onSendMessage }) {
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setMessage(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim()) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className="message-input-container">
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={message}
          onChange={handleChange}
          placeholder="Type a message..."
          className="message-input"
          required
        />
        <button type="submit" className="send-button">Send</button>
      </form>
    </div>
  );
}

export default MessageInput;
EOF

# Create styles files with boilerplate styles

# App.css
cat <<EOF > src/styles/App.css
body {
  font-family: Arial, sans-serif;
  background-color: #f4f4f9;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 1200px;
  margin: auto;
  padding: 20px;
}
EOF

# Chat.css
cat <<EOF > src/styles/Chat.css
.chat-container {
  display: flex;
  height: 80vh;
  margin-top: 20px;
  border-radius: 8px;
  overflow: hidden;
}

.chat-window {
  flex: 1;
  display: flex;
  flex-direction: column;
  background-color: #fff;
  border-left: 1px solid #ddd;
}

.message-list {
  flex-grow: 1;
  padding: 20px;
  overflow-y: auto;
  background-color: #f9f9fc;
}

.message {
  margin: 10px 0;
  padding: 10px;
  border-radius: 8px;
  max-width: 60%;
}

.message.sent {
  background-color: #d1f7d6;
  align-self: flex-end;
}

.message.received {
  background-color: #f0f0f5;
  align-self: flex-start;
}

.timestamp {
  font-size: 0.8em;
  color: #666;
  margin-top: 5px;
  display: block;
  text-align: right;
}

.contact-list {
  width: 250px;
  background-color: #f0f0f5;
  overflow-y: auto;
  border-right: 1px solid #ddd;
}

.contact-list-item {
  padding: 15px;
  display: flex;
  align-items: center;
  cursor: pointer;
}

.contact-list-item:hover {
  background-color: #e0e0e5;
}

.avatar {
  width: 40px;
  height: 40px;
  border-radius: 20px;
  background-color: #007bff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.2em;
  margin-right: 10px;
}

.contact-info {
  flex-grow: 1;
}

.contact-name {
  font-weight: bold;
}

.status {
  font-size: 0.9em;
  color: #999;
}

.message-input-container {
  display: flex;
  padding: 10px;
  border-top: 1px solid #ddd;
}

.message-input {
  flex-grow: 1;
  padding: 10px;
  border-radius: 4px;
  border: 1px solid #ccc;
  margin-right: 10px;
}

.send-button {
  padding: 10px 20px;
  background-color: #28a745;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.send-button:hover {
  background-color: #218838;
}
EOF

# Forms.css
cat <<EOF > src/styles/Forms.css
.form-container {
  max-width: 400px;
  margin: 50px auto;
  padding: 30px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-container h2 {
  margin-bottom: 20px;
  text-align: center;
}

.form-container input {
  width: 100%;
  padding: 10px;
  margin: 10px 0;
  border-radius: 4px;
  border: 1px solid #ccc;
}

.form-container button {
  width: 100%;
  padding: 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.form-container a {
  display: block;
  text-align: center;
  margin-top: 15px;
  color: #007bff;
  text-decoration: none;
}

.form-container a:hover {
  text-decoration: underline;
}
EOF
