import * as React from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "../components/Themed";
import RefreshView from "../components/RefreshView";
import { useLocalData } from "../hooks/useLocalData";

export default function LogsScreen() {
  const refreshAction = () => {
    return Promise.resolve();
  };

  const [data] = useLocalData();

  return (
    <RefreshView refreshAction={refreshAction}>
      <View style={styles.container}>
        {data.length === 0 && <Text>No results to show</Text>}
        {data.map((item, index) => {
          return <Text key={`log-${index}`}>User: {item.user}</Text>;
        })}
      </View>
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
