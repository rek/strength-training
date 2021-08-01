import { StyleSheet } from "react-native";

import Colors, { currentThemeMode } from "../constants/Colors";

export const typography = StyleSheet.create({
  family: {
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
  },
  normal: {
    fontSize: 10,
  },
  large: {
    fontSize: 24,
  },
  xlarge: {
    fontSize: 64,
  },
});
