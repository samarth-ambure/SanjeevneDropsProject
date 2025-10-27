// src/pages/AddBloodRequest.js

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import BloodRequestService from "../services/BloodRequestService";
import PatientService from "../services/PatientService";
import { toast } from 'react-toastify'; // NEW IMPORT

function AddBloodRequest() {
  const [patients, setPatients] = useState([]);
  const [request, setRequest] = useState({
    patientId: "",
    bloodGroup: "",
    unitsRequired: "",
    status: "Pending"
  });

  const navigate = useNavigate();

  useEffect(() => {
    PatientService.getAllPatients().then((res) => setPatients(res.data));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const payload = {
      patient: { id: request.patientId },
      bloodGroup: request.bloodGroup,
      unitsRequired: request.unitsRequired,
      status: request.status
    };

    BloodRequestService.createRequest(payload)
      .then((res) => {
        if (res.data.status === "Approved") {
          toast.success(`Blood request for ${res.data.bloodGroup} approved!`, {
            position: "top-right",
            autoClose: 3000,
          });
        } else {
          toast.warn(`Request for ${res.data.bloodGroup} pending due to low stock.`, {
            position: "top-right",
            autoClose: 3000,
          });
        }
        navigate("/requests");
      })
      .catch((error) => {
        toast.error("Error creating blood request.", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add Blood Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Patient</label>
          <select
            name="patientId"
            value={request.patientId}
            onChange={handleChange}
            className="form-control"
            required
          >
            <option value="">-- Select Patient --</option>
            {patients.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} ({p.bloodGroupRequired})
              </option>
            ))}
          </select>
        </div>
        <div className="mb-3">
          <label>Blood Group</label>
          <input
            name="bloodGroup"
            value={request.bloodGroup}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Units Required</label>
          <input
            name="unitsRequired"
            type="number"
            value={request.unitsRequired}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <select
            name="status"
            value={request.status}
            onChange={handleChange}
            className="form-control"
            disabled
          >
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Fulfilled">Fulfilled</option>
          </select>
        </div>
        <button className="btn btn-success">Save</button>
      </form>
    </div>
  );
}

export default AddBloodRequest;