import React, { Component } from "react";

export default class RecoverPassword extends Component {
  // state = {  }
  render() {
    return (
      <>
        <h3>Cambiar clave</h3>

        <div className="form-group">
          <h6>Introduzca su correo electronico</h6>
          <input
            type="input"
            className="form-control"
            placeholder="Correo de su cuenta"
          />
        </div>
        <button type="submit" className="btn btn-outline-success btn-block">
          Cambiar clave
        </button>
      </>
    );
  }
}
