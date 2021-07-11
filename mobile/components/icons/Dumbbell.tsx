import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors, { CurrentTheme } from "../../constants/Colors";

export const Dumbbell = () => (
  <Ionicons name="barbell" size={24} color={Colors[CurrentTheme].icons} />
);
