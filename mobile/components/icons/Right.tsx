import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors, { CurrentTheme } from "../../constants/Colors";

export const Right = () => (
  <Ionicons
    name="chevron-forward"
    size={36}
    color={Colors[CurrentTheme].icons}
  />
);
