// src/pages/AddDonor.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import donorService from "../services/DonorService";
import { toast } from 'react-toastify'; // NEW IMPORT

function AddDonor() {
  const [donor, setDonor] = useState({
    name: "",
    bloodGroup: "",
    location: "",
    lastDonationDate: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonor({ ...donor, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    donorService
      .createDonor(donor)
      .then(() => {
        toast.success("Donor added successfully!", { // NEW: Use toast.success
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        navigate("/donors");
      })
      .catch((error) => {
        toast.error("Error adding donor. Please try again.", { // NEW: Use toast.error
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
        });
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add Donor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            className="form-control"
            value={donor.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            className="form-control"
            value={donor.bloodGroup}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            name="location"
            className="form-control"
            value={donor.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="mb-3">
          <label>Last Donation Date</label>
          <input
            type="date"
            name="lastDonationDate"
            className="form-control"
            value={donor.lastDonationDate}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="btn btn-success">
          Save
        </button>
      </form>
    </div>
  );
}

export default AddDonor;