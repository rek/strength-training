import React from "react";
import { StyleSheet } from "react-native";

import { Alerts } from "../alerts";
import { Icons } from "../icons";

import { Props } from "./Button";
import { IconButton } from "./ButtonIcon";

export const Delete: React.FC<Props> = ({ text, handleClick, ...rest }) => {
  const handleClickProxy = () => {
    Alerts.deleteAlert({ handleOk: handleClick });
  };

  const handleLongPress = () => {
    handleClick();
  };

  return (
    <IconButton
      id="delete"
      extraStyles={styles.small}
      handleClick={handleClickProxy}
      handleLongPress={handleLongPress}
      renderIcon={() => <Icons.Delete size={36} />}
      {...rest}
    />
  );
};

const styles = StyleSheet.create({
  small: {
    padding: 10,
  },
});
