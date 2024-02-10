import axios from 'axios';

export const API_BASE_URL = 'https://unifi-api-brokerui-dev.azurewebsites.net'; // Update with your backend API URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a function to set the JWT token to the headers
const setAuthToken = (token) => {
  console.log(token)
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('authToken', token); // Set token in localStorage
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
      localStorage.removeItem('authToken'); // Remove token from localStorage
    }
  };

const login = async (username, password) => {
  try {
    const response = await axiosInstance.post('/login', {
      username,
      password,
    });

    const { isSuccess, result, message } = response.data;

    if (isSuccess) {

      const { user, token } = result;

      setAuthToken(token);

      return user;
    } else {
      // Handle error cases
      console.error(`Login failed: ${message}`);
      return null;
    }
  } catch (error) {
    // Handle network or other errors
    console.error('Login error:', error.message);
    return null;
  }
};

  

export { axiosInstance, setAuthToken, login };

