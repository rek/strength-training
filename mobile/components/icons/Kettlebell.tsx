import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import Colors, { CurrentTheme } from "../../constants/Colors";

export const Kettlebell = () => {
  return (
    <MaterialCommunityIcons
      name="kettlebell"
      size={24}
      color={Colors[CurrentTheme].icons}
    />
  );
};
