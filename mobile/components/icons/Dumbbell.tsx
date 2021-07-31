import * as React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import Colors, { CurrentTheme } from "../../constants/Colors";

export const Dumbbell: React.FC<{ size?: number }> = ({ size }) => (
  <Ionicons
    name="barbell"
    size={size || 24}
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
