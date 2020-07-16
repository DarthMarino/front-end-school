import React, { useCallback } from "react";
import { Button, Table } from "react-bootstrap";
import "./UsersTable.styles.css";

const UsersTable = ({
  users = [],
  classUsers = [],
  changeState = () => {},
  searchField = "",
  handleSelect = () => {},
}) => {
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
                <td className="User">@{user.userName}</td>
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
