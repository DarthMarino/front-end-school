import React, { Component } from "react";
import { Switch, Route, Redirect } from "react-router-dom";
import Login from "./pages/Login/Login.page";
import RecoverPassword from "./pages/RecoverPassword/RecoverPassword.page";
import SignUp from "./pages/SignUp/SignUp.page";
import AboutUs from "./pages/AboutUs/AboutUs.page";
import CreateClassRoom from "./pages/CreateClassroom/CreateClassRoom.page";
import SeeClassRooms from "./pages/SeeClassRooms/SeeClassRooms.page";
import RubricsPage from "./pages/RubricsPage/RubricsPage.page";
import CreateRubric from "./pages/CreateRubric/CreateRubric";
import CreateAssignment from "./pages/CreateAssignment/CreateAssignment";

import AssignmentList from "./components/AssignmentList/AssignmentList";
import Copyright from "./components/Copyright/Copyright.component";
import Navigation from "./components/Navigation/Navigation.component";
import AtClassRoom from "./pages/ClassRoom/AtClassRoom.page";

import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const InitialState = {
  currentUser: JSON.parse(localStorage.getItem("currentUser")),
  currentClass: sessionStorage.getItem("currentClass"),
  users: [],
  userToken: localStorage.getItem("userToken"),
};
// Mover esto a un componente aparte.
class App extends Component {
  state = InitialState;

  componentDidMount() {
    const { userToken } = this.state;
    if (userToken) {
      fetch("https://school2cool-api.herokuapp.com/users", {
        headers: {
          Authorization: userToken,
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

  componentDidUpdate() {}

  changeState = (appState, value) => {
    if (!appState) return;
    if (appState === "LOGOUT") {
      this.setState({ currentUser: null, userToken: null });
      localStorage.clear();
    }
    if (typeof appState === "object") {
      this.setState(appState);
    } else if (
      typeof appState === "string" &&
      this.state.hasOwnProperty(appState)
    ) {
      this.setState({ [appState]: value });
    }
  };

  render() {
    const { users, currentUser, currentClass } = this.state;

    return (
      <div>
        <Navigation currentUser={currentUser} changeState={this.changeState} />
        <div style={{ backgroundColor: "white" }}>
          <Switch>
            <Route
              exact
              path="/"
              render={() => {
                return (
                  <div className="auth-inner" style={{ marginTop: 100 }}>
                    <AboutUs />
                  </div>
                );
              }}
            />
            <Route
              path="/sign-in"
              render={() => {
                return (
                  <div className="auth-inner" style={{ marginTop: 50 }}>
                    {!currentUser ? (
                      <Login changeState={this.changeState} />
                    ) : (
                      <Redirect to="/" />
                    )}
                  </div>
                );
              }}
            />
            <Route
              path="/sign-up"
              render={() => {
                return (
                  <div className="auth-inner" style={{ marginTop: 50 }}>
                    <SignUp />
                  </div>
                );
              }}
            />
            <Route
              path="/createclassroom"
              render={() => {
                return <CreateClassRoom />;
              }}
            />
            <Route
              path="/classrooms"
              render={() => {
                return (
                  <div className="auth-wrapper" style={{ marginTop: 30 }}>
                    <SeeClassRooms users={users} />
                  </div>
                );
              }}
            />
            <Route
              path="/atclassroom"
              render={() => {
                return (
                  <div className="auth-wrapper" style={{ marginTop: 30 }}>
                    <AtClassRoom />
                  </div>
                );
              }}
            />
            <Route
              path="/rubrics"
              render={() => {
                return <RubricsPage />;
              }}
            />
            <Route
              path="/createRubric"
              render={() => {
                return (
                  <div className="auth-wrapper" style={{ marginTop: 30 }}>
                    <CreateRubric />
                  </div>
                );
              }}
            />
            <Route
              path="/createAssignment"
              render={() => {
                return <CreateAssignment />;
              }}
            />
            <Route
              path="/assignmentListStudent"
              render={() => {
                return <AssignmentList isTeacher={false} />;
              }}
            />
            <Route
              path="/assignmentListTeacher"
              render={() => {
                return <AssignmentList isTeacher={true} />;
              }}
            />
            <Route
              path="/recoverPass"
              render={() => {
                return !currentUser ? <Redirect to="/" /> : <RecoverPassword />;
              }}
            />
          </Switch>
        </div>
        <Copyright />
      </div>
    );
  }
}

export default App;
