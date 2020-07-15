import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import { Link } from "react-router-dom";
import NotificationButton from "../NotificationButton/NotificationButton.component";
import NavDropdownItem from "../ReactRouterBootstrap/NavDropdownItem.component";
import NavLink from "../ReactRouterBootstrap/NavLink.component";

const Navigation = ({ currentUser, changeState }) => {
  const dropdownTitle = currentUser ? (
    `${currentUser.name} ${currentUser.lastName}`
  ) : (
    <svg
      width="1em"
      height="1em"
      viewBox="0 0 16 16"
      className="bi bi-file-person-fill"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        d="M2 3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3zm6 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 11.825 10.623 11 8 11s-4.146.826-5 1.755V13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z"
      />
    </svg>
  );

  return (
    <Navbar
      id="app-nav"
      collapseOnSelect
      expand="lg"
      bg="light"
      variant="light"
    >
      <Link to="/">
        <Navbar.Brand>School2Cool :D</Navbar.Brand>
      </Link>

      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <ul className="mr-auto" />
        {currentUser ? (
          <>
            <Nav className="ml-auto">
              <NavDropdown title="Aulas" id="collasible-nav-dropdown">
                <NavDropdownItem to="/classrooms">Ver Aulas</NavDropdownItem>
                <NavDropdownItem to="/createclassroom">
                  Crear Aulas
                </NavDropdownItem>
              </NavDropdown>
              <NavDropdown title="Asignaciones" id="collasible-nav-dropdown">
                <NavDropdownItem to="/action/3.1">
                  Ver Asignaciones
                </NavDropdownItem>
                <NavDropdownItem to="/createAssignment">
                  Crear Asignaciones
                </NavDropdownItem>
              </NavDropdown>
              <NavLink to="/rubrics">Rúbricas</NavLink>
              <NavLink to="/inviteUsers">Invitar Usuarios</NavLink>
              <NavDropdown title="Revisiones" id="collasible-nav-dropdown">
                <NavDropdownItem to="/action/3.1">Solicitadas</NavDropdownItem>
                <NavDropdownItem to="/action/3.2">Atendidas</NavDropdownItem>
              </NavDropdown>
            </Nav>
            <Nav>
              <NotificationButton />
            </Nav>
          </>
        ) : null}
        <Nav>
          {currentUser ? (
            <NavDropdown title={dropdownTitle} id="collasible-nav-dropdown">
              <NavDropdownItem to="/action/3.1">Mi usuario</NavDropdownItem>
              <NavDropdownItem
                to="/"
                onClick={() => {
                  changeState("LOGOUT");
                }}
              >
                Cerrar Sesión
              </NavDropdownItem>
            </NavDropdown>
          ) : (
            <NavLink to="/sign-in">
              Iniciar Sesión
              <svg
                width="1em"
                height="1em"
                viewBox="0 0 16 16"
                className="bi bi-file-person-fill"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M2 3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3zm6 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 11.825 10.623 11 8 11s-4.146.826-5 1.755V13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z"
                />
              </svg>
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
