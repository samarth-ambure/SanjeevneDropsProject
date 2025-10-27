import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUserPlus, faSearch, faHandHoldingHeart, faHeartPulse, faMapMarkerAlt } from '@fortawesome/free-solid-svg-icons'; // NEW ICON IMPORT
import './Home.css';


function Home() {

  const findNearestBloodBank = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const latitude = position.coords.latitude;
          const longitude = position.coords.longitude;
          
          // Construct Google Maps URL for searching "blood bank" near current location
          // The 'query' parameter is used for search terms.
          // The 'q' parameter in maps.google.com also works well for searching nearby.
          // The 'z' parameter is for zoom level (e.g., 15z for a good street level zoom)
          const googleMapsUrl = `https://www.google.com/maps/search/blood+bank/@${latitude},${longitude},15z`;
          
          window.open(googleMapsUrl, '_blank'); // Open in a new tab
        },
        (error) => {
          // Handle errors here (e.g., user denied location, location unavailable)
          switch (error.code) {
            case error.PERMISSION_DENIED:
              alert("Location permission denied. Please enable location services in your browser to find nearest blood banks.");
              break;
            case error.POSITION_UNAVAILABLE:
              alert("Location information is unavailable. Please try again later.");
              break;
            case error.TIMEOUT:
              alert("The request to get user location timed out. Please try again.");
              break;
            case error.UNKNOWN_ERROR:
              alert("An unknown error occurred while trying to get your location.");
              break;
            default:
              alert("Error getting your location: " + error.message);
          }
        },
        { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 } // Options for getCurrentPosition
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  return (
    <div className="home-page-container">
      {/* Hero Section */}
      <div className="text-center p-5 bg-light rounded shadow-sm mb-4 hero-section">
        <h1 className="display-5 fw-bold text-danger">Your Donation Can Save a Life Today.</h1>
        <p className="lead">
          Join our community of donors and help patients in need. Your contribution can make a huge difference.
        </p>
        <div className="mt-3">
          <Link to="/add-donor" className="btn btn-danger btn-lg me-3">
            Create New Donor
          </Link>
          <Link to="/requests" className="btn btn-outline-danger btn-lg me-3"> {/* Added me-3 for spacing */}
            Add Patients Request 
          </Link>
          {/* NEW BUTTON: Find Nearest Blood Bank */}
          <button className="btn btn-primary btn-lg" onClick={findNearestBloodBank}>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="me-2" /> Other Blood Bank
          </button>
        </div>
      </div>

      {/* Stats Section */}
      <div className="row text-center stats-section">
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-danger">250+</h3>
              <p className="mb-0">Registered Donors</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-danger">120+</h3>
              <p className="mb-0">Blood Requests Fulfilled</p>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-3">
          <div className="card shadow-sm">
            <div className="card-body">
              <h3 className="text-danger">8+</h3>
              <p className="mb-0">Blood Banks Connected</p>
            </div>
          </div>
        </div>
      </div>

      {/* How It Works Section */}
      <section className="how-it-works-section container py-5">
        <h2 className="text-center mb-5 display-6 fw-bold text-primary">How It Works</h2>
        <div className="row justify-content-center">
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="step-card text-center p-4 rounded shadow-sm">
              <FontAwesomeIcon icon={faUserPlus} size="3x" className="text-danger" />
              <h4 className="fw-bold text-dark">1. Register & Login</h4>
              <p className="text-muted">Create your secure account to access all features.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="step-card text-center p-4 rounded shadow-sm">
              <FontAwesomeIcon icon={faSearch} size="3x" className="text-danger" />
              <h4 className="fw-bold text-dark">2. Find or Request</h4>
              <p className="text-muted">Explore donation camps nearby or submit your blood request easily.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="step-card text-center p-4 rounded shadow-sm">
              <FontAwesomeIcon icon={faHandHoldingHeart} size="3x" className="text-danger" />
              <h4 className="fw-bold text-dark">3. Contribute or Receive</h4>
              <p className="text-muted">Donate blood to help others or get the help you need.</p>
            </div>
          </div>
          <div className="col-lg-3 col-md-6 mb-4">
            <div className="step-card text-center p-4 rounded shadow-sm">
              <FontAwesomeIcon icon={faHeartPulse} size="3x" className="text-danger" />
              <h4 className="fw-bold text-dark">4. Save Lives</h4>
              <p className="text-muted">Be a part of a vital community effort to save precious lives.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;