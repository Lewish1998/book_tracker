import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (username.length < 3) {
      setMessage("Username must be at least 3 characters")
      return
    } else if (password.length < 5) {
      setMessage("Password must be at least 5 characters")
      return
    }

    fetch('http://localhost:5000/register', {
      method: 'POST', 
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ username, password })
    })
    .then(response => {
      console.log(response)
      if (response.status === 201) {
        setMessage("Registration successful!")
        setUsername('')
        setPassword('')
        navigate('/login')
      } else {
        setMessage("Registration failed.")
        setPassword('')
      }
    })
  }

  // OLD CODE
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log(data);
  //     setMessage(data.message);
  //     setUsername('');
  //     setPassword('');
  //   })
  //   .catch((error) => {
  //     console.error('Error registering', error);
  //   });
  // };


  return (
    <>
    <h1>Register</h1>
    {message && <h4>{message}</h4>}
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
    </>
  );
};

export default RegisterPage;