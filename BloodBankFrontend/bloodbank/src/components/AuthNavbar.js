// src/components/AuthNavbar.js
import React from 'react';
import { Link } from 'react-router-dom';
import './AuthNavbar.css'; // Your custom CSS file

function AuthNavbar() {
  return (
    // Use a custom class for styling
    <nav className="auth-navbar">
      <div className="container-fluid">
        {/* REMOVED: Brand name/logo */}
        {/* <Link className="navbar-brand brand-text green-text" to="/">
            SANJEEVANI <span className="red-text">DROPS</span>
        </Link> */}
        
        {/* The navigation links, pushed to the right */}
        <ul className="auth-navbar-nav ms-auto"> {/* Use ms-auto for right alignment */}
          <li className="nav-item">
            <Link className="auth-nav-link" to="/login">Login</Link>
          </li>
          <li className="nav-item">
            <Link className="auth-nav-link" to="/signup">Sign Up</Link>
          </li>
          <li className="nav-item">
            <Link className="auth-nav-link" to="/about-us">About Us</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default AuthNavbar;