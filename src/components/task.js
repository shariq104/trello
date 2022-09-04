import React from "react";
import Card from "react-bootstrap/Card";
import Dropdown from "react-bootstrap/Dropdown";

const Task = (props) => {
  const { data, boardData, boardId, moveItem } = props;
  const boards = Array.from(boardData);

  const indexOfObject = boards.findIndex((object) => {
    return object.boardId === boardId;
  });

  boards.splice(indexOfObject, 1);
  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>
        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Move to...
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {boards.map((item) => {
              return (
                <Dropdown.Item
                  onClick={() => moveItem(data.itemId, boardId, item.boardId)}
                >
                  {item.boardTitle}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
        </Dropdown>
      </Card.Body>
    </Card>
  );
};

export default Task;
