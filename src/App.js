import React, { Component } from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
  Link,
} from "react-router-dom";

import InviteUsers from "./pages/InviteUsers/InviteUsers.page";
import Login from "./pages/Login/Login.page";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword.page";
import SignUp from "./pages/SignUp/SignUp.page";

import Copyright from "./components/Copyright/Copyright.component";
import Navigation from "./components/Navigation/Navigation.component";

import "./App.css";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import AboutUs from "./pages/AboutUs/AboutUs.page";
import ClassRoom from "./pages/ClassRoom/ClassRoom";
import { SeeClassRooms } from "./pages/ClassRoom/SeeClassRooms";



class App extends Component {
  state = {
    currentUser: null,
    currentClass: "5ef7dab69335230d20843e45",
    users: [],
  };
  fetchRef = null;

  componentDidMount() {
    if (!this.fetchRef) {
      this.fetchRef = fetch("http://localhost:5000/users", {
        headers: {
          Authorization:
            "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWY3ZDYyY2JhZGNlZjJlNjA4ZWU4ODciLCJpYXQiOjE1OTMzMDA5NzV9.HgM4EpK6pTKKSeKPIsnd0a5PVeLhYVQMEKBsDW2WdIY",
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          this.fetchRef = null;
          this.setState({ users: data });
        })
        .catch((error) => {
          console.log(error);
          this.fetchRef = "bruh";
        });
    }
  }

  changeState = (appState, value) => {
    if (this.state.hasOwnProperty(appState)) {
      this.setState({ [appState]: value });
    }
  };

  render() {
    const { users, currentUser, currentClass } = this.state;

    return (
      <Router>
        <div className="App">
          <Navigation currentUser={currentUser} />
          <div className="auth-wrapper">
            <div className="auth-inner">
              <Switch>
                <Route
                  exact
                  path="/"
                  render={() => {
                    return (
                      <InviteUsers
                        currentUser={currentUser}
                        currentClass={currentClass}
                        users={users}
                        changeState={this.changeState}
                      />
                    );
                  }}
                />
                <Route
                  path="/sign-in"
                  render={() => {
                    return !currentUser ? <Login /> : <Redirect to="/" />;
                  }}
                />
                <Route
                  path="/sign-up"
                  render={() => {
                    return <SignUp />;
                  }}
                />
                <Route
                  path="/classroom"
                  render={() => {
                    return <ClassRoom />;
                  }}
                />
                <Route
                  path="/seeclassrooms"
                  render={() => {
                    return <SeeClassRooms />;
                  }}
                />
                <Route
                  path="/recoverPass"
                  render={() => {
                    return !currentUser ? (
                      <Redirect to="/" />
                    ) : (
                      <RecoverPassword />
                    );
                  }}
                />
                <Route
                  path="/inviteUsers"
                  render={() => {
                    return currentUser && users.length ? (
                      <InviteUsers
                        currentUser={currentUser}
                        currentClass={currentClass}
                        users={users}
                        changeState={this.changeState}
                      />
                    ) : (
                      <Redirect to="/inviteUsers" />
                    );
                  }}
                />
              </Switch>
            </div>
            <Copyright />
          </div>
        </div>
      </Router>
    );
  }
}

export default App;
