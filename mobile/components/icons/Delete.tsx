import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors, { CurrentTheme } from "../../constants/Colors";

export const Delete = () => (
  <Ionicons name="close-circle" size={24} color={Colors[CurrentTheme].icons} />
);
