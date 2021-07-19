import * as React from "react";
import { StyleSheet } from "react-native";

import { View } from "../Themed";

import { Button, Props as ButtonProps } from "./Button";

interface IconProps extends ButtonProps {
  renderIcon: () => React.ReactElement;
}
export const IconButton: React.FC<IconProps> = ({ renderIcon, ...rest }) => {
  return (
    <Button {...rest} extraStyles={[styles.iconContainer, rest.extraStyles]}>
      <View style={styles.icon}>{renderIcon()}</View>
    </Button>
  );
};

const styles = StyleSheet.create({
  iconContainer: {
    flexDirection: "row-reverse",
  },
  icon: {
    // padding: 2,
  },
});
