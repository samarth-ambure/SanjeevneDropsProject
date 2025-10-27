// src/components/Navbar.js

import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useSearch } from '../context/SearchContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; // NEW IMPORT
import { faSearch } from '@fortawesome/free-solid-svg-icons'; // NEW IMPORT
import './Navbar.css';

function Navbar() {
  const { isAuthenticated, logout } = useAuth();
  const { searchTerm, setSearchTerm } = useSearch();

  const handleLogout = () => {
    logout();
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <nav className="custom-navbar navbar navbar-expand-lg">
      <div className="container-fluid">
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarNav">
          {/* Main Navigation Links */}
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className="nav-link" to="/home">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/donors">Donors</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/patients">Patients</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/requests">Requests</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/stock">Stock</Link>
            </li>
          </ul>

          {/* Search Bar and Logout Section */}
          <div className="navbar-search-logout-container d-flex align-items-center">
            {isAuthenticated && (
              <>
                {/* Search Bar with Icon */}
                <div className="search-bar-container me-3">
                  <div className="search-input-wrapper">
                    <FontAwesomeIcon icon={faSearch} className="search-icon" />
                    <input
                      type="text"
                      className="form-control search-input"
                      placeholder="Search..."
                      value={searchTerm}
                      onChange={handleSearchChange}
                    />
                  </div>
                </div>
                {/* Logout Button */}
                <button className="btn btn-danger nav-link-eclipse" onClick={handleLogout}>
                  Logout
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;