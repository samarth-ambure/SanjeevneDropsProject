// src/pages/DonorList.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import donorService from "../services/DonorService";
import { toast } from 'react-toastify';
import { useSearch } from '../context/SearchContext'; // NEW IMPORT

function DonorList() {
  const [allDonors, setAllDonors] = useState([]); // NEW: Store the full, unfiltered list
  const [filteredDonors, setFilteredDonors] = useState([]); // NEW: State for the list to be displayed
  const { searchTerm } = useSearch(); // NEW: Get the searchTerm from context

  useEffect(() => {
    fetchDonors();
  }, []);

  // NEW: useEffect to filter donors whenever the searchTerm changes
  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const results = allDonors.filter(donor =>
      donor.name.toLowerCase().includes(lowercasedSearchTerm) ||
      donor.bloodGroup.toLowerCase().includes(lowercasedSearchTerm) ||
      donor.location.toLowerCase().includes(lowercasedSearchTerm)
    );
    setFilteredDonors(results);
  }, [searchTerm, allDonors]);


  const fetchDonors = () => {
    donorService
      .getAllDonors()
      .then((response) => {
        setAllDonors(response.data); // Store the full list
        setFilteredDonors(response.data); // Set the initial displayed list
      })
      .catch((error) => {
        console.error("Error fetching donors:", error);
        toast.error("Error fetching donors.");
      });
  };

  const deleteDonor = (id) => {
    if (window.confirm("Are you sure to delete this donor?")) {
      donorService
        .deleteDonor(id)
        .then(() => {
          toast.success("Donor deleted successfully!", { autoClose: 3000 });
          fetchDonors(); // Re-fetch the full list after deletion
        })
        .catch((error) => {
          console.error("Error deleting donor:", error);
          toast.error("Error deleting donor.");
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Donor List</h2>
      <Link to="/add-donor" className="btn btn-primary mb-2">
        Add Donor
      </Link>

      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Blood Group</th>
            <th>Location</th>
            <th>Last Donation</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {/* RENDER THE FILTERED LIST */}
          {filteredDonors.length > 0 ? (
            filteredDonors.map((donor) => (
              <tr key={donor.id}>
                <td>{donor.id}</td>
                <td>{donor.name}</td>
                <td>{donor.bloodGroup}</td>
                <td>{donor.location}</td>
                <td>{donor.lastDonationDate}</td>
                <td>
                  <Link to={`/edit-donor/${donor.id}`} className="btn btn-warning btn-sm me-2">
                    Edit
                  </Link>
                  <button onClick={() => deleteDonor(donor.id)} className="btn btn-danger btn-sm">
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="text-center">
                No donors found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default DonorList;