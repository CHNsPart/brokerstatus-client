import axios from 'axios';

const API_BASE_URL = 'http://domain.com/'; // Update with your backend API URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a function to set the JWT token to the headers
const setAuthToken = (token) => {
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('authToken', token); // Set token in localStorage
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
      localStorage.removeItem('authToken'); // Remove token from localStorage
    }
  };

  export { axiosInstance, setAuthToken };