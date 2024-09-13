import axios from "axios";

// API base URL
export const API_URL = "http://localhost:8080";

// Axios instance with base URL and default headers
export const api = axios.create({
    baseURL: API_URL,
    headers: {
        "Content-Type": "application/json",
    }
});
