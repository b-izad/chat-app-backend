// src/components/UserProfile.js
import React, { useState, useEffect } from 'react';
import '../styles/UserProfile.css';

function UserProfile() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      try {
        const response = await fetch('http://localhost:5001/api/profile');
        if (response.ok) {
          const data = await response.json();
          setProfile(data.profile);
        }
      } catch (err) {
        console.error('Failed to fetch profile:', err);
      }
    }
    
    fetchProfile();
  }, []);

  if (!profile) return <div>Loading...</div>;

  return (
    <div className="user-profile">
      <img src="path/to/profile-picture.jpg" alt="Profile" className="profile-picture" />
      <h2>{profile.username}</h2>
      <p>Email: {profile.email}</p>
      {/* Add form to update profile information */}
    </div>
  );
}

export default UserProfile;
