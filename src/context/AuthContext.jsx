// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import { API_BASE_URL } from '../api/api';
import PropTypes from 'prop-types';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking the presence of a token)
    const authToken = localStorage.getItem('authToken');
    if (authToken) {
      // Fetch user details using the token and update state
      // Example: Fetch user details from the server
      const user = fetchUserDetails(authToken); // You need to implement this function
      setUserDetails(user);
      setIsAuthenticated(true);
    }
  }, []);

  const login = (token, user) => {
    localStorage.setItem('authToken', token);
    setUserDetails(user);
    setIsAuthenticated(true);
    window.location = "/home"
  };

  const logout = () => {
    localStorage.removeItem('authToken');
    setUserDetails(null);
    setIsAuthenticated(false);
    window.location = "/"
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userDetails, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  return useContext(AuthContext);
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// In the same AuthContext.js file

const fetchUserDetails = async (token) => {
    // Simulate an API call to fetch user details
    try {
      const response = await fetch(API_BASE_URL, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching user details:', error);
      return null;
    }
  };
  
  
  fetchUserDetails.propTypes = {
    token: PropTypes.string.isRequired,
  };
  
export { AuthProvider, useAuth, fetchUserDetails };
  



