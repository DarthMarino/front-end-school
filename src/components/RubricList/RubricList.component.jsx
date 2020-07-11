import React from "react";
import Card from "react-bootstrap/Card";

const RubricList = (props) => {
  const rubrics = props.rubrics ? props.rubrics : [];

  return (
    <div>
      {rubrics.map((rubric) => {
        return (
          <Card key={rubric._id}>
            <Card.Body>
              <Card.Title>{rubric.name}</Card.Title>
              <Card.Text>{rubric.description}</Card.Text>
              <Card.Link href="#">Ver</Card.Link>
            </Card.Body>
          </Card>
        );
      })}
    </div>
  );
};

export default RubricList;
