import React from "react";
import axios from "axios";
import { StyleSheet } from "react-native";
import { useMachine } from "@xstate/react";

import { Text, View } from "../../../components/Themed";
import { Button } from "../../../components/Button";
import Colors, { CurrentTheme } from "../../../constants/Colors";
import { useLocalData } from "../../../hooks/useLocalData";
import {
  NetworkState,
  useNetworkStatus,
} from "../../../hooks/useNetworkStatus";

import { trainingMachine } from "./startState";
import { useCurrentUserState } from "../../../hooks/useUsers";

interface Props {
  id: string;
}
export const StartActivityScreen: React.FC<Props> = ({ id }) => {
  const [userId] = useCurrentUserState();
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const [networkStatus] = useNetworkStatus();
  const [currentState, send] = useMachine(trainingMachine);
  const [localData, setLocalData] = useLocalData();

  // get from state
  const selectedExercise = 1;
  const selectedWeight = 2;

  const handleClick = () => {
    if (!userId) {
      setErrorMessage("Error, user not set");
      return;
    }
    // if (networkStatus !== NetworkState.hasDevice) {
    //   setErrorMessage("Error, device not connected.");
    //   return;
    // }

    axios
      .get("http://192.168.1.1:80/start")
      .then((response) => {
        console.log("Start response", response);
      })
      .catch((response) => {
        console.log("Error response from start", response);
      });

    send("NEXT");
    setErrorMessage("");
  };

  const handleClickStop = () => {
    if (!userId) {
      setErrorMessage("Error, user not set");
      send("ERROR");
      return;
    }
    axios
      .get("http://192.168.1.1:80/stop")
      .then((response) => {
        console.log("Stop response", response);
        try {
          // have some trouble making this nice in the hardware
          // so easier to fix the hack here:
          const cleanData = response.data.replace(",]}", "]}");
          const result = JSON.parse(cleanData);
          if (result) {
            console.log("data", result);
            setLocalData([
              ...localData,
              {
                user: userId,
                data: result.data,
                movement: selectedExercise,
                weight: selectedWeight,
                created_at: +new Date(),
              },
            ]);

            setErrorMessage("");
            send("NEXT");
          } else {
            setErrorMessage("Error: No result");
            send("ERROR");
          }
        } catch (e) {
          setErrorMessage(`Error: ${e}`);
          send("ERROR");
        }
      })
      .catch((response) => {
        setErrorMessage(`Error response: ${response}`);
        send("ERROR");
      });
  };

  const handleClickReset = () => {
    send("NEXT");
  };

  // const handleClickResult = () => {
  //   axios
  //     .get("http://192.168.1.1:80/get")
  //     .then((response) => {
  //       console.log("Get response", response);
  //     })
  //     .catch((response) => {
  //       console.log("Error response", response);
  //     });
  // };

  return (
    <View style={styles.container}>
      <View style={styles.errorBox}>
        <Text style={styles.errorBanner}>{errorMessage}</Text>
      </View>
      <View style={styles.mainBox}>
        {currentState.matches("inactive") && (
          <Button handleClick={handleClick}>Start</Button>
        )}
        {currentState.matches("running") && (
          <Button handleClick={handleClickStop}>Stop</Button>
        )}
        {/* <Button handleClick={handleClickResult}>Last result</Button> */}
        {currentState.matches("hasRun") && (
          <>
            <Button handleClick={handleClickReset}>Reset</Button>
            <Text>Log recorded and added!</Text>
            {/* <View>
            {data.length > 0 && (
              <Text>
              {data.map((item, index) => {
                return <p key={`result-${index}`}>{item}</p>;
              })}
              </Text>
              )}
            </View> */}
          </>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  errorBanner: {
    color: Colors[CurrentTheme].error,
  },
  errorBox: {
    backgroundColor: Colors[CurrentTheme].background,
    marginBottom: 100,
    border: 2,
    padding: 20,
    borderColor: "#fe5523",
  },
  mainBox: {
    width: "80%",
    backgroundColor: Colors[CurrentTheme].background,
    marginBottom: 10,
  },
  container: {
    flex: 1,
    backgroundColor: Colors[CurrentTheme].background,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
