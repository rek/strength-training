import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors, { CurrentTheme } from "../../constants/Colors";

export const Tick: React.FC<{ size?: number }> = ({ size }) => (
  <Ionicons
    name="checkmark"
    size={size || 64}
    color={Colors[CurrentTheme].icons}
  />
);
