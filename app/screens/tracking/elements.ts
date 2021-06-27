import { StyleSheet } from "react-native";

import Colors from "../../constants/Colors";

export const styles = StyleSheet.create({
  picker: {
    color: "white",
    backgroundColor: Colors.light.background,
    padding: 20,
  },
  pickerTitle: {
    fontSize: 14,
  },
  pickerItem: {
    fontSize: 22,
    color: Colors.light.hasNet,
  },
});
