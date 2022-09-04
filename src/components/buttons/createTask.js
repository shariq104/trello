import React from "react";
import Button from "react-bootstrap/Button";

const CreateTask = (props) => {
  return (
    <Button
      className="mt-2 mx-auto"
      style={{ width: "100px" }}
      as="input"
      type="button"
      value="Add task"
      onClick={() => props.createCard(props.boardId)}
    />
  );
};

export default CreateTask;
