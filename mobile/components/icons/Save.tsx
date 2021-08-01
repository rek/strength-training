import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../hooks";

export const Save = () => {
  const theme = useTheme();

  <Ionicons name="save" size={36} color={theme.icons} />;
};
