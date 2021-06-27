import * as React from "react";
import { StyleSheet } from "react-native";
import { View } from "../components/Themed";
import RefreshView from "../components/RefreshView";

export default function LogsScreen() {
  const refreshAction = () => {
    return Promise.resolve();
  };

  return (
    <RefreshView refreshAction={refreshAction}>
      <View style={styles.container}>test</View>;
    </RefreshView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 7,
  },
  title: {
    fontSize: 14,
    // fontWeight: "bold",
  },
  separator: {
    marginBottom: 20,
    marginTop: 10,
    height: 1,
    width: "80%",
  },
});
