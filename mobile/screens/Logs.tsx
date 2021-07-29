import * as React from "react";
import daysjs from "dayjs";
import { StyleSheet } from "react-native";
import { HeaderTitle, StackScreenProps } from "@react-navigation/stack";

import { RefreshView, Buttons, View, Text, Layouts } from "../components";
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
    // <RefreshView refreshAction={refreshAction}>
    <Layouts.Center>
      <View style={styles.container}>
        {data.length === 0 && <HeaderTitle>No results to show</HeaderTitle>}
        <View style={styles.list}>
          {data.map((item, index) => {
            return (
              <Text key={`log-${index}`}>
                User: {item.user} {daysjs("created_at").format("lll")}
              </Text>
            );
          })}
        </View>
        <Buttons.ButtonNormal
          text="Go to Settings"
          handleClick={() => navigation.navigate("SettingsScreen")}
        />
      </View>
    </Layouts.Center>
    // </RefreshView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "flex-start",
    justifyContent: "flex-start",
  },
  list: {
    // flex: 1,
  },
  separator: {
    // marginBottom: 20,
    // marginTop: 10,
    // height: 1,
    // width: "80%",
  },
});
