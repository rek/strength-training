import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors, { CurrentTheme } from "../../constants/Colors";

export const Wifi: React.FC<{ size?: number }> = ({ size }) => (
  <Ionicons name="wifi" size={size || 64} color={Colors[CurrentTheme].icons} />
);
