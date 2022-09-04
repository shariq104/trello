import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Board from "./components/board";
import CreateBoard from "./components/buttons/createBoard";
import PopUp from "./components/modal/popup";

function App() {
  const [data, setData] = useState(
    localStorage.getItem("appData")
      ? JSON.parse(localStorage.getItem("appData"))
      : []
  );

  useEffect(() => {
    localStorage.setItem("appData", JSON.stringify(data));
  }, [data]);

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [boardId, setboardId] = useState("");
  const [modalType, setModalType] = useState("board");
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const createBoard = () => {
    setModalType("board");
    handleShow();
  };

  const createCard = (boardId) => {
    setboardId(boardId);
    setModalType("task");
    handleShow();
  };

  const handleSave = () => {
    if (title != "" && modalType == "board") {
      setData(() => [
        ...data,
        {
          boardId: uuidv4(),
          boardTitle: title,
          items: [],
        },
      ]);
    } else if (title != "" && modalType == "task") {
      debugger;
      const index = data
        .map((e) => {
          return e.boardId;
        })
        .indexOf(boardId);
      debugger;

      data[index].items.push({ itemId: uuidv4(), boardId, title });
      setData(data);
    }
    setShow(false);
  };

  return (
    <>
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          {data.map((board) => (
            <Col md="auto">
              <Board data={board} createCard={createCard} />{" "}
            </Col>
          ))}
          <CreateBoard createBoard={createBoard} />
        </Row>
      </Container>
      <PopUp
        type={modalType}
        handleClose={handleClose}
        handleSave={handleSave}
        show={show}
        setTitle={setTitle}
      />
    </>
  );
}

export default App;
