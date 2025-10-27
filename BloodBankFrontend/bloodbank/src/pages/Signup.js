import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { toast } from 'react-toastify'; // NEW IMPORT

function Signup() {
  const [formData, setFormData] = useState({ 
    username: "", 
    password: "",
    email: "", // NEW FIELD
    city: ""   // NEW FIELD
  });
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // The payload only includes username and password to avoid backend changes
    const registrationPayload = {
      username: formData.username,
      password: formData.password
    };

    try {
      await axios.post("http://localhost:8080/api/auth/register", registrationPayload);
      toast.success("Registration successful, please login!", { // NEW: Use toast.success
        position: "top-right",
        autoClose: 3000,
      });
      navigate("/login");
    } catch (err) {
      toast.error("Error during registration. Please try again.", { // NEW: Use toast.error
        position: "top-right",
        autoClose: 3000,
      });
      console.error(err);
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-3" style={{ color: "green" }}>
          SANJEEVANI <span style={{ color: "red" }}>DROPS</span>
        </h3>
        <h5 className="text-center mb-4" style={{ color: "#444" }}>Sign Up</h5>

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label>Username</label>
            <input
              type="text"
              name="username"
              className="form-control"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>

          {/* NEW: Email Input */}
          <div className="mb-3">
            <label>Email</label>
            <input
              type="email"
              name="email"
              className="form-control"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="mb-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              className="form-control"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <button type="submit" className="btn w-100" style={{ backgroundColor: "red", color: "white" }}>
            Sign Up
          </button>
        </form>
        <p className="text-center mt-3">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Signup;