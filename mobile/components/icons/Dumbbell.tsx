import * as React from "react";
import { StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../hooks";

export const Dumbbell: React.FC<{ size?: number }> = ({ size }) => {
  const theme = useTheme();

  return (
    <Ionicons
      name="barbell"
      size={size || 24}
      color={theme.icons}
      style={styles.icon}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 5,
    marginRight: 5,
  },
});
