// src/pages/EditDonor.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import DonorService from "../services/DonorService";
import { toast } from 'react-toastify'; // NEW IMPORT

function EditDonor() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [donor, setDonor] = useState({
    name: "",
    bloodGroup: "",
    location: "",
  });

  useEffect(() => {
    DonorService.getDonorById(id)
      .then((response) => {
        setDonor(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching donor data.");
        console.error(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDonor({ ...donor, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    DonorService.updateDonor(id, donor)
      .then(() => {
        toast.success("Donor updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/donors");
      })
      .catch((error) => {
        toast.error("Error updating donor. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Edit Donor</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={donor.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Blood Group</label>
          <input
            type="text"
            name="bloodGroup"
            value={donor.bloodGroup}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Location</label>
          <input
            type="text"
            name="location"
            value={donor.location}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button type="submit" className="btn btn-success">
          Update
        </button>
      </form>
    </div>
  );
}

export default EditDonor;