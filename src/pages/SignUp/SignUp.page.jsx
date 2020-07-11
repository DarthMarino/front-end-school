import React, { Component } from "react";
import { Link } from "react-router-dom";

export default class SignUp extends Component {
  render() {
    return (
      <form>
        <h3>Registrarse</h3>

        <div className="form-group">
          <label>Primer nombre</label>
          <input
            type="text"
            className="form-control"
            placeholder="Primer nombre"
          />
        </div>

        <div className="form-group">
          <label>Apellido</label>
          <input type="text" className="form-control" placeholder="Apellido" />
        </div>

        <div className="form-group">
          <label>ID usuario</label>
          <input
            type="text"
            className="form-control"
            placeholder="Introduzca su ID"
          />
        </div>

        <div className="form-group">
          <label>Clave</label>
          <input
            type="password"
            className="form-control"
            placeholder="Introduzca su clave"
          />
        </div>

        <button type="submit" className="btn btn-primary btn-block">
          Registrarse
        </button>

        <p className="forgot-password text-right">
          Ya tienes una cuenta con nosotros?{" "}
          <Link to="/sign-in">Entra aquí</Link>
        </p>
      </form>
    );
  }
}
