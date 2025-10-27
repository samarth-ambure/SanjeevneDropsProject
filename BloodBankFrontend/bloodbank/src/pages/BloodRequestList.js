// src/pages/BloodRequestList.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BloodRequestService from "../services/BloodRequestService";
import { toast } from 'react-toastify';
import { useSearch } from '../context/SearchContext'; // NEW IMPORT

function BloodRequestList() {
  const [allRequests, setAllRequests] = useState([]); // Store the full list
  const [filteredRequests, setFilteredRequests] = useState([]); // State for the list to be displayed
  const { searchTerm } = useSearch(); // Get the searchTerm from context

  useEffect(() => {
    fetchRequests();
  }, []);

  // Filter requests whenever the searchTerm or the full list changes
  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const results = allRequests.filter(req =>
      (req.patient?.name?.toLowerCase() || '').includes(lowercasedSearchTerm) ||
      (req.bloodGroup?.toLowerCase() || '').includes(lowercasedSearchTerm) ||
      (req.status?.toLowerCase() || '').includes(lowercasedSearchTerm)
    );
    setFilteredRequests(results);
  }, [searchTerm, allRequests]);


  const fetchRequests = () => {
    BloodRequestService.getAllRequests()
      .then((res) => setAllRequests(res.data))
      .catch((error) => {
        toast.error("Error fetching blood requests.");
        console.error(error);
      });
  };

  const deleteRequest = (id) => {
    if (window.confirm("Delete this blood request?")) {
      BloodRequestService.deleteRequest(id)
        .then(() => {
          toast.success("Blood request deleted successfully!", { autoClose: 3000 });
          fetchRequests();
        })
        .catch((error) => {
          toast.error("Error deleting blood request.");
          console.error(error);
        });
    }
  };

  const fulfillRequest = (id) => {
    if (window.confirm("Mark this request as fulfilled?")) {
      BloodRequestService.fulfillRequest(id)
        .then(() => {
          toast.success("Request fulfilled successfully!", { autoClose: 3000 });
          fetchRequests();
        })
        .catch((error) => {
          toast.error("Failed to fulfill request. Check if stock is still available.");
          console.error(error);
        });
    }
  };

  const getStatusBadge = (status) => {
    switch (status) {
      case "Approved":
        return "badge bg-success";
      case "Fulfilled":
        return "badge bg-primary";
      default:
        return "badge bg-warning text-dark";
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2>Blood Requests</h2>
        <Link to="/add-request" className="btn btn-primary">
          Add Request
        </Link>
      </div>

      <table className="table table-striped table-bordered shadow">
        <thead className="table-dark">
          <tr>
            <th>Patient Name</th>
            <th>Blood Group</th>
            <th>Units Required</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRequests.map((req) => (
            <tr key={req.id}>
              <td>{req.patient?.name}</td>
              <td>{req.bloodGroup}</td>
              <td>{req.unitsRequired}</td>
              <td>
                <span className={getStatusBadge(req.status)}>{req.status}</span>
              </td>
              <td>
                {req.status === "Approved" && (
                  <button onClick={() => fulfillRequest(req.id)} className="btn btn-success btn-sm me-2">
                    Fulfill
                  </button>
                )}
                <Link to={`/edit-request/${req.id}`} className="btn btn-warning btn-sm me-2">
                  Edit
                </Link>
                <button onClick={() => deleteRequest(req.id)} className="btn btn-danger btn-sm">
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BloodRequestList;