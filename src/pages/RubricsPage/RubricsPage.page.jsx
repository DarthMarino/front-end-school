import React, { useState, useEffect } from "react";
import axios from "axios";
import Button from "react-bootstrap/Button";
import RubricList from "../../components/RubricList/RubricList.component";

const RubricsPage = (props) => {
  const [rubricListState, setRubricListState] = useState({
    rubricList: <h1> Espere un momento... </h1>,
  });

  useEffect(() => {
    const token = localStorage.getItem("userToken");
    const url = "https://school2cool-api.herokuapp.com";
    axios
      .get(`${url}/rubrics`, {
        headers: { Authorization: `${token}` },
      })
      .then((response) => {
        if (!(Array.isArray(response.data) && response.data.length)) {
          setRubricListState({ rubricList: <h1> Aún no tienes rúbricas</h1> });
        } else {
          setRubricListState({
            rubricList: <RubricList rubrics={response.data}></RubricList>,
          });
        }
      })
      .catch((e) => {
        console.log("Something went wrong!");
        setRubricListState({ rubricList: <h1> Ocurrió un error</h1> });
      });
  }, []);

  const createRubricPage = () => {};
  return (
    <div>
      <h1> Tus Rúbricas </h1>
      <Button
        type="button"
        onClick={createRubricPage}
        variant="outline-secondary"
      >
        Crea una rúbrica
      </Button>
      <br />
      <br />
      <div style={{ border: "1px solid black", padding: 10 }}>
        {rubricListState.rubricList}
      </div>
    </div>
  );
};

export default RubricsPage;
