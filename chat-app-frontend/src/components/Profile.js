// src/components/Chat.js
import React, { useState, useEffect } from 'react';
import '../styles/Chat.css';
import ContactList from './ContactList';
import MessageInput from './MessageInput';

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);

  useEffect(() => {
    // Fetch contacts from the server
    fetch('/api/contacts')
      .then((response) => response.json())
      .then((data) => setContacts(data.contacts));
  }, []);

  useEffect(() => {
    if (selectedContact) {
      // Fetch messages for the selected contact
      fetch(`/api/messages/${selectedContact.id}`)
        .then((response) => response.json())
        .then((data) => setMessages(data.messages));
    }
  }, [selectedContact]);

  const handleSendMessage = (text) => {
    const newMessage = {
      content: text,
      sender_id: 'current_user_id', // replace with actual user ID
      recipient_id: selectedContact.id,
    };

    // Send message to server
    fetch('/api/messages', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(newMessage),
    })
      .then((response) => response.json())
      .then((message) => setMessages([...messages, message]));
  };

  const handleLikeMessage = (messageId) => {
    // Send like request to server
    fetch(`/api/messages/${messageId}/like`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((updatedMessage) => {
        setMessages(
          messages.map((msg) => (msg.id === updatedMessage.id ? updatedMessage : msg))
        );
      });
  };

  return (
    <div className="chat-container">
      <ContactList contacts={contacts} onSelectContact={setSelectedContact} />
      <div className="chat-window">
        <div className="message-list">
          {messages.map((msg, index) => (
            <div key={index} className={`message ${msg.sender_id === 'current_user_id' ? 'sent' : 'received'}`}>
              <p>{msg.content}</p>
              <span className="timestamp">{new Date(msg.timestamp).toLocaleTimeString()}</span>
              <button onClick={() => handleLikeMessage(msg.id)}>Like</button>
            </div>
          ))}
        </div>
        <MessageInput onSendMessage={handleSendMessage} />
      </div>
    </div>
  );
}

export default Chat;
