import * as React from "react";
import daysjs from "dayjs";
import { StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { View, Text } from "../components/Themed";
import { Button } from "../components";
import RefreshView from "../components/RefreshView";
import { useLocalData } from "../hooks/useLocalData";
import { LogsParamList } from "../navigation/types";

type Props = StackScreenProps<LogsParamList, "LogsScreen">;
export const LogsScreen: React.FC<Props> = ({ navigation }) => {
  const refreshAction = () => {
    return Promise.resolve();
  };

  const [data] = useLocalData();

  React.useEffect(() => {
    const notSyncedItems = data.filter((item) => item.is_synced === false);

    if (notSyncedItems.length > 0) {
    }
  }, [data]);

  return (
    <RefreshView refreshAction={refreshAction}>
      <View style={styles.container}>
        <View style={styles.title}>
          {data.length === 0 && <Text>No results to show</Text>}
        </View>
        <View style={styles.list}>
          {data.map((item, index) => {
            return (
              <Text key={`log-${index}`}>
                User: {item.user} {daysjs("created_at").format("lll")}
              </Text>
            );
          })}
        </View>
        <Button
          title="Go to Settings"
          handleClick={() => navigation.navigate("SettingsScreen")}
        />
      </View>
    </RefreshView>
  );
};

const styles = StyleSheet.create({
  title: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  container: {
    width: "100%",
  },
  list: {
    flex: 1,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  separator: {
    marginBottom: 20,
    marginTop: 10,
    height: 1,
    width: "80%",
  },
});
