import * as React from "react";
import { StyleSheet, ScrollView, RefreshControl } from "react-native";
import { View } from "../components/Themed";

export const RefreshView: React.FC<{
  refreshAction: () => Promise<any>;
}> = ({ children, refreshAction }) => {
  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(async () => {
    setRefreshing(true);
    await refreshAction();
    setRefreshing(false);
  }, []);

  return (
    <ScrollView
      contentContainerStyle={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      <>
        <View style={styles.container}>{children}</View>
      </>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 7,
  },
});

export default RefreshView;
