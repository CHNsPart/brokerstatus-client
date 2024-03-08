import axios from 'axios';
import dayjs from 'dayjs';
import 'dayjs/locale/en';
import { formatter } from '../lib/utils';


export const API_BASE_URL = 'https://unifi-api-brokerui-dev.azurewebsites.net'; // Update with your backend API URL

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add a function to set the JWT token to the headers
const setAuthToken = (token, tenantId) => {
  console.log(token)
    if (token) {
      axiosInstance.defaults.headers.common['Authorization'] = `Bearer ${token}`;
      localStorage.setItem('authToken', token);
      localStorage.setItem('X-TenantId', tenantId)
    } else {
      delete axiosInstance.defaults.headers.common['Authorization'];
      localStorage.removeItem('authToken');
      localStorage.removeItem('X-TenantId');
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
      setAuthToken(token, user.tenantId);

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
    const response = await axiosInstance.get(`/api/brokerAccounts?page=${page}&pageSize=${pageSize}`, {
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
        "Condtions": account.numberOfOutstandingConditions+"/"+account.numberOfConditions
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
    const response = await axiosInstance.get(`/api/brokerPipelineAccounts?page=${page}&pageSize=${pageSize}`, {
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
      "Condtions": account.numberOfOutstandingConditions+"/"+account.numberOfConditions
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
    const response = await axiosInstance.get(`api/accountDetails/${accoundID}`, {
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
    const response = await axiosInstance.get(`/api/accountConditions/${accountID}`, {
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
    const response = await axiosInstance.get(`/api/accountDocuments/${accountID}`, {
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
    const response = await axiosInstance.get(`/api/documentTypes`, {
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

const resetPassword = async (username) => {
  try {
    const tID =  localStorage.getItem("X-TenantId");
    const response = await axiosInstance.post(`/resetPassword`, 
    {
      username,
    },
    {
      headers: {
        "X-TenantId": tID,
      },
    }
    );
    return response.data;
  } catch (error) {
    // Handle error cases
    console.error('Error fetching client broker agent reset password data:', error.message);
    return null;
  }
};

const uploadDocuments = async (files) => {
  const token = localStorage.getItem("authToken")
  try {
    const response = await axiosInstance.post(`/api/attachFileToAccount`, 
    {
      files,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
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

const getDocumentData = async (accountId, docId) => {
  try {
    const token = localStorage.getItem("authToken")
    const response = await axiosInstance.get(`/api/documentData/${accountId}/${docId}`, {
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
  // getAccountByAccountId,
  getConditionTrackingByAccoundId,
  getInternalLoanContactsByAccoundId,
  getDocumentsByAccoundId,
  getDocumentTypes,
  resetPassword,
  uploadDocuments,
  getDocumentData
};