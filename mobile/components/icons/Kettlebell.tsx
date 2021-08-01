import * as React from "react";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import { useTheme } from "../../hooks";

export const Kettlebell: React.FC<{ size?: number }> = ({ size }) => {
  const theme = useTheme();

  return (
    <MaterialCommunityIcons
      name="kettlebell"
      size={size || 24}
      color={theme.icons}
    />
  );
};
