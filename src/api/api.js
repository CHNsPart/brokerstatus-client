import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { formatter } from '../lib/utils';


export const API_BASE_URL = window.GLOBAL_API_BASE_URL; // Update with your backend API URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a function to set the JWT token to the headers
const setAuthToken = (token, tenantId, tenantName) => {
  console.log(token)
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('authToken', token);
      localStorage.setItem('tenantName', tenantName)
      localStorage.setItem('X-TenantId', tenantId)
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
      localStorage.removeItem('authToken');
      localStorage.removeItem('X-TenantId');
      localStorage.removeItem('tenantName')
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
      // console.log(user.tenantId)
      setAuthToken(token, user.tenantId, user.tenantName);
      console.log(user)

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


const getBrokerAccounts = async (page, pageSize) => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axiosInstance.get(`/brokerAccounts?page=${page}&pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (response && response.data && Array.isArray(response.data)) {
      const data = response.data
      // Map and modify the key names
      const modifiedData = data.map((account) => ({
        "Broker": account.brokerName,
        "Status": account.status,
        "Purpose": account.loanPurpose,
        "Mortgage": account.accountID,
        "BorrowerName": account.primaryClient,
        "App Date": dayjs(account.applicationDate).format("YYYY-MM-DD"),
        "Closing Date": dayjs(account.closingDate).format("YYYY-MM-DD"),
        "Amount": formatter.format(account.totalAmount),
        "Conditions": account.numberOfOutstandingConditions+"/"+account.numberOfConditions
      }));

      return modifiedData;
    } else {
      console.error('Invalid data format received from the server.');
      return null;
    }
  } catch (error) {
    // Handle error cases
    console.error('Error fetching client broker agent account summaries:', error.message);
    return null;
  }
};


const getBrokerPipelineAccounts = async (page, pageSize) => {
  try {
    const token = localStorage.getItem("authToken")
    const response = await axiosInstance.get(`/brokerPipelineAccounts?page=${page}&pageSize=${pageSize}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const modifiedData = response.data.map(account => ({
      "Broker": account.brokerName,
      "Status": account.status,
      "Purpose": account.loanPurpose,
      "Mortgage": account.accountID,
      "BorrowerName": account.primaryClient,
      "App Date": dayjs(account.applicationDate).format("YYYY-MM-DD"),
      "Closing Date": dayjs(account.closingDate).format("YYYY-MM-DD"),
      "Amount": formatter.format(account.totalAmount),
      "Conditions": account.numberOfOutstandingConditions+"/"+account.numberOfConditions
    }));

    return modifiedData;

  } catch (error) {
    // Handle error cases
    console.error('Error fetching client broker agent account summaries:', error.message);
    return null;
  }
};


const getFullAccountByAccountId = async (accoundID) => {
  try {
    const token = localStorage.getItem("authToken")
    const response = await axiosInstance.get(`/accountDetails/${accoundID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    // Handle error cases
    console.error('Error fetching client broker agent account summaries:', error.message);
    return null;
  }
};

const getConditionTrackingByAccoundId = async (accountID) => {
  try {
    const token = localStorage.getItem("authToken")
    const response = await axiosInstance.get(`/accountConditions/${accountID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Handle error cases
    console.error('Error fetching client broker agent account conditions by ID:', error.message);
    return null;
  }
};

const getDocumentsByAccoundId = async (accountID) => {
  try {
    const token = localStorage.getItem("authToken")
    const response = await axiosInstance.get(`/accountDocuments/${accountID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Handle error cases
    console.error('Error fetching client broker agent account summaries:', error.message);
    return null;
  }
};
  
const getInternalLoanContactsByAccoundId = async (accountID) => {
  try {
    const token = localStorage.getItem("authToken")
    const response = await axiosInstance.get(`/internalLoanContacts/${accountID}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Handle error cases
    console.error('Error fetching client broker agent account internal contacts:', error.message);
    return null;
  }
};
  
const getDocumentTypes = async () => {
  try {
    const token = localStorage.getItem("authToken")
    const response = await axiosInstance.get(`/documentTypes`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Handle error cases
    console.error('Error fetching client broker agent document types:', error.message);
    return null;
  }
};

const uploadDocuments = async (files) => {
  const token = localStorage.getItem("authToken")
  try {
    const response = await axiosInstance.post(`/attachFileToAccount`, 
    files,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        Accept: "application/json",
      },
    }
    );
    return response.data;
  } catch (error) {
    // Handle error cases
    console.error('Error fetching: ', error.message);
    return null;
  }
};

const resetPassword = async (username) => {

  try {
    const response = await axiosInstance.post(`/resetPassword`, 
    {
      username,
    },
    {
      headers: {
        "X-TenantId": window.TENANT_ID,
      },
    }
    );
    return response.data.isSuccess;
  } catch (error) {
    // Handle error cases
    console.error('Error fetching client broker agent reset password data:', error);
    return error.response.data.message;
  }
};

const changePassword = async (userDetails) => {
  const tID = localStorage.getItem('X-TenantId')
  try {
    const response = await axiosInstance.post(`/changePassword`,  
    userDetails,
    {
      headers: {
        "X-TenantId": tID,
      },
    });
    return response.data.isSuccess;
  } catch (error) {
    // Handle error cases
    console.error('Error fetching client broker agent documents data:', error.message);
    return error.response.data.message;
  }
};

const getDocumentData = async (accountId, docId) => {
  try {
    const token = localStorage.getItem("authToken")
    const response = await axiosInstance.get(`/documentData/${accountId}/${docId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    // Handle error cases
    console.error('Error fetching client broker agent documents data:', error.message);
    return null;
  }
};

export { 
  axiosInstance, 
  setAuthToken, 
  login, 
  getFullAccountByAccountId,
  getBrokerAccounts, 
  getBrokerPipelineAccounts,
  changePassword,
  // getAccountByAccountId,
  getConditionTrackingByAccoundId,
  getInternalLoanContactsByAccoundId,
  getDocumentsByAccoundId,
  getDocumentTypes,
  resetPassword,
  uploadDocuments,
  getDocumentData
};