import React from "react";

import { Alerts } from "../alerts";
import { Icons } from "../icons";

import { Button } from "./Button";

interface Props {
  handleDelete: () => void;
}
export const Delete: React.FC<Props> = ({ handleDelete }) => {
  const handleClick = () => {
    Alerts.deleteAlert({ handleOk: handleDelete });
  };

  const handleLongPress = () => {
    handleDelete();
  };

  return (
    <Button
      id="delete"
      handleClick={handleClick}
      handleLongPress={handleLongPress}
    >
      <Icons.Delete />
    </Button>
  );
};
