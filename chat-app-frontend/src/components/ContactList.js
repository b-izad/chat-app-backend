import React from 'react';


function ContactList({ contacts, onSelectContact }) {
  return (
    <div className="contact-list">
      {contacts.map((contact) => (
        <div
          key={contact.id}
          className="contact-list-item"
          onClick={() => onSelectContact(contact)}
        >
          <div className="avatar">{contact.name.charAt(0)}</div>
          <div className="contact-info">
            <p className="contact-name">{contact.name}</p>
            <p className="status">{contact.email}</p>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ContactList;
