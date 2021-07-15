import { StyleSheet } from "react-native";

import Colors, { CurrentTheme } from "../constants/Colors";

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
});
