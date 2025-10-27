// src/pages/EditBloodStock.js

import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import BloodStockService from "../services/BloodStockService";
import { toast } from 'react-toastify'; // NEW IMPORT

function EditBloodStock() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [stock, setStock] = useState({
    bloodGroup: "",
    unitsAvailable: ""
  });

  useEffect(() => {
    BloodStockService.getStockById(id)
      .then((res) => setStock(res.data))
      .catch((error) => {
        toast.error("Error fetching blood stock data.");
        console.error(error);
      });
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setStock({ ...stock, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    BloodStockService.updateStock(id, stock)
      .then(() => {
        toast.success("Blood stock updated successfully!", {
          position: "top-right",
          autoClose: 3000,
        });
        navigate("/stock");
      })
      .catch((error) => {
        toast.error("Error updating blood stock. Please try again.", {
          position: "top-right",
          autoClose: 3000,
        });
        console.error(error);
      });
  };

  return (
    <div className="container mt-4">
      <h2>Edit Blood Stock</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Blood Group</label>
          <input
            name="bloodGroup"
            value={stock.bloodGroup}
            onChange={handleChange}
            className="form-control"
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
        />

        </div>
        <button className="btn btn-success">Update</button>
      </form>
    </div>
  );
}

export default EditBloodStock;