import { useState } from 'react';
import { getSubdomain, themes } from '../lib/theme';

const useTabs = () => {
  const [activeTab, setActiveTab] = useState('');

  const handleTabs = (e) => {
    const buttons = document.querySelectorAll('.tabs');
    const clickedButton = e.target;
    setActiveTab(clickedButton.textContent);

    const subdomain = getSubdomain();
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
