import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';

import Login from "./components/login";
import SignUp from "./components/signup";
import recoverPass from './components/recoverPass';

function Copyright() {
  return (
    <Typography variant="body2" color="white" align="center">
      {'Derechos de autor © '}
      <Link color="inherit" href="https://media2.giphy.com/media/9MIIjUe8fNZfVRQfNP/giphy.gif">
        School2Cool
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

function App() {
  return (
    <Router>
      <div className="App">
        <nav className="navbar navbar-expand-lg navbar-light fixed-top">
          <div className="container">
            <Link className="navbar-brand" to={"/sign-in"}>School2Cool :D</Link>
            <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
              <ul className="navbar-nav ml-auto">
                <li className="nav-item">
                  <Link className="nav-link" to={"/sign-in"}>Iniciar sesión</Link>
                </li>
                <li className="danger">
                  <Link className="nav-link" to={"/sign-up"}>Regístrate</Link>
                </li>
              </ul>
            </div>
          </div>
        </nav>

        <div className="auth-wrapper">
          <div className="auth-inner">
            <Switch>
              <Route exact path='/' component={Login} />
              <Route path="/sign-in" component={Login} />
              <Route path="/sign-up" component={SignUp} />
              <Route path="/recoverPass" component={recoverPass} />
            </Switch>
          </div>
            <Box mt={8}>
        <Copyright />
      </Box>
        </div>
      </div>
    </Router>
  );
}

export default App;