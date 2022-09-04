import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Task from "./task";

const Board = (data) => {
  console.log(data);
  return (
    <Container style={{ width: "18rem" }}>
      <Row className="justify-content-md-center">
        <h2>Title: {data.data.boardTitle}</h2>
        {data.data.items.map((item) => (
          <Task data={item} />
        ))}
      </Row>
    </Container>
  );
};

export default Board;
