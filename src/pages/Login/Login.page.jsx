import React, { Component } from "react";
import RecoverPassword from "../RecoverPassword/RecoverPassword.page";
import GoogleButton from "../../components/GoogleButton/GoogleButton.component";
import Icon2 from "./icon2.png";
import "./Login.styles.css";

export default class Login extends Component {
  state = { displayForgot: false };

  render() {
    return (
      <form>
        {!this.state.displayForgot ? (
          <>
            <h3>¡Bienvenido a School2Cool!</h3>
            <img src={Icon2} className="login-logo-img" alt="logo" />
            <div className="form-group">
              <label>ID usuario</label>
              <input
                type="text"
                className="form-control"
                placeholder="Id usuario"
              />
              <small className="text-muted">
                School2Cool nunca compartirá su información
              </small>
            </div>
            <div className="form-group">
              {/* <label>Clave</label> */}
              <input
                type="password"
                className="form-control"
                placeholder="Introduzca su clave"
              />
            </div>
            <div className="form-group">
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck1"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  Recordarme
                </label>
              </div>
            </div>
            <button type="submit" className="btn btn-outline-primary btn-block">
              Iniciar sesión
            </button>
            {/* <button type="submit" className="btn btn-outline-warning btn-block">Iniciar sesión con google</button> */}
            <GoogleButton />
            <p className="forgot-password text-right">
              ¿Olvidaste tu
              <span
                className="cursor-pointer"
                onClick={() => {
                  this.setState({ displayForgot: !this.state.displayForgot });
                }}
              >
                contraseña?
              </span>
            </p>
          </>
        ) : (
          <>
            <RecoverPassword />
            <div className="text-right mt-1">
              <span
                className="cursor-pointer"
                onClick={() => {
                  this.setState({ displayForgot: !this.state.displayForgot });
                }}
              >
                Atrás
              </span>
            </div>
          </>
        )}
      </form>
    );
  }
}
