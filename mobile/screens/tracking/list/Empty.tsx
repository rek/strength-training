import * as React from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "../../../components/Themed";

export const EmptyScreen: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>No activities created yet.</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
