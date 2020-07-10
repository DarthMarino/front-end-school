import React, { Component } from "react";

import { Link } from "react-router-dom";
import "./classRoom.css";
import { InputGroup, FormControl } from "react-bootstrap";

export default class Login extends Component {
  render() {
    return (
      <form>
        <h1>Crear aula</h1>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">
              Nombre del aula:
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Aula"
          />
        </InputGroup>

        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Descripción</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            as="textarea"
            aria-label="With textarea"
            placeholder="Escriba una breve descripción del aula ha crear"
          />
        </InputGroup>

        <hr />
        <Link to={"/classroom"}>
          <button type="submit" className="btn btn-outline-primary btn-block">
            Crear aula
          </button>
        </Link>
        <hr />
        <Link to={"/classrooms"}>
          <button type="submit" className="btn btn-outline-success btn-block">
            Ver aulas
          </button>
        </Link>
      </form>
    );
  }
}
