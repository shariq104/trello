import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Board from "./components/board";
import CreateBoard from "./components/buttons/createBoard";
import PopUp from "./components/modal/popup";

function App() {
  let data = [
    {
      boardId: uuidv4(),
      boardTitle: "Board 1",
      items: [
        { itemId: uuidv4(), boardId: 1, title: "Item 1" },
        { itemId: uuidv4(), boardId: 1, title: "Item 2" },
        { itemId: uuidv4(), boardId: 1, title: "Item 3" },
      ],
    },
    {
      boardId: uuidv4(),
      boardTitle: "Board 2",
      items: [
        { itemId: uuidv4(), boardId: 2, title: "Item 1" },
        { itemId: uuidv4(), boardId: 2, title: "Item 2" },
      ],
    },
  ];

  const [show, setShow] = useState(false);
  const [modalType, setModalType] = useState("board");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createBoard = () => {
    setModalType("board");
    handleShow();
  };

  const createCard = (boardId, title) => {
    setModalType("card");
    handleShow();
  };

  return (
    <>
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          {data.map((board) => (
            <Col md="auto">
              <Board data={board} />
            </Col>
          ))}
          <CreateBoard createBoard={createBoard} />
        </Row>
      </Container>
      <PopUp type={modalType} handleClose={handleClose} show={show} />
    </>
  );
}

export default App;
