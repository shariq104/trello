import React, { useState } from "react";
import Card from "react-bootstrap/Card";
import Stack from "react-bootstrap/Stack";
import Dropdown from "react-bootstrap/Dropdown";
import { Trash, Pencil, Check } from "react-bootstrap-icons";

const Task = (props) => {
  const { data, boardData, boardId, moveEditDelete } = props;

  // Only for editing the text on cards
  const [editTitle, setEditTitle] = useState(data.title);
  const [isEdit, setIsEdit] = useState(false);
  const saveNewText = () => {
    setIsEdit(false);
    moveEditDelete(data.itemId, boardId, editTitle, "edit");
  };
  // =======================================

  // hides the name of the current board from dropdown
  const boards = Array.from(boardData);
  const indexOfObject = boards.findIndex((object) => {
    return object.boardId === boardId;
  });
  boards.splice(indexOfObject, 1);

  return (
    <Card style={{ width: "100%" }}>
      <Card.Body>
        <Card.Title>{data.title}</Card.Title>

        {isEdit && (
          <Stack direction="horizontal">
            <input
              className="my-4"
              placeholder="Type new text here"
              type="text"
              onChange={(e) => {
                setEditTitle(e.target.value);
              }}
            ></input>
            <Check onClick={saveNewText} />
          </Stack>
        )}

        <Dropdown>
          <Dropdown.Toggle variant="success" id="dropdown-basic">
            Move to...
          </Dropdown.Toggle>

          <Dropdown.Menu>
            {boards.map((item) => {
              return (
                <Dropdown.Item
                  onClick={() =>
                    moveEditDelete(data.itemId, boardId, item.boardId, "move")
                  }
                >
                  {item.boardTitle}
                </Dropdown.Item>
              );
            })}
          </Dropdown.Menu>
          <Stack className="my-2" direction="horizontal" gap={1}>
            <Pencil
              onClick={() => {
                setIsEdit(!isEdit);
              }}
            />
            <Trash
              onClick={() =>
                moveEditDelete(data.itemId, boardId, null, "delete")
              }
            />
          </Stack>
        </Dropdown>
      </Card.Body>
    </Card>
  );
};

export default Task;
