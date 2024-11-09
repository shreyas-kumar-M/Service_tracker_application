import React, { useState, useEffect } from 'react';
import './App.css';
import Login from './Login';
import Hero from './Hero';
import Navigation from './Navi';

function App() {
  // Initialize state from local storage
  const [loggedin, setLoggedin] = useState(() => {
    return localStorage.getItem('loggedin') === 'true';
  });

  // Function to handle successful login
  const handleLoginSuccess = () => {
    console.log('User logged in successfully!');
    setLoggedin(true);
    localStorage.setItem('loggedin', 'true'); // Store state in local storage
  };

  const handleLogout = () => {
    setLoggedin(false);
    localStorage.removeItem('loggedin'); // Remove state from local storage
    console.log('User logged out');
  };

  const handleSearch = (query) => {
    console.log('Search query:', query);
  };

  return (
    <div className="App">
      {/* Render the Navigation component at the top after login */}
      {/* {loggedin && <Navigation logout={handleLogout} />} */}
      
      {/* Render the Login component when not logged in */}
      {!loggedin && <Login onLoginSuccess={handleLoginSuccess} />}
      
      {/* Render the Hero component after login */}
      {loggedin && <Hero handleLogout={handleLogout}/>}
    </div>
  );
}

export default App;
