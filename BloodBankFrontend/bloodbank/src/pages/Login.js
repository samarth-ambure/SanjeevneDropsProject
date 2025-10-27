import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext"; // NEW IMPORT
import { Link } from "react-router-dom"; // NEW IMPORT for Signup link

function Login() {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const { login } = useAuth(); // Use the login function from context

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post("http://localhost:8080/api/auth/login", formData);
      login(response.data); // Call context's login function with the token
      // alert("Login Successful");
      // navigate is now handled by the context's login function
    } catch (err) {
      alert("Invalid username or password");
    }
  };

  return (
    <div className="d-flex justify-content-center align-items-center" style={{ height: "80vh" }}>
      <div className="card shadow p-4" style={{ width: "350px" }}>
        <h3 className="text-center mb-3" style={{ color: "green" }}>
          SANJEEVANI <span style={{ color: "red" }}>DROPS</span>
        </h3>
        <h5 className="text-center mb-4" style={{ color: "#444" }}>Login</h5>

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

          <button type="submit" className="btn w-100" style={{ backgroundColor: "green", color: "white" }}>
            Login
          </button>
        </form>
        <p className="text-center mt-3">
          Don't have an account? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;