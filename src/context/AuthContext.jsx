// AuthContext.js
import { createContext, useContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import {jwtDecode} from 'jwt-decode';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userDetails, setUserDetails] = useState(null);

  useEffect(() => {

    const authToken = localStorage.getItem('authToken');
    if (authToken) {

      const user = fetchUserDetails(authToken); 
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


  const fetchUserDetails = (token) => {
    try {
      const decodedToken = jwtDecode(token);

      const user = decodedToken;

      return user;
    } catch (error) {
      console.error('Error decoding user details from token:', error);
      return null;
    }
  };
  
  
  fetchUserDetails.propTypes = {
    token: PropTypes.string.isRequired,
  };
  
export { AuthProvider, useAuth, fetchUserDetails };