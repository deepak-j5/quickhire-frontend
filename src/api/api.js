import axios from "axios";

const API = axios.create({
  baseURL: "https://quickhire-backend.onrender.com/api", // change to your backend URL if needed
});

API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

export default API;
