import { StyleSheet, ViewStyle } from "react-native";

import { borders } from "./borders";

const textContainer: ViewStyle = {
  flexGrow: 1,
};
const row: ViewStyle = {
  flexDirection: "row",
  marginBottom: 10,
  paddingTop: 1,
  paddingBottom: 1,
};
const container = StyleSheet.flatten([row, borders.normal]);

export const CardStyles = {
  textContainer,
  row,
  container,
};
