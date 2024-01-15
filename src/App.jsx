/* eslint-disable no-unused-vars */
import './App.css';
import Navbar from './components/Navbar';
import { useEffect } from 'react';
import { exampleNewsData, getSubdomain, themes } from './lib/theme';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Signin from './pages/Signin';
import LatesNews from './components/LatesNews';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import DocumentLib from './pages/DocumentLib';
import DealsOverview from './pages/DealsOverview';

function App() {
  
  useEffect(() => {
    // Detect subdomain
    const subdomain = getSubdomain();

    // Get the theme based on subdomain or use the default theme
    const theme = themes[subdomain] || themes.default;

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
    const themeButton = document.getElementsByClassName("themeButton");
    for (let i = 0; i < themeButton.length; i++) {
      themeButton[i].style.backgroundColor = theme.primaryButtonBgColor;
      themeButton[i].style.color = theme.primaryButtonTextColor;
    }




    // Latest News style
    const latestNews = document.getElementById("latestNewsSection");
    if(latestNews){
      latestNews.style.backgroundColor = theme.latestNewsColor;
      latestNews.style.color = theme.primaryButtonTextColor;
      latestNews.style.hove
      document.getElementById("latesNewsWrapper").style.border = `2px solid ${theme.latestNewsColor}`;
    }

    // Load subdomain-specific logo
    const logoElement = document.getElementById('logo');
    if (logoElement) {
      logoElement.src = theme.logo;
    }
  }, []);

  return (
    <Router>
      <div id="pageContainer">
        <Navbar/>
        <Switch>
            {/* Public Routes */}
            <Route path="/" exact component={Signin} />
            <Route path="/resetPassword" exact component={ResetPassword} />
            
            {/* Protected Routes */}
            <Route path="/home" exact component={Home} />
            <Route path="/deals" exact component={DealsOverview} />
            <Route path="/docs" exact component={DocumentLib} />
        </Switch>
        <LatesNews newsData={exampleNewsData}/>
      </div>
    </Router>
  )
}

export default App;
