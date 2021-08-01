import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../hooks";

export const Wifi: React.FC<{ size?: number }> = ({ size }) => {
  const theme = useTheme();

  return <Ionicons name="wifi" size={size || 64} color={theme.icons} />;
};
