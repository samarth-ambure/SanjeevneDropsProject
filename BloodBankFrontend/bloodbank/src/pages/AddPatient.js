// src/pages/AddPatient.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import PatientService from "../services/PatientService";
import { toast } from 'react-toastify'; // NEW IMPORT

function AddPatient() {
  const [patient, setPatient] = useState({
    name: "",
    bloodGroupRequired: "",
    hospitalName: "",
    location: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PatientService.createPatient(patient)
      .then(() => {
        toast.success("Patient added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/patients");
      })
      .catch((error) => {
        toast.error("Error adding patient. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={patient.name}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Blood Group Required</label>
          <input
            type="text"
            name="bloodGroupRequired"
            value={patient.bloodGroupRequired}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Hospital Name</label>
          <input
            type="text"
            name="hospitalName"
            value={patient.hospitalName}
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
            value={patient.location}
            onChange={handleChange}
            className="form-control"
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

export default AddPatient;