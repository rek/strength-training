import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";

import Colors, { currentThemeMode } from "../../constants/Colors";

import { Text, View } from "../Themed";

export interface Props {
  id?: string;
  text?: string;
  extraStyles?: StyleProp<ViewStyle>;
  extraTextStyles?: StyleProp<TextStyle>;
  handleClick: (id?: string) => void;
  handleLongPress?: (id: string) => void;
}
export const Button: React.FC<Props> = ({
  id,
  text,
  children,
  handleClick,
  handleLongPress,
  extraStyles,
  extraTextStyles,
}) => {
  const pressed = () => {
    handleClick(id);
  };

  const longPress = () => {
    handleLongPress && id && handleLongPress(id);
  };

  return (
    <TouchableOpacity
      onPress={pressed}
      onLongPress={longPress}
      style={[styles.buttonView, extraStyles]}
    >
      {text && (
        <Text
          style={[styles.buttonText, extraTextStyles]}
          // lightColor={false ? Colors.light.tint : Colors.dark.tint}
        >
          {text}
        </Text>
      )}
      {children}
    </TouchableOpacity>
  );
};

export const ButtonNormal: React.FC<Props> = (props) => {
  return (
    <Button
      {...props}
      extraStyles={styles.normal}
      extraTextStyles={styles.normalText}
    />
  );
};

export const ButtonSmall: React.FC<Props> = (props) => {
  return (
    <Button
      {...props}
      extraStyles={styles.small}
      extraTextStyles={styles.smallText}
    />
  );
};

const styles = StyleSheet.create({
  small: {
    width: 120,
    padding: 10,
  },
  normal: {
    width: 300,
    padding: 30,
    borderWidth: 1,
    borderColor: Colors[currentThemeMode].colors.border,
    borderRadius: 48,
    margin: 10,
  },
  normalText: {
    textAlign: "center",
  },
  smallText: {},
  buttonView: {},
  buttonText: {},
});
