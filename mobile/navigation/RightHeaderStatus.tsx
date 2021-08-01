import * as React from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { Text, View } from "../components/Themed";
import { useTheme } from "../hooks";
import { LocalDataStatus, useLocalData } from "../hooks/useLocalData";
import { useNetworkStatus } from "../hooks/useNetworkStatus";

export const RightHeaderStatus: React.FC<{
  tintColor?: string;
}> = () => {
  const [unsavedStatus, setUnsavedStatus] = React.useState<LocalDataStatus>(
    LocalDataStatus.hasNothing
  );
  const [localData] = useLocalData();
  const [networkStatus] = useNetworkStatus();
  const theme = useTheme();

  React.useEffect(() => {
    if (localData.length > 0) {
      setUnsavedStatus(LocalDataStatus.hasUnsaved);
    } else {
      setUnsavedStatus(LocalDataStatus.hasNothing);
    }
  }, [localData]);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: theme.colors.card,
        },
      ]}
    >
      <View
        style={[styles.dataContainer, { backgroundColor: theme.colors.card }]}
      >
        <Text
          style={[
            styles.indicator,
            {
              backgroundColor: theme[unsavedStatus],
            },
          ]}
        />
      </View>
      <Text
        style={[
          styles.indicator,
          {
            backgroundColor: theme[networkStatus],
          },
        ]}
      />
    </View>
  );
};

const size = 12;
const styles = StyleSheet.create({
  dataContainer: {
    marginRight: 8,
  } as ViewStyle,
  container: {
    marginRight: 16,
    flexDirection: "row",
  } as ViewStyle,
  indicator: {
    width: size,
    height: size,
    borderRadius: size / 2,
  } as TextStyle,
});
