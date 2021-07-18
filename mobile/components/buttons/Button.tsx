import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
  StyleProp,
} from "react-native";

import Colors, { CurrentTheme } from "../../constants/Colors";

import { Text, View } from "../Themed";

export interface Props {
  id?: string;
  title?: string;
  extraStyles?: StyleProp<ViewStyle>;
  extraTextStyles?: StyleProp<TextStyle>;
  handleClick: (id?: string) => void;
  handleLongPress?: (id: string) => void;
}
export const Button: React.FC<Props> = ({
  id,
  title,
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
    <TouchableOpacity onPress={pressed} onLongPress={longPress}>
      <View style={[styles.buttonView, extraStyles]}>
        <Text
          style={[styles.buttonText, extraTextStyles]}
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
  return (
    <Button
      {...props}
      extraStyles={styles.normal}
      extraTextStyles={styles.normalText}
    />
  );
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
    margin: "10px",
  },
  normalText: {
    textAlign: "center",
  },
  buttonView: {},
  buttonText: {},
});
