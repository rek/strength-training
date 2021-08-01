import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../hooks";

export const Tick: React.FC<{ size?: number }> = ({ size }) => {
  const theme = useTheme();

  return <Ionicons name="checkmark" size={size || 64} color={theme.icons} />;
};
