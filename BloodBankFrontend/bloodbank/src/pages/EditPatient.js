// src/pages/EditPatient.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PatientService from "../services/PatientService";
import { toast } from 'react-toastify'; // NEW IMPORT

function EditPatient() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [patient, setPatient] = useState({
    name: "",
    bloodGroupRequired: "",
    hospitalName: "",
    location: ""
  });

  useEffect(() => {
    PatientService.getPatientById(id)
      .then((res) => setPatient(res.data))
      .catch((error) => {
        toast.error("Error fetching patient data.");
        console.error(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPatient({ ...patient, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    PatientService.updatePatient(id, patient)
      .then(() => {
        toast.success("Patient updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/patients");
      })
      .catch((error) => {
        toast.error("Error updating patient. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Edit Patient</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Name</label>
          <input name="name" value={patient.name} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Blood Group Needed</label>
          <input name="bloodGroupRequired" value={patient.bloodGroupRequired} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Hospital</label>
          <input name="hospitalName" value={patient.hospitalName} onChange={handleChange} className="form-control" />
        </div>
        <div className="mb-3">
          <label>Location</label>
          <input name="location" value={patient.location} onChange={handleChange} className="form-control" />
        </div>
        <button className="btn btn-success">Update</button>
      </form>
    </div>
  );
}

export default EditPatient;