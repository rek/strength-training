import { StyleSheet } from "react-native";

import Colors, { currentThemeMode, SIZES } from "../constants/Colors";

export const styles = StyleSheet.create({
  picker: {
    color: "white",
    backgroundColor: Colors[currentThemeMode].colors.background,
    borderRadius: 4,
    padding: 20,
  },
  pickerTitle: {
    fontSize: SIZES.small,
  },
  pickerItem: {
    fontSize: SIZES.large,
    color: Colors[currentThemeMode].hasInternet,
  },
});
