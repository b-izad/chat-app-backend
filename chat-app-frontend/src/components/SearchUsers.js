// src/SearchUsers.js

import React, { useState } from 'react';

function SearchUsers({ onSelectUser }) {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    if (query.trim()) {
      try {
        const response = await fetch(`http://localhost:5001/api/search?query=${encodeURIComponent(query)}`, {
          method: 'GET',
          credentials: 'include',
        });
        if (response.ok) {
          const data = await response.json();
          setResults(data.results);
        } else {
          console.error('Failed to search users');
        }
      } catch (err) {
        console.error('Error searching users:', err);
      }
    }
  };

  return (
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search for users..."
      />
      <button onClick={handleSearch}>Search</button>
      <ul>
        {results.map((user) => (
          <li key={user.id}>
            {user.username} ({user.email})
            <button onClick={() => onSelectUser(user)}>Add to Contacts</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default SearchUsers;
