import { StyleSheet } from "react-native";

import Colors, { currentThemeMode } from "../constants/Colors";

export const borders = StyleSheet.create({
  normal: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors[currentThemeMode].colors.border,

    padding: 10,
  },
  round: {
    borderWidth: 1,
    borderRadius: 70,
    borderColor: Colors[currentThemeMode].colors.border,

    padding: 10,
  },
});
