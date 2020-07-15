import React, { Component } from "react";
import { Button, ButtonGroup, Table, Modal } from "react-bootstrap";
import ControlPointIcon from '@material-ui/icons/ControlPoint';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import "./AtClassRoom.css"
import SeeClassRooms from "../SeeClassRooms/SeeClassRooms.page";
import { Link } from "react-router-dom";

export default class AtClassRoom extends Component {

  constructor() {
    super();
    this.state = { checked: true };
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(checked) {
    this.setState({ checked });
  }

  render() {
    const assigments = [
      {
        id: 0,
        name: 'Asignacion 1',
        grade: 15,
        base: 20
      },
      {
        id: 1,
        name: 'Asignacion 2',
        grade: 20,
        base: 20

      },
      {
        id: 2,
        name: 'Asignacion 3',
        grade: 7,
        base: 10
      },
    ]
    return (
      <form>
          <Link to="/classrooms"><button id="btnSalir" className="btn btn-outline-danger" >Salir del aula</button></Link>
        <div id="title">
          <h1 className="card-title" >Lengua Española</h1>
        </div>
        <hr />
        <div id="datosGenerales">
          <strong>Descripción</strong>
          <p>Este es el grupo 6 de la materia de Lengua Española de 7mo grado</p>
          <strong>Datos docente</strong>
          <p>Margarita Santana Santana<br /><a href="#">margarita.santana@gmail.com</a></p>
          <br />
          <ButtonGroup className="mb-1" margin="auto">
            <Button
              variant="outline-success"
              onClick={() => this.handleChange(true)}>Asignaciones</Button>
            <Button
              variant="outline-success"
              onClick={() => this.handleChange(false)}>Revisiones</Button>
          </ButtonGroup>
        </div>

        <hr />
        {this.state.checked ? (
          <div className="Asignaciones">
            <p>Calificación acumulada: X </p>
            <label>Base acumulada: Y</label>
            <Table striped bordered hover>
              <tbody>
                <tr>
                  <th></th>
                  <th>Asignación</th>
                  <th><em>Calificación</em></th>
                  <th><em>Base</em></th>
                </tr>
                {
                  assigments.map((asig) => {
                    return (
                      <tr key={asig.id}>
                        <td><ZoomInIcon /></td>
                        <td>{asig.name}</td>
                        <td>{asig.grade}</td>
                        <td>{asig.base}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </Table>
          </div>
        ) : (
            <div className="Revisiones">
              <h3>Usted no tiene revisiones pendientes</h3>
              <Button variant="outline-danger" id="btn">Pedir revisión</Button>
            </div>
          )}



      </form>
    );
  }
}
