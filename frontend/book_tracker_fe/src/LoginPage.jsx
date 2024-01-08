import React, { useState } from 'react';
import axios from 'axios'; // Make sure to install this package
import { useNavigate } from 'react-router-dom';
const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username, password })
      });
      const data = await response.json();
      const token = data.token;

      // Store the token in local storage
      localStorage.setItem('token', token);
      console.log(token);
      console.log('Login successful!')

      // Redirect the user to the home page or dashboard
      navigate('/books')
    } catch (error) {
      console.error('Error logging in', error);
      // Handle error, show error message, etc.
    }
  };

  return (
    <>
    <h1>Login</h1>
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Log in" />
    </form>
    </>
  );
};

export default LoginPage;