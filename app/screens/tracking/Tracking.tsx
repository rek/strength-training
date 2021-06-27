import React from "react";
import axios from "axios";
import { StyleSheet } from "react-native";
import { useMachine } from "@xstate/react";

import { Text, View } from "../../components/Themed";
import { Button } from "../../components/Button";
import Colors from "../../constants/Colors";
import { useUserState } from "../../hooks/useUsers";
import { useLocalData } from "../../hooks/useLocalData";

import { trainingMachine } from "./state";

export default function TrackingScreen() {
  const [data, setData] = React.useState<number[]>([]);
  const [user] = useUserState();
  const [currentState, send] = useMachine(trainingMachine);
  const [localData, setLocalData] = useLocalData();

  const handleClick = () => {
    axios
      .get("http://192.168.1.1:80/start")
      .then((response) => {
        console.log("Start response", response);
      })
      .catch((response) => {
        console.log("Error response", response);
      });
    send("NEXT");
  };

  const handleClickStop = () => {
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
            setData(result.data);
          }
        } catch (e) {
          console.log("e", e);
        }
      })
      .catch((response) => {
        console.log("Error response", response);
      });

    setLocalData([...localData, { data: [1] }]);

    send("NEXT");
  };

  const handleClickReset = () => {
    send("NEXT");
  };

  const handleClickResult = () => {
    axios
      .get("http://192.168.1.1:80/get")
      .then((response) => {
        console.log("Get response", response);
      })
      .catch((response) => {
        console.log("Error response", response);
      });
  };

  console.log("data", data);

  return (
    <View style={styles.container}>
      <Text>User: {user || "NONE SET"}</Text>
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
          <View>
            {data.length > 0 && (
              <Text>
                {data.map((item, index) => {
                  return <p key={`result-${index}`}>{item}</p>;
                })}
              </Text>
            )}
          </View>
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
