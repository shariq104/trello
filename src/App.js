import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Board from "./components/board";
import CreateBoard from "./components/buttons/createBoard";
import PopUp from "./components/modal/popup";
import useForceUpdate from "./components/custom hooks/rerender";
const _ = require("lodash");

function App() {
  const [data, setData] = useState(
    localStorage.getItem("appData")
      ? JSON.parse(localStorage.getItem("appData"))
      : []
  );

  useEffect(() => {
    getBoards();
  }, [data]);

  const [show, setShow] = useState(false);
  const [title, setTitle] = useState("");
  const [boardId, setboardId] = useState("");
  const [boardData, setboardData] = useState("");
  const [modalType, setModalType] = useState("board");
  const forceUpdate = useForceUpdate();
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

  const getBoards = () => {
    const boards = [];
    data.map((e) => {
      boards.push({ boardId: e.boardId, boardTitle: e.boardTitle });
    });
    setboardData(boards);
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
      const index = data
        .map((e) => {
          return e.boardId;
        })
        .indexOf(boardId);

      data[index].items.push({ itemId: uuidv4(), boardId, title });
      setData(data);
    }
    localStorage.setItem("appData", JSON.stringify(data));
    getBoards();
    setShow(false);
  };

  const moveItem = (itemId, currentBoard, targetBoard) => {
    let sourceBoard = _.find(data, (el) => el.boardId === currentBoard);
    let sourceBoardIndex = _.findIndex(
      data,
      (el) => el.boardId === currentBoard
    );
    let itemIndex = _.findIndex(
      sourceBoard.items,
      (el) => el.itemId === itemId
    );
    let item = _.find(sourceBoard.items, (el) => el.itemId === itemId);
    let destBoardIndex = _.findIndex(data, (el) => el.boardId === targetBoard);
    data[destBoardIndex].items.push(item);
    data[sourceBoardIndex].items.splice(itemIndex, 1);
    setData(data);
    localStorage.setItem("appData", JSON.stringify(data));
    forceUpdate();
  };

  return (
    <>
      <Container className="mt-4">
        <Row className="justify-content-md-center">
          {data.map((board) => (
            <Col md="auto">
              <Board
                data={board}
                createCard={createCard}
                boardData={boardData}
                moveItem={moveItem}
              />
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
