import React from "react";
import Button from "react-bootstrap/Button";

const CreateTask = (props) => {
  return (
    <Button
      style={{ width: "150px", marginTop: "50px" }}
      as="input"
      type="button"
      value="Add task"
      onClick={() => props.createCard(props.boardId)}
    />
  );
};

export default CreateTask;
