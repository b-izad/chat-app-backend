import React, { useState } from 'react';
import '../styles/Forms.css';

function SignIn() {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    console.log('Attempting sign-in with:', formData);

    try {
      const response = await fetch('http://127.0.0.1:5001/login', {  // Use local mock API URL
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('Error response:', errorData);
        throw new Error(errorData.message || 'Sign in failed');
      }

      const data = await response.json();
      console.log('Sign in successful:', data);
      // Handle successful sign-in (e.g., store token, redirect user)
      localStorage.setItem('authToken', 'exampleToken'); // Mock token storage
      window.location.href = '/chat'; // Redirect to chat page

    } catch (err) {
      console.error('Sign-in error:', err);
      setError(err.message || 'An error occurred during sign-in');
    }
  };

  return (
    <div className="form-container">
      <h2>Sign In</h2>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="username"
          placeholder="Username or Email"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <a href="/signup">Don't have an account? Sign Up</a>
      <a href="/forgot-password">Forgot Password?</a>
    </div>
  );
}

export default SignIn;
