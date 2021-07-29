import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import Colors, { CurrentTheme } from "../../constants/Colors";

export const Save = () => (
  <Ionicons name="save" size={36} color={Colors[CurrentTheme].icons} />
);
