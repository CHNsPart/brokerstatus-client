import samLogo from '../assets/people01.png';
import johnLogo from '../assets/people02.png';
import defaultLogo from '../assets/default.webp';


export const themes = {
  default: {
    backgroundColor: '#fff',
    textColor: 'black',
    navBackgroundColor: '#1e1e1e',
    navTextColor: 'white',
    primaryButtonBgColor: '#000',
    secondaryButtonBgColor: '#000',
    primaryButtonTextColor: '#ffffff',
    latestNewsColor: '#1e1e1e',
    logo: defaultLogo,
  },
    sam: {
      backgroundColor: "#fff",
      textColor: "#333333",
      navBackgroundColor: "#007bff",
      navTextColor: "#ffffff",
      primaryButtonBgColor: "#2196f3",
      secondaryButtonBgColor: "#03a9f4",
      primaryButtonTextColor: "#ffffff",
      latestNewsColor: "#2196f3",
      logo: samLogo
    },
    john: {
      backgroundColor: "#fff",
      textColor: "#333333",
      navBackgroundColor: "#e74c3c",
      navTextColor: "#ffffff",
      primaryButtonBgColor: "#ff5722",
      secondaryButtonBgColor: "#ff472f",
      primaryButtonTextColor: "#ffffff",
      latestNewsColor: "#e74c3c",
      logo: johnLogo
    }
  };  

export function getSubdomain() {
    const parts = window.location.hostname.split('.');
    return parts.length > 1 ? parts[0] : null;
  }


export const exampleNewsData = [
    {       
        id: 1,
        news: "1 asdknfeia fa",
    },
    {       
        id: 2,
        news: "2 asdknfeia fa",
    },
    {       
        id: 3,
        news: "3 asdknfeia fa",
    },
    {       
        id: 4,
        news: "4 asdknfeia fa",
    },
    {       
        id: 5,
        news: "5 asdknfeia fa",
    }
]

export var exampleDocumentLibrarydata = {
  "Policies": {
    "one": "pdf 1",
    "two": "pdf 2",
    "three": "pdf 3",
  },
  "Compensations": {
      "one": "pdf 1",
      "two": "pdf 2",
      "three": "pdf 3",
  },
  "Forms": {
      "one": "pdf 1",
      "two": "pdf 2",
      "three": "pdf 3",
  },
  "Product Sheets": {
      "one": "pdf 1",
      "two": "pdf 2",
      "three": "pdf 3",
  },
  "Bydown Calculator": {
      "one": "pdf 1",
      "two": "pdf 2",
      "three": "pdf 3",
  },
  "Trailer Fee Calculator": {
      "one": "pdf 1",
      "two": "pdf 2",
      "three": "pdf 3",
  },
};


export const exampleDealViewContactData = [
  {
    "name": "Ronald Smith",
    "role": "BDM",
    "email": "ronald@email.com",
    "mobile": "+1-684-896-8596",
    "work": "Mechanics at Rest",
    "address": "566 Street, Ontario"
  },
  {
    "name": "Alice Johnson",
    "role": "Sales Manager",
    "email": "alice@email.com",
    "mobile": "+1-123-456-7890",
    "work": "Tech Solutions Inc.",
    "address": "123 Main St, Cityville"
  },
  {
    "name": "Bob Williams",
    "role": "Marketing Specialist",
    "email": "bob@email.com",
    "mobile": "+1-987-654-3210",
    "work": "Creative Designs Co.",
    "address": "456 Elm St, Townsville"
  },
  {
    "name": "Emma Davis",
    "role": "HR Manager",
    "email": "emma@email.com",
    "mobile": "+1-555-123-4567",
    "work": "People Dynamics Ltd.",
    "address": "789 Oak St, Villageton"
  },
  {
    "name": "Chris Harris",
    "role": "IT Consultant",
    "email": "chris@email.com",
    "mobile": "+1-333-777-9999",
    "work": "Tech Innovations Corp.",
    "address": "101 Pine St, Hamletville"
  }
]

export const exampleDealViewConditions = [
  { index: 1, description: '10 Days Prior To Advance Notice' },
  { index: 2, description: 'Current Paystub required Borrower 1' },
  { index: 3, description: 'Current Paystub required Borrower 2' },
  { index: 4, description: 'Downpayment Gifted' },
]


export const exampleDealViewDocumentsData = [
  {
    index: 1,
    title: "CMLS Commitment Letter",
    description: "System Generated Document",
    type: "System Generated",
    timestamp: "11/27/2023 12:30 pm",
  },
  {
    index: 2,
    title: "CMLS Commitment Letter",
    description: "System Generated Document",
    type: "System Generated",
    timestamp: "11/27/2023 12:30 pm",
  },
  {
    index: 3,
    title: "CMLS Commitment Letter",
    description: "System Generated Document",
    type: "System Generated",
    timestamp: "11/27/2023 12:30 pm",
  },
];


export const exampleDealViewDetailsData = [
  {
    label: "Purpose of Loan",
    type: "text",
    value: "Home Purchase",
  },
  {
    label: "Request of Amount",
    type: "text",
    value: "$500,000",
  },
  {
    label: "Est. Value/pur Price",
    type: "text",
    value: "$550,000",
  },
  {
    label: "LTV",
    type: "text",
    value: "90%",
  },
  {
    label: "Term",
    type: "text",
    value: "30 years",
  },
  {
    label: "Amortization",
    type: "text",
    value: "Fixed",
  },
  {
    label: "Closing Date",
    type: "text",
    value: "2024-05-15",
  },
  {
    label: "First Payment Date",
    type: "text",
    value: "2024-06-01",
  },
  {
    label: "Solicitor Name",
    type: "text",
    value: "John Doe",
  },
  {
    label: "Solicitor Firm",
    type: "text",
    value: "Doe and Associates",
  },
];

export const pipelineTableData = {
  columns: [
    'Broker',
    'BDM',
    'Status',
    'Mortgage #',
    'Purpose',
    'Borrower Name',
    'App Date',
    'Closing Date',
    'Amount',
    'Condition',
    'Actions', // 11th column for rounded action buttons
  ],
  rows: [
    ['Borker', 'BDM', 'Approved', '1714935', 'Purchased', 'Test Borrower', '16/11/2023', '21/12/2023', '$256', '2/10'],
    ['Borker', 'BDM', 'Approved', '1714936', 'Purchased', 'Test Borrower', '17/11/2023', '22/12/2023', '$256', '2/10'],
    ['Borker', 'BDM', 'Approved', '1714937', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
    ['Borker', 'BDM', 'Approved', '1714938', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$206', '5/10'],
    ['Borker', 'BDM', 'Approved', '1714939', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
    ['Borker', 'BDM', 'Approved', '1714910', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
    ['Borker', 'BDM', 'Approved', '1714921', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
    ['Borker', 'BDM', 'Approved', '1714911', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
    ['Borker', 'BDM', 'Approved', '1714936', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
    ['Borker', 'BDM', 'Approved', '1714930', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
    ['Borker', 'BDM', 'Approved', '1714958', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],
    ['Borker', 'BDM', 'Approved', '1714995', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],    ],
};
