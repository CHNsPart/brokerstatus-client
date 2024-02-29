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

const getClientBrokerAgentAccountSummaries = async (page, pageSize) => {
  try {
    const token = localStorage.getItem("authToken")
    const response = await axiosInstance.get(`/api/brokerAccounts?page=${page}&pageSize=${pageSize}`, {
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

// const getAccountByAccountId = async (accoundID) => {
//   try {
//     const token = localStorage.getItem("authToken")
//     const response = await axiosInstance.get(`/api/accountDetails/${accoundID}`, {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });
//     const forgedData = [
//       {
//         label:"Purpose of Loan",
//         type: "text",
//         value: response.data.loanPurpose
//       },
//       {
//         label:"Request of Amount",
//         type: "number",
//         value: response.data.totalAmount
//       },
//       {
//         label:"Est. Value/pur Price",
//         type: "number",
//         value: response.data.totalPurchasePrice
//       },
//       {
//         label:"LTV",
//         type: "number",
//         value: response.data.currCombinedLTV
//       },
//       {
//         label:"Term",
//         type: "text",
//         value: response.data.term
//       },
//       {
//         label:"Amortization",
//         type: "number",
//         value: response.data.blendedAmort
//       },
//       {
//         label:"Closing Date",
//         type: "text",
//         value: response.data.closingDate
//       },
//       {
//         label:"First Payment Date",
//         type: "text",
//         value: response.data.firstPymtDate
//       },
//       {
//         label:"Solicitor Name",
//         type: "text",
//         value: response.data.primaryClient
//       },
//       {
//         label:"Solicitor Firm",
//         type: "text",
//         value: response.data.propertyAddress
//       },
//       {
//         label:"App Received Date",
//         type: "text",
//         value: response.data.applicationDate
//       },
//       {
//         label:"Total Mortgage",
//         type: "number",
//         value: response.data.totalDownPaymentAmt
//       },
//       {
//         label:"Product",
//         type: "text",
//         value: response.data.product
//       },
//       {
//         label:"Product Type",
//         type: "text",
//         value: response.data.rateType
//       },
//       {
//         label:"Interest Rate",
//         type: "number",
//         value: response.data.interestRate
//       },
//       {
//         label:"Principal And Interest",
//         type: "number",
//         value: response.data.principal
//       },
//       {
//         label:"Insurer",
//         type: "text",
//         value: response.data.mortgageInsurer
//       },
//       {
//         label:"Insurer Ref Number",
//         type: "text",
//         value: response.data.primaryKey
//       },
//       {
//         label:"Insurance Premium",
//         type: "number",
//         value: response.data.insurancePremium
//       },
//       {
//         label:"Payment Frequency",
//         type: "number",
//         value: response.data.gds
//       },
//     ]
//     return forgedData;
//   } catch (error) {
//     // Handle error cases
//     console.error('Error fetching client broker agent account summaries:', error.message);
//     return null;
//   }
// };

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
    console.error('Error fetching client broker agent account summaries:', error.message);
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
    console.error('Error fetching client broker agent account summaries:', error.message);
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
    console.error('Error fetching client broker agent account summaries:', error.message);
    return null;
  }
};

export { 
  axiosInstance, 
  setAuthToken, 
  login, 
  getClientBrokerAgentAccountSummaries, 
  getFullAccountByAccountId,
  // getAccountByAccountId,
  getConditionTrackingByAccoundId,
  getInternalLoanContactsByAccoundId,
  getDocumentsByAccoundId,
  getDocumentTypes
};