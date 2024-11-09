import React, { useState } from 'react';
import { userDetail } from './objects';

function Login({ onLoginSuccess }) {
  const [user, setUser] = useState({ username: '', password: '' });
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Simple validation
    if (user.username === '' || user.password === '') {
      setErrorMessage('Both fields are required.');
    } else if (user.username !== userDetail.username || user.password !== userDetail.password) {
      setErrorMessage('Incorrect username and password, try again !!!');
      setUser({ username: '', password: '' });
    } else {
      setErrorMessage('');
      // Trigger login success callback
      onLoginSuccess();
      // Reset the form
      setUser({ username: '', password: '' });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <div className="login-container">
      <div className="login--heading">
        <h2>LOGIN</h2>
      </div>
      {errorMessage && <p className="error">{errorMessage}</p>}
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            value={user.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
        </div>
        <div className="input-group">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            value={user.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        </div>
        <button type="submit" className='login-btn'>Login</button>
      </form>
    </div>
  );
}

export default Login;