import React, { useState, useEffect } from 'react';
import '../styles/Chat.css';
import ContactList from './ContactList';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch('http://localhost:5001/api/contacts', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json'
          },
        });
        if (response.ok) {
          const data = await response.json();
          setContacts(data.contacts);
        } else {
          console.error('Failed to fetch contacts');
        }
      } catch (err) {
        console.error('Failed to fetch contacts:', err);
      }
    }

    async function fetchCurrentUser() {
      try {
        const response = await fetch('http://localhost:5001/api/profile', {
          method: 'GET',
        });
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.profile);
        } else {
          console.error('Failed to fetch current user');
        }
      } catch (err) {
        console.error('Failed to fetch current user:', err);
      }
    }

    fetchContacts();
    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (selectedContact) {
      async function fetchMessages() {
        try {
          const response = await fetch(`http://localhost:5001/api/messages/${selectedContact.id}`, {
            method: 'GET',
          });
          if (response.ok) {
            const data = await response.json();
            setMessages(data.messages);
          } else {
            console.error('Failed to fetch messages');
          }
        } catch (err) {
          console.error('Failed to fetch messages:', err);
        }
      }
      fetchMessages();
    }
  }, [selectedContact]);

  const handleSendMessage = async (content) => {
    if (selectedContact && content.trim()) {
      try {
        const response = await fetch('http://localhost:5001/api/messages', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({ recipient_id: selectedContact.id, content, sender_id: currentUser.id }),
        });
        if (response.ok) {
          const newMessage = await response.json();
          setMessages([...messages, newMessage]);
        } else {
          console.error('Failed to send message');
        }
      } catch (err) {
        console.error('Failed to send message:', err);
      }
    }
  };

  return (
    <div className="chat-container">
      <ContactList contacts={contacts} onSelectContact={setSelectedContact} />
      <div className="chat-window">
        {selectedContact ? (
          <>
            <MessageList messages={messages} currentUser={currentUser} />
            <MessageInput onSendMessage={handleSendMessage} />
          </>
        ) : (
          <div className="select-contact-message">Please select a contact to start chatting.</div>
        )}
      </div>
    </div>
  );
}

export default Chat;
