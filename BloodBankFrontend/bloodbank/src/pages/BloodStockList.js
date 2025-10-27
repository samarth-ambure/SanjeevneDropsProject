// src/pages/BloodStockList.js

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import BloodStockService from "../services/BloodStockService";
import { toast } from 'react-toastify';
import { useSearch } from '../context/SearchContext'; // NEW IMPORT

function BloodStockList() {
  const [allStocks, setAllStocks] = useState([]); // Store the full list
  const [filteredStocks, setFilteredStocks] = useState([]); // State for the list to be displayed
  const { searchTerm } = useSearch(); // Get the searchTerm from context

  useEffect(() => {
    fetchStock();
  }, []);

  // Filter stocks whenever the searchTerm or the full list changes
  useEffect(() => {
    const lowercasedSearchTerm = searchTerm.toLowerCase();
    const results = allStocks.filter(stock =>
      stock.bloodGroup.toLowerCase().includes(lowercasedSearchTerm) ||
      stock.availableUnits.toString().includes(lowercasedSearchTerm)
    );
    setFilteredStocks(results);
  }, [searchTerm, allStocks]);

  const fetchStock = () => {
    BloodStockService.getAllStocks()
      .then((res) => setAllStocks(res.data))
      .catch((error) => {
        toast.error("Error fetching blood stock data.");
        console.error(error);
      });
  };

  const deleteStock = (id) => {
    if (window.confirm("Delete this blood stock?")) {
      BloodStockService.deleteStock(id)
        .then(() => {
          toast.success("Blood stock deleted successfully!", { autoClose: 3000 });
          fetchStock();
        })
        .catch((error) => {
          toast.error("Error deleting blood stock.");
          console.error(error);
        });
    }
  };

  return (
    <div className="container mt-4">
      <h2>Blood Stock</h2>
      <Link to="/add-stock" className="btn btn-primary mb-2">
        Add Stock
      </Link>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>ID</th>
            <th>Blood Group</th>
            <th>Units Available</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredStocks.map((stock) => (
            <tr key={stock.id}>
              <td>{stock.id}</td>
              <td>{stock.bloodGroup}</td>
             <td>{stock.availableUnits}</td>
              <td>
                <Link to={`/edit-stock/${stock.id}`} className="btn btn-warning btn-sm me-2">
                  Edit
                </Link>
                <button onClick={() => deleteStock(stock.id)} className="btn btn-danger btn-sm">
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

export default BloodStockList;  