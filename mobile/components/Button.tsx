import React from "react";
import { TouchableOpacity, StyleSheet } from "react-native";

import Colors from "../constants/Colors";

import { Text, View } from "./Themed";

export const Button: React.FC<{
  id?: string;
  handleClick: (id?: string) => void;
}> = ({ id, children, handleClick }) => {
  const pressed = () => {
    handleClick(id);
  };
  return (
    <TouchableOpacity onPress={pressed}>
      <View style={styles.button}>
        <Text
          style={styles.buttonText}
          lightColor={false ? Colors.light.tint : Colors.dark.tint}
        >
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
    textAlign: "left",
  },
});
