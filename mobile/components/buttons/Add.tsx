import * as React from "react";
import { StyleSheet } from "react-native";

import Colors, { CurrentTheme } from "../../constants/Colors";

import { Icons } from "../icons";

import { Props as ButtonProps } from "./Button";
import { IconButton } from "./ButtonIcon";

export const AddSmall: React.FC<ButtonProps> = (props) => {
  return (
    <IconButton
      text="Add"
      extraStyles={styles.small}
      renderIcon={() => <Icons.Add />}
      {...props}
    />
  );
};

export const Add: React.FC<ButtonProps> = (props) => {
  return (
    <IconButton
      // text="Add"
      extraStyles={styles.normal}
      renderIcon={() => <Icons.Add size={36} />}
      {...props}
    />
  );
};

const styles = StyleSheet.create({
  normal: {
    padding: 10,
  },
  small: {
    width: 120,
    padding: 10,
  },
});
