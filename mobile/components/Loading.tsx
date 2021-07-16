import React from "react";
import { ActivityIndicator } from "react-native";
import { Layouts } from "./layouts";

export const Loading: React.FC = () => {
  return (
    <Layouts.Center>
      <ActivityIndicator size="large" />
    </Layouts.Center>
  );
};
