import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";

import Colors from "../constants/Colors";

import { Text, View } from "./Themed";

export const Button: React.FC<{
  id?: string;
  title?: string;
  extraStyles?: StyleProp<ViewStyle>;
  handleClick: (id?: string) => void;
}> = ({ id, title, children, handleClick, extraStyles }) => {
  const pressed = () => {
    handleClick(id);
  };
  return (
    <TouchableOpacity onPress={pressed}>
      <View style={[styles.button, extraStyles]}>
        <Text
          style={styles.buttonText}
          lightColor={false ? Colors.light.tint : Colors.dark.tint}
        >
          {title}
          {children}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 300,
    padding: "30px",
    margin: "10px",
  },
  buttonText: {
    textAlign: "center",
    // alignItems: "center",
  },
});
