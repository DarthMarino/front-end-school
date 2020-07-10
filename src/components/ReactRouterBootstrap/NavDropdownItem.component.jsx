import React from "react";
import { Link } from "react-router-dom";

const NavDropdownItem = ({ children, to, className = "", ...otherProps }) => (
  <Link className={`dropdown-item ${className}`} to={to || "/"} {...otherProps}>
    {children}
  </Link>
);

export default NavDropdownItem;
