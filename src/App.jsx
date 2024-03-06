import './App.css';
import Navbar from './components/Navbar';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Signin from './pages/Signin';
import ResetPassword from './pages/ResetPassword';
import Home from './pages/Home';
import DealsOverview from './pages/DealsOverview';
import DealView from './pages/DealView';
import useTheme from './hooks/useTheme';
import ViewAllDeals from './pages/ViewAllDeals';

function App() {

  useTheme();

  const token = localStorage.getItem("authToken");

  return (
    <Router basename="/">
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
                <Route path="/allDeals" exact component={ViewAllDeals} />
                <Route path="/dview/:accountID" exact component={DealView} />
              </>
              :
              <Route path="*" exact component={Signin} />
            }
        </Switch>
      </div>
    </Router>
  )
}

export default App;


