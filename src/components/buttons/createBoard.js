import React from "react";
import Button from "react-bootstrap/Button";

const CreateBoard = (props) => {
  return (
    <Button
      style={{ width: "150px" }}
      as="input"
      type="button"
      value="Add board"
      onClick={props.createBoard}
    />
  );
};

export default CreateBoard;
