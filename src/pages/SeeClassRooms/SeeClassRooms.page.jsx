import React, { Component } from "react";
import { Card, Form } from "react-bootstrap";
import  "./seeClassRooms.css";
const classrooms = [
  {
    id: 0,
    name: "Lengua Española",
    description: "Este es el grupo 6 de la materia de Lengua Española de 7mo grado",
    border: "primary",
  },
  {
    id: 1,
    name: "Matemáticas",
    description: "Profesora Jazmin Matos de 8vo A",
    border: "success",
  },
  {
    id: 2,
    name: "Ciencias Sociales",
    description: "Grupo de la materia de 6to grado",
    border: "danger",
  },
  {
    id: 3,
    name: "Ciencias Sociales",
    description: "Grupo de la materia de 8to grado",
    border: "warning",
  },
];
export default class SeeClassRooms extends Component {
  render() {
    return (
      <form id="formulario">
        <div id="title">
        <h1>Ver aulas</h1>
        <hr />
        <h3>Yo soy...</h3>
        
        <Form.Group controlId="formBasicCheckbox">
          <Form.Check type="radio" inline label="Docente" />
          <Form.Check type="radio" inline label="Estudiante" />
        </Form.Group>
        </div>
        <div id="content">
        {classrooms.map((classroom) => {
          return (
            <div id="singleCard">
            <Card border={classroom.border} style={{ width: "18rem" ,height: "8rem"}}>
              <Card.Header key={classroom.id}>{classroom.name}</Card.Header>
              <Card.Body>
                <Card.Subtitle className="mb-2 text-muted">
                  {classroom.description}
                </Card.Subtitle>
              </Card.Body>
            </Card>
            </div>
          );
        })}
        </div>
      </form>
    );
  }
}
