import React, { useCallback } from "react";
import { Button, Table } from "react-bootstrap";
import "./UsersTable.styles.css";

const UsersTable = ({
  users = [],
  classUsers = [],
  changeState = () => {},
  searchField = "",
}) => {
  const handleSelect = useCallback(
    (user) => {
      fetch(
        "https://school2cool-api.herokuapp.com/classrooms/5ef7dab69335230d20843e45/add_student",
        {
          method: "post",
          headers: {
            Authorization:
              "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWY3ZDYyY2JhZGNlZjJlNjA4ZWU4ODciLCJpYXQiOjE1OTMzMDA5NzV9.HgM4EpK6pTKKSeKPIsnd0a5PVeLhYVQMEKBsDW2WdIY",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(user),
        }
      )
        .then((data) => {
          console.log(data);
          changeState("currentUser", user);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [changeState]
  );
  return (
    <Table responsive className="users-table">
      <tbody>
        <tr />
        {users.length ? (
          users.map((user) => {
            if (!user.name.toLowerCase().includes(searchField.toLowerCase()))
              return null;

            if (classUsers.find((classUser) => classUser.id === user.id)) {
              return null;
            }
            return (
              <tr key={user.id}>
                <td>{user.name}</td>
                <td className="bruh">@{user.userName}</td>
                <td>
                  <Button variant="primary" onClick={() => handleSelect(user)}>
                    +
                  </Button>
                </td>
              </tr>
            );
          })
        ) : (
          <tr>
            <td align="center">No usuarios encontrados.</td>
          </tr>
        )}
      </tbody>
    </Table>
  );
};

export default UsersTable;
