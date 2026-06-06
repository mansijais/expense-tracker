import axios from "axios";

const API = axios.create({
  baseURL:
    import.meta.env.VITE_API_URL ||
    "https://expense-tracker-d0ji.onrender.com/api",
});

export default API;