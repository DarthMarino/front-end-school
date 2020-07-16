import React, { Component } from "react";
import UsersTable from "../UsersTable/UsersTable.component";
import { Modal } from "react-bootstrap";

export default class InviteUsers extends Component {
  state = { selectedUser: null, searchField: "", classUsers: [] };
  fetchRef = null;

  componentDidMount() {
    if (!this.fetchRef) {
      const classRoomId = localStorage.getItem("currentClass");
      console.log(classRoomId);
      this.fetchRef = fetch(
        `https://school2cool-api.herokuapp.com/classrooms/${classRoomId}/students`,
        {
          headers: {
            Authorization: localStorage.getItem("userToken"),
            "Content-Type": "application/json",
            "Access-Control-Allow-Origin":
              "https://school2cool-api.herokuapp.com",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          this.setState({ classUsers: data });
        })
        .catch(console.log);
    }
  }

  handleSearch = ({ target: { value } }) => {
    this.setState({ searchField: value });
  };

  render() {
    const { searchField, classUsers } = this.state;
    const { users, changeState, show = false, onHide = () => {} } = this.props;
    return (
      <Modal show={show} onHide={onHide}>
        <Modal.Header>
          <Modal.Title>Invitar Usuarios</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div>
            <input
              type="input"
              className="form-control"
              placeholder="Busca por nombre o usuario."
              onChange={this.handleSearch}
            />
          </div>
          <UsersTable
            searchField={searchField}
            classUsers={classUsers}
            users={users}
            handleSelect={this.handleSelect}
            changeState={changeState}
          />
        </Modal.Body>
      </Modal>
    );
  }
}
