import * as React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors, { CurrentTheme } from "../../constants/Colors";

export const Dumbbell = () => (
  <Ionicons
    name="barbell"
    size={24}
    color={Colors[CurrentTheme].icons}
    style={styles.icon}
  />
);

const styles = StyleSheet.create({
  icon: {
    marginLeft: 5,
    marginRight: 5,
  },
});
