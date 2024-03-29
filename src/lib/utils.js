export function getSubdomain() {
    const parts = window.location.hostname.split('.');
    return parts.length > 1 ? parts[0] : null;
}

export const formatter = new Intl.NumberFormat('en-CA', {
  style: 'currency',
  currency: 'CAD',
});

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
  {
    label: "App Received Date",
    type: "text",
    value: "22/09/23",
  },
  {
    label: "Total Mortgage",
    type: "text",
    value: "235,000,00",
  },
  {
    label: "Product",
    type: "text",
    value: "Home/House",
  },
  {
    label: "Product Type",
    type: "text",
    value: "Tangable",
  },
  {
    label: "Interest Rate",
    type: "text",
    value: "20%",
  },
  {
    label: "Principal And Interest",
    type: "text",
    value: "200,000,00",
  },
  {
    label: "Insurer",
    type: "text",
    value: "Mr. Insurers Kilm",
  },
  {
    label: "Insurer Ref Number",
    type: "text",
    value: "1354985355",
  },
  {
    label: "Insurance Premium",
    type: "text",
    value: "125FE7FVA896",
  },
  {
    label: "Payment Frequency",
    type: "text",
    value: "20",
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
    'Actions',
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
    ['Borker', 'BDM', 'Approved', '1714995', 'Purchased', 'Test Borrower', '17/11/2023', '21/12/2023', '$256', '2/10'],    
  ],
};


export const exampleDealViewMessagesData = [
  {
    "topic": "Message Topic 1",
    "conversation": [
      {
        "sender": "Test Broker",
        "receiver": "Test Underwriter",
        "timestamp": "21/12/23, 12:30am",
        "message":"Document X has been uploaded to satisfy condition y",
      },
      {
        "sender": "Test Underwriter",
        "receiver": "Test Broker",
        "timestamp": "21/12/23, 12:30am",
        "message":"Document has been received, validated and accepted. Thanks",
      },
    ]
  },
  {
    "topic": "Message Topic 2",
    "conversation": [
      {
        "sender": "Test Broker",
        "receiver": "Test Underwriter",
        "timestamp": "11/28/2023, 10:00am",
        "message":"Signed Commitment has been uploaded",
      },
      {
        "sender": "Test Credit Admin",
        "receiver": "Test Broker",
        "timestamp": "21/12/23, 11:30am",
        "message":"Document has been received, accepted",
      },
    ]
  }
]