import { useState } from 'react';
import { themes } from '../lib/theme';
import { getSubdomain } from '../lib/utils';
import { jwtDecode } from 'jwt-decode';

const useTabs = () => {
  const [activeTab, setActiveTab] = useState('');
  const [subdomain, setSubdomain] = useState(getSubdomain());

  const handleTabs = (e) => {
    
    const token = localStorage.getItem("authToken");

    if(token) {
      const decodedToken = jwtDecode(token);
      const { TenantName } = decodedToken; 
      setSubdomain(TenantName.toLowerCase()); 
    }

    const buttons = document.querySelectorAll('.tabs');
    const clickedButton = e.target;
    setActiveTab(clickedButton.textContent);

    const theme = themes[subdomain] || themes.default;

    buttons.forEach((button) => {
      button.style.backgroundColor = 'transparent';
      button.style.color = 'black';
    });

    clickedButton.style.backgroundColor = theme.primaryButtonBgColor;
    clickedButton.style.color = theme.primaryButtonTextColor;
  };

  return { activeTab, handleTabs };
};


export default useTabs;
