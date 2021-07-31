import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors, { CurrentTheme } from "../../constants/Colors";

export const Kettlebell: React.FC<{ size?: number }> = ({ size }) => (
  <MaterialCommunityIcons
    name="kettlebell"
    size={size || 24}
    color={Colors[CurrentTheme].icons}
  />
);
