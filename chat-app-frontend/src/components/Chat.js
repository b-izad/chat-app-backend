import React, { useState, useEffect } from 'react';
import '../styles/Chat.css';
import ContactList from './ContactList';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import SearchUsers from './SearchUsers';

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [selectedContact, setSelectedContact] = useState(null);
  const [messages, setMessages] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    async function fetchContacts() {
      try {
        const response = await fetch('http://localhost:5000/api/contacts', {
          method: 'GET',
          credentials: 'include',
          headers: { 'Content-Type': 'application/json' },
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
        const response = await fetch('http://localhost:5000/api/profile', {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setCurrentUser(data.profile);
          await fetchContacts(); // Fetch contacts after getting the profile
        } else {
          console.error('Failed to fetch current user');
        }
      } catch (err) {
        console.error('Failed to fetch current user:', err);
      }
    }

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (selectedContact) {
      async function fetchMessages() {
        try {
          const response = await fetch(`http://localhost:5000/api/messages/${selectedContact.id}`, {
            method: 'GET',
            credentials: 'include',
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
        const response = await fetch('http://localhost:5000/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ recipient_id: selectedContact.id, content }),
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

  const handleAddContact = async (user) => {
    if (currentUser) {
      try {
        const response = await fetch('http://localhost:5000/api/contacts/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ userId: currentUser.id, contactId: user.id }),
        });
        if (response.ok) {
          const newContact = await response.json();
          setContacts([...contacts, newContact.contact]);
        } else {
          console.error('Failed to add contact');
        }
      } catch (err) {
        console.error('Failed to add contact:', err);
      }
    }
  };

  return (
    <div className="chat-container">
      <SearchUsers onSelectUser={handleAddContact} />
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
