import * as React from "react";
import { StyleSheet, TextStyle, ViewStyle } from "react-native";

import { Text, View } from "../components/Themed";
import Colors, { CurrentTheme } from "../constants/Colors";
import { useLocalData } from "../hooks/useLocalData";
import { NetworkState, useNetworkStatus } from "../hooks/useNetworkStatus";

enum UnsavedState {
  "hasUnsaved" = "hasUnsaved",
  "hasNothing" = "hasNothing",
}

export const RightHeaderStatus: React.FC<{
  tintColor?: string;
}> = () => {
  const [unsavedStatus, setUnsavedStatus] = React.useState<UnsavedState>(
    UnsavedState.hasNothing
  );
  const [localData] = useLocalData();
  const [networkStatus] = useNetworkStatus();

  React.useEffect(() => {
    console.log("localData", localData);
    if (localData.length > 0) {
      setUnsavedStatus(UnsavedState.hasUnsaved);
    } else {
      setUnsavedStatus(UnsavedState.hasNothing);
    }
  }, [localData]);

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Text style={styles[unsavedStatus]} />
      </View>
      <Text style={styles[networkStatus]} />
    </View>
  );
};

console.log(
  "Colors[CurrentTheme].header--",
  CurrentTheme,
  Colors[CurrentTheme].header
);

const size = 12;
const styles = StyleSheet.create({
  dataContainer: {
    marginRight: 8,
  } as ViewStyle,
  container: {
    marginRight: 16,
    flexDirection: "row",
    backgroundColor: Colors[CurrentTheme].header,
  } as ViewStyle,
  [UnsavedState.hasUnsaved]: {
    backgroundColor: Colors[CurrentTheme].hasUnsaved,
    width: size,
    height: size,
    borderRadius: size / 2,
  } as TextStyle,
  [NetworkState.hasInternet]: {
    backgroundColor: Colors[CurrentTheme].hasNet,
    width: size,
    height: size,
    borderRadius: size / 2,
  } as TextStyle,
  [NetworkState.hasDevice]: {
    backgroundColor: Colors[CurrentTheme].hasDevice,
    width: size,
    height: size,
    borderRadius: size / 2,
  } as TextStyle,
  [UnsavedState.hasNothing]: {
    backgroundColor: Colors[CurrentTheme].text,
    width: size,
    height: size,
    borderRadius: size / 2,
  } as TextStyle,
});
