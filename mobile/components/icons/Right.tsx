import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../hooks";

export const Right = () => {
  const theme = useTheme();

  return <Ionicons name="chevron-forward" size={36} color={theme.icons} />;
};
