import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import { useNavigate } from 'react-router-dom'; 
import './nav_bar.css'; // Import custom CSS for styling

const Navbar = () => {
  const navigate = useNavigate(); // Access the history object
  const [isLoggedIn, setIsLoggedIn] = useState(true); // State to track login status

  // Function to handle navigation to ProfilePage
  const handleProfileClick = () => {
    // Redirect to ProfilePage when Edit Profile is clicked
    navigate('/profile_page'); 
  };

  return (
    <nav className="navbar navbar-light bg-light">
      <span className="navbar-brand mb-0 h1">Patient Tracker</span>
      {isLoggedIn && (
        <button className="btn btn-sm btn-outline-primary ml-auto" onClick={handleProfileClick}>
          Edit Profile
        </button>
      )}
    </nav>
  );
};

export default Navbar;
