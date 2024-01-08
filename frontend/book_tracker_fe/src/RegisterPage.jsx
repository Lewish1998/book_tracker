import React, { useState } from 'react';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();

    fetch('http://localhost:5000/register', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
  };
  
    // try {
    //   const response = await fetch('http://localhost:5000/register', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({ username, password })
    //   });

    //   const data = await response.json();

    //   if (response.ok) {
    //     console.log(data);
    //     // Handle successful registration, redirect user, etc.
    //   } else {
    //     throw new Error(data.message);
    //   }
    // } catch (error) {
    //   console.error('Error registering', error);
    //   // Handle error, show error message, etc.
    // }

  return (
    <form onSubmit={handleSubmit}>
      <label>
        Username:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <input type="submit" value="Register" />
    </form>
  );
};

export default RegisterPage;