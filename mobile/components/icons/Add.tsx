import React from "react";
import { Ionicons } from "@expo/vector-icons";

import { IconProps } from "./types";
import { useTheme } from "../../hooks";

export const Add: React.FC<IconProps> = ({ size } = { size: 24 }) => {
  const theme = useTheme();
  return <Ionicons name="add-circle-outline" color={theme.icons} size={size} />;
};
