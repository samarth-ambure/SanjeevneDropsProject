// src/components/SplashScreen.js
import React from 'react';
// REMOVE THIS LINE: import logo from '../assets/logo.png'; // No longer needed if in public folder
import './SplashScreen.css'; // Keep this CSS import

const SplashScreen = () => {
  return (
    <div className="splash-screen">
      {/* Reference the image directly from the public folder */}
      <img src="/logo.png" alt="Sanjeevani Drops Logo" className="splash-logo" />
      {/* Optional: Add a loading spinner or text */}
      {/* <div className="loading-text">Loading...</div> */}
    </div>
  );
};

export default SplashScreen;