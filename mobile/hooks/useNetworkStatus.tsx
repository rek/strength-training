import * as React from "react";
import NetInfo, { NetInfoState } from "@react-native-community/netinfo";

export enum NetworkState {
  "hasInternet" = "hasInternet",
  "hasDevice" = "hasDevice",
  "hasNothing" = "hasNothing",
}

export const useNetworkStatus = () => {
  const [status, setStatus] = React.useState<NetworkState>(
    NetworkState.hasNothing
  );

  const processState = (state: NetInfoState) => {
    if (state.isConnected) {
      console.log("Connection state", state);
      if ("ipAddress" in state.details) {
        if (state.details.ipAddress === "192.168.1.1") {
          setStatus(NetworkState.hasDevice);
        } else {
          setStatus(NetworkState.hasInternet);
        }
      } else {
        setStatus(NetworkState.hasInternet);
      }
    } else {
      setStatus(NetworkState.hasNothing);
    }
  };

  React.useEffect(() => {
    NetInfo.fetch().then(processState);
    const unsubscribe = NetInfo.addEventListener(processState);
    return () => unsubscribe();
  }, []);

  return [status];
};
