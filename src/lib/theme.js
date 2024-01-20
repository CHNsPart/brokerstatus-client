import samLogo from '../assets/people01.png';
import johnLogo from '../assets/people02.png';

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
    logo: samLogo,
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
