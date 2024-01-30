import samLogo from '../assets/people01.png';
import johnLogo from '../assets/people02.png';
import defaultLogo from '../assets/default.webp';


export const themes = {
  default: {
    backgroundColor: '#fff',
    textColor: 'black',
    navBackgroundColor: '#333',
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
    navBackgroundColor: "#ff0000",
    navTextColor: "#ffffff",
    primaryButtonBgColor: "#ff4f00",
    secondaryButtonBgColor: "#ff372f",
    primaryButtonTextColor: "#ffffff",
    latestNewsColor: "#ff0000",
    logo: johnLogo
  }
};  