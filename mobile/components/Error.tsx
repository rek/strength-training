import React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "./Themed";

interface Props {
  error: string;
}
export const ErrorDisplay: React.FC<Props> = ({ error }) => {
  return (
    <View style={styles.container}>
      <Text>{error}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 300,
    padding: "30px",
  },
});
