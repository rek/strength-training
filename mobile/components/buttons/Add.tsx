import * as React from "react";
import { StyleSheet } from "react-native";

import Colors, { CurrentTheme } from "../../constants/Colors";

import { View, Text } from "../Themed";
import { Icons } from "../icons";

import { Button, Props as ButtonProps } from "./Button";

interface Props extends ButtonProps {
  text?: string;
}
export const Add: React.FC<Props> = ({ text, handleClick, ...rest }) => {
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
      <Add {...props} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
  },
  icon: {},
  buttonText: {},
  small: {
    width: 120,
    padding: 10,
  },
});
