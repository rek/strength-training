import * as React from "react";
import { StyleSheet } from "react-native";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

import { Text, View } from "../components/Themed";
import Colors from "../constants/Colors";
import { useLocalData } from "../hooks/useLocalData";

type State = "hasInternet" | "hasDevice" | "hasNothing";
enum UnsavedState {
  "hasUnsaved" = "hasUnsaved",
  "hasNothing" = "hasNothing",
}

export const RightHeaderStatus: React.FC<{
  tintColor?: string;
}> = () => {
  const [status, setStatus] = React.useState<State>("hasNothing");
  const [unsavedStatus, setUnsavedStatus] = React.useState<UnsavedState>(
    UnsavedState.hasNothing
  );
  const [localData] = useLocalData();

  const processState = (state: NetInfoState) => {
    if (state.isConnected) {
      console.log("Connection state", state);
      if ("ipAddress" in state.details) {
        if (state.details.ipAddress === "192.168.1.1") {
          setStatus("hasDevice");
        } else {
          setStatus("hasInternet");
        }
      } else {
        setStatus("hasInternet");
      }
    } else {
      setStatus("hasNothing");
    }
  };

  React.useEffect(() => {
    console.log("localData", localData);
    if (localData.length > 0) {
      setUnsavedStatus(UnsavedState.hasUnsaved);
    } else {
      setUnsavedStatus(UnsavedState.hasNothing);
    }
  }, [localData]);

  React.useEffect(() => {
    NetInfo.fetch().then(processState);
    const unsubscribe = NetInfo.addEventListener(processState);
    return () => unsubscribe();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.dataContainer}>
        <Text style={styles[unsavedStatus]} />
      </View>
      <Text style={styles[status]} />
    </View>
  );
};

const size = 12;
const styles = StyleSheet.create({
  dataContainer: {
    marginRight: 8,
  },
  container: {
    marginRight: 16,
    flexDirection: "row",
  },
  [UnsavedState.hasUnsaved]: {
    backgroundColor: Colors.light.hasUnsaved,
    width: size,
    height: size,
    borderRadius: size / 2,
  },
  hasInternet: {
    backgroundColor: Colors.light.hasNet,
    width: size,
    height: size,
    borderRadius: size / 2,
  },
  hasDevice: {
    backgroundColor: Colors.light.hasDevice,
    width: size,
    height: size,
    borderRadius: size / 2,
  },
  [UnsavedState.hasNothing]: {
    backgroundColor: Colors.light.text,
    width: size,
    height: size,
    borderRadius: size / 2,
  },
});
