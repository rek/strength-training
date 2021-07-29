import * as React from "react";
import { StyleSheet } from "react-native";

import { Icons } from "../icons";

import { Props as ButtonProps } from "./Button";
import { IconButton } from "./ButtonIcon";

export const Edit: React.FC<ButtonProps> = (props) => {
  return (
    <IconButton
      extraStyles={styles.normal}
      renderIcon={() => <Icons.Edit />}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  normal: {
    padding: 10,
  },
});
