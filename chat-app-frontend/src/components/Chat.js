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
    async function fetchCurrentUser() {
      try {
        const response = await fetch('http://localhost:5001/api/profile', {
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

    async function fetchContacts() {
      try {
        const response = await fetch('http://localhost:5001/api/contacts', {
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

    fetchCurrentUser();
  }, []);

  useEffect(() => {
    if (selectedContact) {
      async function fetchMessages() {
        try {
          const response = await fetch(`http://localhost:5001/api/messages/${selectedContact.id}`, {
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
        const response = await fetch('http://localhost:5001/api/messages', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ recipient_id: selectedContact.id, content }),
        });
        if (response.ok) {
          const newMessage = await response.json();
          setMessages((prevMessages) => [...prevMessages, newMessage.message]);
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
      const contactExists = contacts.some(contact => contact.id === user.id);
      if (contactExists) {
        alert('Contact already exists in your list.');
        return;
      }

      try {
        const response = await fetch('http://localhost:5001/api/contacts/add', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include',
          body: JSON.stringify({ contactId: user.id }),
        });
        if (response.ok) {
          const data = await response.json();
          if (data.success && data.contact) {
            setContacts((prevContacts) => [...prevContacts, data.contact]);
            console.log('Contact added:', data.contact);
          } else {
            console.error('Failed to add contact:', data.error || 'Unexpected response structure');
          }
        } else if (response.status === 409) {
          alert('This contact is already in your list.');
        } else {
          console.error('Failed to add contact:', response.status, response.statusText);
        }
      } catch (err) {
        console.error('Failed to add contact:', err);
      }
    } else {
      console.error('Current user is not set');
    }
  };

  const handleLogout = async () => {
    try {
      const response = await fetch('http://localhost:5001/logout', {
        method: 'POST',
        credentials: 'include',
      });
      if (response.ok) {
        setCurrentUser(null);
        setContacts([]);
        setMessages([]);
        setSelectedContact(null);
        console.log('Logged out successfully');
      } else {
        console.error('Failed to log out');
      }
    } catch (err) {
      console.error('Failed to log out:', err);
    }
  };

  return (
    <div className="chat-container">
      {currentUser && (
        <>
          <div className="header">
            <h2>Welcome, {currentUser.username}</h2>
            <button onClick={handleLogout}>Logout</button>
          </div>
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
        </>
      )}
      {!currentUser && <div>Please log in to view your chat and contacts.</div>}
    </div>
  );
}

export default Chat;
