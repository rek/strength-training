import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../hooks";

export const Edit: React.FC<{ size?: number }> = ({ size }) => {
  const theme = useTheme();

  return <Ionicons name="build" size={size || 24} color={theme.icons} />;
};
