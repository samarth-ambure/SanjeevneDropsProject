 // src/App.js
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from 'react-toastify'; // NEW IMPORT
import 'react-toastify/dist/ReactToastify.css';

import SplashScreen from "./components/SplashScreen";
import Header from "./components/Header";
import Navbar from "./components/Navbar"; // Your main authenticated Navbar
import AuthNavbar from "./components/AuthNavbar"; // Your unauthenticated Navbar
import { SearchProvider } from './context/SearchContext';

// All your page components
import DonorList from "./pages/DonorList";
import AddDonor from "./pages/AddDonor";
import EditDonor from "./pages/EditDonor";
import PatientList from "./pages/PatientList"; // This is the component that was unused
import AddPatient from "./pages/AddPatient";
import EditPatient from "./pages/EditPatient";
import BloodRequestList from "./pages/BloodRequestList";
import AddBloodRequest from "./pages/AddBloodRequest";
import EditBloodRequest from "./pages/EditBloodRequest";
import BloodStockList from "./pages/BloodStockList";
import AddBloodStock from "./pages/AddBloodStock";
import EditBloodStock from "./pages/EditBloodStock";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import AboutUs from "./pages/AboutUs";

import { AuthProvider, useAuth } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";

const LayoutWrapper = ({ children }) => {
  useAuth();
  const location = useLocation();

  const authPaths = ['/', '/signup', '/login' ,'/about-us'];
  const showAuthNavbar = authPaths.includes(location.pathname);

  return (
    <>
      {showAuthNavbar ? <AuthNavbar /> : <Header />}
      {showAuthNavbar ? null : <Navbar />}
      {children}
    </>
  );
};

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setFadeOut(true);
      setTimeout(() => {
        setShowSplash(false);
      }, 1000);
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Router>
      <SearchProvider>
      <AuthProvider>
        {showSplash && (
          <SplashScreen className={fadeOut ? "fade-out" : ""} />
        )}
        {!showSplash && (
          <LayoutWrapper>
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Signup />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/about-us" element={<AboutUs />} />

              {/* Protected Routes */}
              <Route path="/home" element={<ProtectedRoute><Home /></ProtectedRoute>} />
              <Route path="/donors" element={<ProtectedRoute><DonorList /></ProtectedRoute>} />
              <Route path="/add-donor" element={<ProtectedRoute><AddDonor /></ProtectedRoute>} />
              <Route path="/edit-donor/:id" element={<ProtectedRoute><EditDonor /></ProtectedRoute>} />
              <Route path="/patients" element={<ProtectedRoute><PatientList /></ProtectedRoute>} /> {/* CORRECTED THIS LINE */}
              <Route path="/add-patient" element={<ProtectedRoute><AddPatient /></ProtectedRoute>} />
              <Route path="/edit-patient/:id" element={<ProtectedRoute><EditPatient /></ProtectedRoute>} />
              <Route path="/requests" element={<ProtectedRoute><BloodRequestList /></ProtectedRoute>} />
              <Route path="/add-request" element={<ProtectedRoute><AddBloodRequest /></ProtectedRoute>} />
              <Route path="/edit-request/:id" element={<ProtectedRoute><EditBloodRequest /></ProtectedRoute>} />
              <Route path="/stock" element={<ProtectedRoute><BloodStockList /></ProtectedRoute>} />
              <Route path="/add-stock" element={<ProtectedRoute><AddBloodStock /></ProtectedRoute>} />
              <Route path="/edit-stock/:id" element={<ProtectedRoute><EditBloodStock /></ProtectedRoute>} />
            </Routes>
          </LayoutWrapper>
        )}
      </AuthProvider>
      </SearchProvider>
       <ToastContainer />
    </Router>
  );
}

export default App;