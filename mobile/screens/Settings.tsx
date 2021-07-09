import * as React from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "../components/Themed";
import { ProvideIDToken, WithToken } from "../database/ProvideIDToken";
import { useCurrentUser } from "../database/useCurrentUser";

export const Settings: React.FC = () => {
  return (
    <ProvideIDToken>
      <SettingsRaw />
    </ProvideIDToken>
  );
};

interface Props extends WithToken {}
export const SettingsRaw: React.FC<Props> = ({ token }) => {
  const { data: user } = useCurrentUser();
  return (
    <View style={styles.container}>
      <Text>This page is for testing internet</Text>
      {user?.email ? (
        <Text>Current user: {user?.email}</Text>
      ) : (
        <Text>No internet</Text>
      )}
    </View>
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
