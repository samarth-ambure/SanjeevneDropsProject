// src/pages/PatientList.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PatientService from "../services/PatientService";
import { toast } from 'react-toastify';
import { useSearch } from '../context/SearchContext'; // NEW IMPORT

function PatientList() {
  const [allPatients, setAllPatients] = useState([]); // Store the full list
  const [filteredPatients, setFilteredPatients] = useState([]); // State for the list to be displayed
  const { searchTerm } = useSearch(); // Get the searchTerm from context

  useEffect(() => {
    fetchPatients();
  }, []);

  // Filter patients whenever the searchTerm or the full list changes
  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const results = allPatients.filter(patient =>
      patient.name.toLowerCase().includes(lowercasedSearchTerm) ||
      patient.bloodGroupRequired.toLowerCase().includes(lowercasedSearchTerm) ||
      patient.hospitalName.toLowerCase().includes(lowercasedSearchTerm) ||
      patient.location.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredPatients(results);
  }, [searchTerm, allPatients]);


  const fetchPatients = () => {
    PatientService.getAllPatients()
      .then((response) => {
        setAllPatients(response.data);
      })
      .catch((error) => {
        toast.error("Error fetching patient data.");
        console.error(error);
      });
  };

  const deletePatient = (id) => {
    if (window.confirm("Are you sure to delete this patient?")) {
      PatientService.deletePatient(id)
        .then(() => {
          toast.success("Patient deleted successfully!", {
            position: "top-right",
            autoClose: 3000,
          });
          fetchPatients();
        })
        .catch((error) => {
          toast.error("Error deleting patient.");
          console.error(error);
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Patient List</h2>
      <Link to="/add-patient" className="btn btn-primary mb-2">
        Add Patient
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Blood Group Required</th>
            <th>Hospital Name</th>
            <th>Location</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredPatients.map((patient) => (
            <tr key={patient.id}>
              <td>{patient.id}</td>
              <td>{patient.name}</td>
              <td>{patient.bloodGroupRequired}</td>
              <td>{patient.hospitalName}</td>
              <td>{patient.location}</td>
              <td>
                <Link to={`/edit-patient/${patient.id}`} className="btn btn-warning btn-sm me-2">
                  Edit
                </Link>
                <button
                  onClick={() => deletePatient(patient.id)}
                  className="btn btn-danger btn-sm"
                >
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

export default PatientList;