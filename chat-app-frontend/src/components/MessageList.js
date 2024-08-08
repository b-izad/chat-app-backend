import React from 'react';
import '../styles/Chat.css';

function MessageList({ messages, currentUser }) {
  return (
    <div className="message-list">
      {messages.map((msg) => (
        <div
          key={msg.id}
          className={`message ${msg.sender_id === currentUser?.id ? 'sent' : 'received'}`}
        >
          <p>{msg.content}</p>
          <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
        </div>
      ))}
    </div>
  );
}

export default MessageList;
