// src/components/MessageInput.js

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
