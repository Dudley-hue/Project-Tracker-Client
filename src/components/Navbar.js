import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';

const Navbar = ({ isAuthenticated, onLogout }) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Call the passed logout function
    navigate('/login'); // Redirect to login page
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(prevState => !prevState);
  };

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <header className="navbar">
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        {isAuthenticated ? (
          <>
            <li><Link to="/admin">Admin</Link></li>
            <li><Link to="/recent-projects">Recent Projects</Link></li>
            <li><button onClick={handleLogout}>Logout</button></li>
          </>
        ) : (
          <li className="profile-dropdown" ref={dropdownRef}>
            <button onClick={toggleDropdown}>Profile</button>
            {isDropdownOpen && (
              <ul className="dropdown-menu">
                <li><Link to="/login" onClick={() => setIsDropdownOpen(false)}>Login</Link></li>
                <li><Link to="/register" onClick={() => setIsDropdownOpen(false)}>Register</Link></li>
              </ul>
            )}
          </li>
        )}
      </ul>
    </header>
  );
};

export default Navbar;
