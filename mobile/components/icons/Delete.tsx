import * as React from "react";
import { Ionicons } from "@expo/vector-icons";

import { useTheme } from "../../hooks";
import { IconProps } from "./types";

export const Delete: React.FC<IconProps> = ({ size } = { size: 24 }) => {
  const theme = useTheme();

  return <Ionicons name="close-circle" size={size} color={theme.icons} />;
};
