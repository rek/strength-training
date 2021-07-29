import { StyleSheet } from "react-native";

import Colors, { CurrentTheme } from "../constants/Colors";

export const borders = StyleSheet.create({
  normal: {
    borderWidth: 1,
    borderRadius: 4,
    borderColor: Colors[CurrentTheme].border,

    padding: 10,
  },
  round: {
    borderWidth: 1,
    borderRadius: 70,
    borderColor: Colors[CurrentTheme].border,

    padding: 10,
  },
});
