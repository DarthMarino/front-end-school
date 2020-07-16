import React, { useState, useCallback } from "react";
import RecoverPassword from "../RecoverPassword/RecoverPassword.page";
import Icon2 from "./icon2.png";
import "./Login.styles.css";

const Login = ({ changeState: changeAppState }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [forgot, displayForgot] = useState(false);
  const [error, setError] = useState(false);

  const handleSubmit = useCallback(
    (event) => {
      event.preventDefault();
      fetch("https://school2cool-api.herokuapp.com/users/login", {
        method: "post",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      })
        .then((response) => response.json())
        .then((data) => {
          const { user, token } = data;
          if (!user || !token) {
            return setError(true);
          }
          localStorage.setItem("userToken", data.token);
          localStorage.setItem("currentUser", JSON.stringify(data.user));
          return changeAppState({
            currentUser: data.user,
            userToken: data.token,
          });
        })
        .catch((error) => {
          setError(true);
        });
    },
    [email, password, changeAppState, fetch, setError]
  );

  return (
    <form onSubmit={handleSubmit}>
      {!forgot ? (
        <>
          <h3>¡Bienvenido a School2Cool!</h3>
          <img src={Icon2} className="login-logo-img" alt="logo" />
          <div className="form-group">
            <label>Email</label>
            <input
              name="email"
              type="email"
              className="form-control"
              placeholder="email usuario"
              onChange={({ target: { value } }) => {
                setEmail(value);
              }}
            />
            <small className="text-muted">
              School2Cool nunca compartirá su información
            </small>
          </div>
          <label>Clave</label>
          <div className="form-group">
            <input
              name="password"
              type="password"
              className="form-control"
              placeholder="Introduzca su clave"
              onChange={({ target: { value } }) => {
                setPassword(value);
              }}
            />
          </div>
          <div className="form-group">
            <div className="custom-control custom-checkbox">
              <input
                name="remember"
                type="checkbox"
                className="custom-control-input"
                id="customCheck1"
              />
              <label className="custom-control-label" htmlFor="customCheck1">
                Recordarme
              </label>
            </div>
          </div>
          <a href="/">
            <button type="submit" className="btn btn-outline-primary btn-block">
              Iniciar sesión
            </button>
          </a>
          {error ? (
            <>
              <br />
              <div className="alert alert-danger" role="alert">
                Error inesperado
              </div>
            </>
          ) : null}
          {/* <button type="submit" className="btn btn-outline-warning btn-block">Iniciar sesión con google</button> */}
          {/*<GoogleButton />*/}
          <p className="forgot-password text-right">
            <a href="/sign-up">Crear una cuenta</a>
          </p>
          <p className="forgot-password text-right">
            <span
              className="cursor-pointer"
              onClick={() => {
                displayForgot(!forgot);
              }}
            >
              ¿Olvidaste tu contraseña?
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
                displayForgot(!forgot);
              }}
            >
              Atrás
            </span>
          </div>
        </>
      )}
    </form>
  );
};
export default Login;
