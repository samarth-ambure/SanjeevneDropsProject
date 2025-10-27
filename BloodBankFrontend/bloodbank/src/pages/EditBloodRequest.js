// src/pages/EditBloodRequest.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BloodRequestService from "../services/BloodRequestService";
import { toast } from 'react-toastify'; // NEW IMPORT

function EditBloodRequest() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [request, setRequest] = useState({
    patientName: "",
    bloodGroup: "",
    unitsRequired: "",
    status: "Pending"
  });

  useEffect(() => {
    BloodRequestService.getRequestById(id)
      .then((res) => setRequest(res.data))
      .catch((error) => {
        toast.error("Error fetching blood request data.");
        console.error(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRequest({ ...request, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    BloodRequestService.updateRequest(id, request)
      .then(() => {
        toast.success("Blood request updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/requests");
      })
      .catch((error) => {
        toast.error("Error updating blood request. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Edit Blood Request</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Patient Name</label>
          <input
            name="patientName"
            value={request.patientName}
            onChange={handleChange}
            className="form-control"
          />
        </div>
        <div className="mb-3">
          <label>Blood Group</label>
          <input
            name="bloodGroup"
            value={request.bloodGroup}
            onChange={handleChange}
            className="form-control"
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
          />
        </div>
        <div className="mb-3">
          <label>Status</label>
          <select name="status" value={request.status} onChange={handleChange} className="form-control">
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Fulfilled">Fulfilled</option>
          </select>
        </div>
        <button className="btn btn-success">Update</button>
      </form>
    </div>
  );
}

export default EditBloodRequest;