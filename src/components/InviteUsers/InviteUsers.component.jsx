import React, { useEffect, useState, useCallback } from "react";
import UsersTable from "../UsersTable/UsersTable.component";
import { Modal } from "react-bootstrap";

const InviteUsers = ({
  users,
  changeState,
  currentClass,
  show = false,
  onHide = () => {},
}) => {
  const [searchField, setSearchField] = useState("");
  const [classUsers, setClassUsers] = useState([]);

  useEffect(() => {
    if (currentClass)
      fetch(
        `https://school2cool-api.herokuapp.com/classrooms/${currentClass}/students`,
        {
          headers: {
            Authorization: localStorage.getItem("userToken"),
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          setClassUsers(data);
        })
        .catch(console.log);
  }, [currentClass, setClassUsers]);

  const handleSelect = useCallback(
    (user) => {
      fetch(
        `https://school2cool-api.herokuapp.com/classrooms/${currentClass}/add_student`,
        {
          method: "post",
          headers: {
            Authorization: localStorage.getItem("userToken"),
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            student: user.id,
          }),
        }
      )
        .then((data) => {
          setClassUsers([...classUsers, user]);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    [changeState, setClassUsers, classUsers, currentClass, users]
  );

  const handleSearch = useCallback(
    ({ target: { value } }) => {
      setSearchField(value);
    },
    [setSearchField]
  );

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
            onChange={handleSearch}
          />
        </div>
        <UsersTable
          searchField={searchField}
          classUsers={classUsers}
          users={users}
          handleSelect={handleSelect}
          changeState={changeState}
        />
      </Modal.Body>
    </Modal>
  );
};

export default InviteUsers;
