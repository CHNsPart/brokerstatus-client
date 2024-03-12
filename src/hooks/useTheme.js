import { useEffect, useState } from 'react';
import { themes } from '../lib/theme';
import PropTypes from 'prop-types';
// import { getSubdomain } from '../lib/utils';
import { jwtDecode } from 'jwt-decode';

const useTheme =  ( onlyBtn = false ) => {
  
    const getTenant = () => {
      const token = localStorage.getItem("authToken");
  
      if(token) {
        const decodedToken = jwtDecode(token);
        const { TenantName } = decodedToken; 
  
        return TenantName.toLowerCase();
      }
    }

  const [subdomain, setSubdomain] = useState(getTenant());


  useEffect(() => {

    const token = localStorage.getItem("authToken");

    if(token && subdomain===null) {
      const decodedToken = jwtDecode(token);
      const { TenantName } = decodedToken; 
      setSubdomain(TenantName.toLowerCase()); 
      // const exist = getSubdomain();
      // console.log("exist",exist)
      // if(exist!==null){
      //   setSubdomain(exist)
      // } else {
      //   const decodedToken = jwtDecode(token);
      //   const { TenantName } = decodedToken; 
      //   setSubdomain(TenantName.toLowerCase()); 
      // }
    }
    
    const theme = themes[subdomain] || themes.default;
    // console.log("theme",theme.logo)

    if(onlyBtn) {
        const themeButton = document.getElementsByClassName('themeButton');
        for (let i = 0; i < themeButton.length; i++) {
            themeButton[i].style.backgroundColor = theme.primaryButtonBgColor;
            themeButton[i].style.color = theme.primaryButtonTextColor;
        }
    } else {
        // Apply theme styles
        document.body.style.backgroundColor = theme.backgroundColor;
        document.body.style.color = theme.textColor;
    
        // Update navigation styles
        const nav = document.getElementById('navigation');
        if (nav) {
          nav.style.backgroundColor = theme.navBackgroundColor;
          nav.style.color = theme.navTextColor;
        }
    
        // Update primary button styles
        const themeButton = document.getElementsByClassName('themeButton');
        for (let i = 0; i < themeButton.length; i++) {
          themeButton[i].style.backgroundColor = theme.primaryButtonBgColor;
          themeButton[i].style.color = theme.primaryButtonTextColor;
        }
    
        // Latest News style
        const latestNews = document.getElementById('latestNewsSection');
        if (latestNews) {
          latestNews.style.backgroundColor = theme.latestNewsColor;
          latestNews.style.color = theme.primaryButtonTextColor;
    
          document.getElementById('latesNewsWrapper').style.border = `2px solid ${theme.latestNewsColor}`;
        }

        //labels
        const label = document.getElementsByClassName('labels');
        if(label) {
          for (let i = 0; i < label.length; i++) {
            label[i].style.color =  theme.labelColor;
          }
        }
    
        // Update table header row styles
        const labeledHeaderCells = document.querySelectorAll('table thead tr.labels th.labels');
        labeledHeaderCells.forEach((cell) => {
          cell.style.color = `${theme.labelColor} !important`;
        });
    
    
        // Load subdomain-specific logo
        const logoElement = document.getElementById('logo');
        if (logoElement) {
          logoElement.src = theme.logo;
        }
    }
    // console.log(subdomain)
  }, [onlyBtn, subdomain]);
};

useTheme.propTypes = {
    newsData: PropTypes.bool
  };

export default useTheme;
