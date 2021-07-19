import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors, { CurrentTheme } from "../../constants/Colors";
import { IconProps } from "./types";

export const Delete: React.FC<IconProps> = ({ size } = { size: 24 }) => (
  <Ionicons
    name="close-circle"
    size={size}
    color={Colors[CurrentTheme].icons}
  />
);
