// src/services/authAxios.js
import axios from "axios";

const authAxios = axios.create({
  baseURL: "http://localhost:8080", // THIS MUST BE CORRECT
});

authAxios.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  console.log("Token used for request:", token); // LOG TOKEN HERE
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  } else {
    console.warn("No token found in localStorage!");
  }
  return config;
});

export default authAxios;
