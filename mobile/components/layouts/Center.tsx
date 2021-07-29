import React from "react";
import { StyleSheet, ViewStyle } from "react-native";

import { View } from "../Themed";

interface Props {}
export const Center: React.FC<Props> = ({ children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.left} />
      <View style={styles.center}>{children}</View>
      <View style={styles.right} />
    </View>
  );
};

const container: ViewStyle = {
  flex: 1,
  flexDirection: "row",
};

const styles = StyleSheet.create({
  container,
  left: {
    flexGrow: 1,
  } as ViewStyle,
  center: {
    flexGrow: 2,
  } as ViewStyle,
  right: {
    flexGrow: 1,
  } as ViewStyle,
});
