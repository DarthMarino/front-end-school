import React from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

const Navigation = ({ currentUser }) => (
  <Navbar collapseOnSelect expand="lg" bg="light" variant="light">
    <Navbar.Brand href="#home">
      {currentUser ? currentUser.name : "School2Cool :D"}
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
    <Navbar.Collapse id="responsive-navbar-nav">
      <Nav className="mr-auto">
        <NavDropdown title="Aulas" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Ver Aulas</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Crear Aulas</NavDropdown.Item>
        </NavDropdown>
        <NavDropdown title="Asignaciones" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">
            Ver Asignaciones
          </NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">
            Crear Asignaciones
          </NavDropdown.Item>
        </NavDropdown>
        <Nav.Link href="#pricing">Rúbricas</Nav.Link>
        <NavDropdown title="Revisiones" id="collasible-nav-dropdown">
          <NavDropdown.Item href="#action/3.1">Solicitadas</NavDropdown.Item>
          <NavDropdown.Item href="#action/3.2">Atendidas</NavDropdown.Item>
        </NavDropdown>
      </Nav>
      <Nav>
        <Nav.Link href="/sign-in">
          {currentUser ? (
            currentUser.name
          ) : (
            <svg
              width="1em"
              height="1em"
              viewBox="0 0 16 16"
              class="bi bi-file-person-fill"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M2 3a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V3zm6 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm5 2.755C12.146 11.825 10.623 11 8 11s-4.146.826-5 1.755V13a1 1 0 0 0 1 1h8a1 1 0 0 0 1-1v-.245z"
              />
            </svg>
          )}
        </Nav.Link>
      </Nav>
    </Navbar.Collapse>
  </Navbar>
);

export default Navigation;
