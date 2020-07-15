import React, { Component } from "react";

import { Link } from "react-router-dom";
import "./classRoom.css";
import { InputGroup, FormControl } from "react-bootstrap";
import Axios from "axios";

export default class CreateClassRoom extends Component {
  handleSubmitClassroom = (e) => {
    e.preventDefault();
    const { name, description } = this.state;
    const body = { name, description };
    console.log(body);
    Axios.post(
      "https://school2cool-api.herokuapp.com/classrooms/create",
      body,
      {
        headers: { Authorization: `${localStorage.getItem("userToken")}` },
      }
    )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log("Something went wrong!");
      });
  };
  handleChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value, error: false });
  };
  render() {
    return (
      <form>
        <div id="title">
        <h1 className="card-title" >Crear aula</h1>
        <p id="s">Un aula permite que docente y alumnos puedan compartir conocimientos en un ambiente diseñado para aprovechar al máximo los recursos disponibles</p>
        </div>
        <InputGroup size="sm" className="mb-3">
          <InputGroup.Prepend>
            <InputGroup.Text id="inputGroup-sizing-sm">
              Nombre del aula:
            </InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            name="name"
            aria-label="Small"
            aria-describedby="inputGroup-sizing-sm"
            placeholder="Aula"
            onChange={this.handleChange}
          />
        </InputGroup>

        <InputGroup>
          <InputGroup.Prepend>
            <InputGroup.Text>Descripción</InputGroup.Text>
          </InputGroup.Prepend>
          <FormControl
            id="textarea"
            name="description"
            as="textarea"
            aria-label="With textarea"
            placeholder="Escriba una breve descripción del aula ha crear"
            onChange={this.handleChange}
          />
        </InputGroup>

        <hr />
        <Link to="/classrooms">
          <button
            onClick={this.handleSubmitClassroom}
            type="submit"
            className="btn btn-outline-primary btn-block"
          >
            Crear aula
          </button>
        </Link>
        <hr />
        <Link to={"/classrooms"}>
          <button className="btn btn-outline-success btn-block">
            Ver aulas
          </button>
        </Link>
      </form>
    );
  }
}
