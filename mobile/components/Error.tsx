import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "./Themed";

interface Props {
  error: string;
  fullScreen?: boolean;
}
export const ErrorDisplay: React.FC<Props> = ({
  error,
  fullScreen,
  children,
}) => {
  return (
    <View style={fullScreen ? styles.container : styles.box}>
      <Text>{error}</Text>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: "100%",
    padding: "30px",
  },
  box: {
    width: "100%",
    padding: "30px",
  },
});
