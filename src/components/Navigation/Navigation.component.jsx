import React from "react";
import { Link } from "react-router-dom";

const Navigation = ({ currentUser }) => (
  <nav className="navbar navbar-expand-lg navbar-light fixed-top">
    <div className="container">
      <Link className="navbar-brand" to="/sign-in">
        {currentUser ? currentUser.name : "School2Cool :D"}
      </Link>
      <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/sign-in">
              Iniciar sesión
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/inviteUsers">
              Invitar usuarios
            </Link>
          </li>
          <li className="danger">
            <Link className="nav-link" to="/sign-up">
              Regístrate
            </Link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
);

export default Navigation;
