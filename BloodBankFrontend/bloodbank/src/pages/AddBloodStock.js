// src/pages/AddBloodStock.js

import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import BloodStockService from "../services/BloodStockService";
import { toast } from 'react-toastify'; // NEW IMPORT

function AddBloodStock() {
  const [stock, setStock] = useState({
  bloodGroup: "",
  availableUnits: ""
});


  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock({ ...stock, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    BloodStockService.createStock(stock)
      .then(() => {
        toast.success("Blood stock added successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/stock");
      })
      .catch((error) => {
        toast.error("Error adding blood stock. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Add Blood Stock</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Blood Group</label>
          <input
            name="bloodGroup"
            value={stock.bloodGroup}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <div className="mb-3">
          <label>Units Available</label>
          <input
            name="availableUnits"
            type="number"
            value={stock.availableUnits}
            onChange={handleChange}
            className="form-control"
            required
          />
        </div>
        <button className="btn btn-success">Save</button>
      </form>
    </div>
  );
}

export default AddBloodStock;