import React from "react";
import { StyleSheet } from "react-native";

import { View } from "../Themed";

interface Props {}
export const Center: React.FC<Props> = ({ children }) => {
  return <View style={styles.container}>{children}</View>;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});
