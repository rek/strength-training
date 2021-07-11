import { StyleSheet } from "react-native";

import Colors, { CurrentTheme, SIZES } from "../constants/Colors";

export const styles = StyleSheet.create({
  picker: {
    color: "white",
    backgroundColor: Colors[CurrentTheme].background,
    borderRadius: 4,
    padding: 20,
  },
  pickerTitle: {
    fontSize: SIZES.small,
  },
  pickerItem: {
    fontSize: SIZES.large,
    color: Colors[CurrentTheme].hasNet,
  },
});
