import React, { useState, useEffect, useCallback } from "react";
import { Card, Form } from "react-bootstrap";
import "./seeClassRooms.css";
import InviteUsers from "../../components/InviteUsers/InviteUsers.component";
const colors = [
  "primary",
  "secondary",
  "success",
  "danger",
  "warning",
  "info",
  "dark",
];
const randomize = () => {
  return Math.floor(Math.random() * 6 + 0);
};

const SeeClassRooms = () => {
  const [classrooms, setClassrooms] = useState([]);
  const [show, setShow] = useState(false);

  const onHide = useCallback(() => {
    setShow(false);
  }, [setShow]);

  useEffect(() => {
    fetch(`https://school2cool-api.herokuapp.com/classrooms/`, {
      headers: {
        Authorization: localStorage.getItem("userToken"),
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((response) => {
        setClassrooms(response);
      });
    return () => {};
  }, []);

  return (
    <>
      <form id="formulario">
        <div id="title">
          <h1>Ver aulas</h1>
          <hr />
          <h3>Yo soy...</h3>
          <Form.Group controlId="formBasicCheckbox">
            <Form.Check type="checkbox" inline label="Docente" />
            <Form.Check type="checkbox" inline label="Estudiante" />
          </Form.Group>
        </div>
        <div id="content">
          {classrooms.map((classroom) => {
            return (
              <div
                key={classroom._id}
                id="singleCard"
                onClick={() => {
                  localStorage.setItem("currentClass", classroom._id);
                  setShow(true);
                }}
              >
                <Card
                  border={colors[randomize()]}
                  style={{ width: "18rem", height: "8rem" }}
                >
                  <Card.Header>{classroom.name}</Card.Header>
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

      <InviteUsers show={show} onHide={onHide} />
    </>
  );
};

export default SeeClassRooms;
