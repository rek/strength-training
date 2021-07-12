import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  StyleProp,
} from "react-native";

import Colors, { CurrentTheme } from "../constants/Colors";

import { Text, View } from "./Themed";

export interface Props {
  id?: string;
  title?: string;
  extraStyles?: StyleProp<ViewStyle>;
  handleClick: (id?: string) => void;
}
export const Button: React.FC<Props> = ({
  id,
  title,
  children,
  handleClick,
  extraStyles,
}) => {
  const pressed = () => {
    handleClick(id);
  };

  return (
    <TouchableOpacity onPress={pressed}>
      <View style={[styles.buttonView, extraStyles]}>
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

export const ButtonNormal: React.FC<Props> = (props) => {
  return <Button {...props} extraStyles={styles.normal} />;
};

export const ButtonSmall: React.FC<Props> = (props) => {
  return <Button {...props} />;
};

const styles = StyleSheet.create({
  normal: {
    width: 300,
    padding: "30px",
    borderWidth: 1,
    borderColor: Colors[CurrentTheme].border,
    borderRadius: 48,
  },
  buttonView: {
    margin: "10px",
  },
  buttonText: {
    textAlign: "center",
    // alignItems: "center",
  },
});
