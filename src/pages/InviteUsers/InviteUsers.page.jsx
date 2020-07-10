import React, { Component } from "react";
import UsersTable from "../../components/UsersTable/UsersTable.component";

export default class InviteUsers extends Component {
  state = { selectedUser: null, searchField: "", classUsers: [] };
  fetchRef = null;

  componentDidMount() {
    if (!this.fetchRef) {
      this.fetchRef = fetch(
        "http://localhost:5000/classrooms/5ef7dab69335230d20843e45/students",
        {
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWY3ZDYyY2JhZGNlZjJlNjA4ZWU4ODciLCJpYXQiOjE1OTMzMDA5NzV9.HgM4EpK6pTKKSeKPIsnd0a5PVeLhYVQMEKBsDW2WdIY",
            "Content-Type": "application/json",
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
    const { users, changeState } = this.props;
    return (
      <>
        <h3>Invitar Usuarios</h3>

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
      </>
    );
  }
}
