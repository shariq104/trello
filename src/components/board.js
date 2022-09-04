import React from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Task from "./task";
import CreateTask from "./buttons/createTask";

const Board = (props) => {
  const { createCard, data, boardData, moveItem } = props;
  return (
    <Container className="justify-content-md-center" style={{ width: "18rem" }}>
      <Row className="justify-content-md-center">
        <h2>Title: {data.boardTitle}</h2>
        {data.items.map((item) => (
          <Task
            data={item}
            boardData={boardData}
            boardId={data.boardId}
            moveItem={moveItem}
          />
        ))}
      </Row>
      <CreateTask boardId={data.boardId} createCard={createCard} />
    </Container>
  );
};

export default Board;
