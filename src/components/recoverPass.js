import React, { Component } from 'react';

export default class recoverPass extends Component {
    // state = {  }
    render() {
        return (
            <>
                <h3>Establecer nueva clave</h3>

                <div className="form-group">
                    <h6>Introduzca su clave actual</h6>
                    <input type="password" className="form-control" placeholder="Clave actual" />
                </div>

                <div className="form-group">
                    <h6>Introduzca su nueva clase</h6>
                    <input type="password" className="form-control" placeholder="Nueva clave" />
                </div>

                <div className="form-group">
                    <h6>Introduzca su clave nuevamente</h6>
                    <input type="password" className="form-control" placeholder="Repita clave" />
                </div>

                <button type="submit" className="btn btn-outline-success btn-block">Cambiar clave</button>
            </>
        );
    }
}