import React, { Component } from "react";
import recoverPass from './recoverPass';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./icon2.png";

export default class Login extends Component {
    render() {
        return (
        <form>
                <h3>¡Bienvenido a School2Cool!</h3>
                {/* <img src={icon2}/> */}
                <div className="form-group">
                    {/* <label>ID usuario</label> */}
                    <input type="text" className="form-control" placeholder="Id usuario" />
                    <small className="text-muted">
                    School2Cool nunca compartirá su información
                    </small>
                </div>

                <div className="form-group">
                    {/* <label>Clave</label> */}
                    <input type="password" className="form-control" placeholder="Introduzca su clave" />
                </div>

                <div className="form-group">    
                    <div className="custom-control custom-checkbox">
                        <input type="checkbox" className="custom-control-input" id="customCheck1" />
                        <label className="custom-control-label" htmlFor="customCheck1">Recordarme</label>
                    </div>
                </div>

                <button type="submit" className="btn btn-outline-primary btn-block">Iniciar sesión</button>
                <button type="submit" className="btn btn-outline-warning btn-block">Iniciar sesión con google</button>
                <p className="forgot-password text-right">
                    ¿Olvidaste tu <Link to={"/recoverPass"}>contraseña?</Link>
                </p>
                <Router>
            <Switch>
              <Route path="/recoverPass" component={recoverPass} />
            </Switch>
            </Router>
            </form>
    );
}
}

