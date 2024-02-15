/* eslint-disable no-unused-vars */
import './App.css';
import Navbar from './components/Navbar';
import { exampleNewsData } from './lib/utils';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signin from './pages/Signin';
import LatesNews from './components/LatesNews';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import DocumentLib from './pages/DocumentLib';
import DealsOverview from './pages/DealsOverview';
import DealView from './pages/DealView';
import useTheme from './hooks/useTheme';

function App() {

  useTheme();

  const token = localStorage.getItem("authToken");

  return (
    <Router>
      <div id="pageContainer">
        <Navbar/>
        <Switch>  
            {/* Public Routes */}
            <Route path="/" exact component={Signin} />
            <Route path="/resetPassword" exact component={ResetPassword} />
            
            {/* Protected Routes */}
            {
              token ? 
              <>
                <Route path="/home" exact component={Home} />
                <Route path="/deals" exact component={DealsOverview} />
                <Route path="/docs" exact component={DocumentLib} />
                <Route path="/dview/:accountID" exact component={DealView} />
              </>
              :
              <Route path="*" exact component={Signin} />
            }
        </Switch>
        <LatesNews newsData={exampleNewsData}/>
      </div>
    </Router>
  )
}

export default App;


