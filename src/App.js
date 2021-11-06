import './App.css';
import { Login } from './components/Login';
import { SignUp } from './components/SignUp';
import { Home } from './components/Home';
import Usuarios  from './components/Usuarios';
// 
import Navbar  from './components/Navbar';
import Sidebar  from './components/Sidebar';
import Dashboard  from './components/Dashboard';

import {AuthProvider } from './context/AuthContext';

import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

// Import private rout
import {PrivateRoute} from './components/PrivateRoute';
function App() {
  return (
    <>
      <AuthProvider>
        <div className="d-flex" id="content-wrapper">
        <Router >
          <Sidebar>
            <div className="w-100">
             
            </div>
          </Sidebar>
          <Switch>
            <PrivateRoute exact path='/' component={Home} />
            <Route path='/login' component={Login} />
            <Route path='/signup' component={SignUp} />
            <PrivateRoute path='/usuarios' component={Usuarios} />
            <PrivateRoute path='/dashboard' component={Dashboard} />
          </Switch>
          </Router>
        </div>
      </AuthProvider>
    </>
  );
}

export default App;
