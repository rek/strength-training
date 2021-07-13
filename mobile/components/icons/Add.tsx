import React from "react";

import { Ionicons } from "@expo/vector-icons";
import Colors, { CurrentTheme } from "../../constants/Colors";

export const Add = () => (
  <Ionicons
    name="add-circle-outline"
    size={24}
    color={Colors[CurrentTheme].icons}
  />
);
