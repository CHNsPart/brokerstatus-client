import samLogo from '../assets/people01.png';
import johnLogo from '../assets/people02.png';

export const themes = {
    sam: {
      backgroundColor: 'white',
      textColor: 'black',
      navBackgroundColor: 'blue',
      navTextColor: 'white',
      primaryButtonBgColor: '#03a9f4',
      secondaryButtonBgColor: '#04d2f6',
      primaryButtonTextColor: '#ffffff',
      latestNewsColor: 'blue',
      logo: samLogo,
    },
    john: {
      backgroundColor: 'white',
      textColor: 'black',
      navBackgroundColor: 'red',
      navTextColor: 'white',
      primaryButtonBgColor: '#ff5722',
      secondaryButtonBgColor: '#ff472F',
      primaryButtonTextColor: '#ffffff',
      latestNewsColor: 'red',
      logo: johnLogo,
    },
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