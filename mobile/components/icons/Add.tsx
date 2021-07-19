import React from "react";

import { Ionicons } from "@expo/vector-icons";
import Colors, { CurrentTheme } from "../../constants/Colors";
import { IconProps } from "./types";

export const Add: React.FC<IconProps> = ({ size } = { size: 24 }) => (
  <Ionicons
    name="add-circle-outline"
    size={size}
    color={Colors[CurrentTheme].icons}
  />
);
