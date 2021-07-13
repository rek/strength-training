import * as React from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "./Themed";
import { Icons } from "./icons";
import { Button, Props as ButtonProps } from "./Button";

interface Props extends ButtonProps {
  text?: string;
}
export const AddButton: React.FC<Props> = ({ text, handleClick, ...rest }) => {
  return (
    <Button handleClick={handleClick} {...rest}>
      <View style={styles.container}>
        <View style={styles.icon}>
          <Icons.Add />
        </View>
        <View style={styles.buttonText}>
          <Text>{text}</Text>
        </View>
      </View>
    </Button>
  );
};

export const AddButtonSmall: React.FC<Props> = (props) => {
  return (
    <View style={styles.small}>
      <AddButton {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "inherit",
    alignItems: "center",
    flexFlow: "row wrap",
  },
  icon: {
    backgroundColor: "inherit",
  },
  buttonText: {
    backgroundColor: "inherit",
  },
  small: {
    width: 120,
  },
});
