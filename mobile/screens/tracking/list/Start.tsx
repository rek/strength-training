import React from "react";
import { StyleSheet } from "react-native";
import { useMachine } from "@xstate/react";
import { StackScreenProps } from "@react-navigation/stack";
import { useKeepAwake } from "expo-keep-awake";

import { ErrorDisplay } from "../../../components/Error";
import { ButtonNormal, Text, View } from "../../../components";
import Colors, { CurrentTheme } from "../../../constants/Colors";
import { useLocalData } from "../../../hooks/useLocalData";
import {
  NetworkState,
  useNetworkStatus,
} from "../../../hooks/useNetworkStatus";
import { useActivityHydrated } from "../../../hooks/useActivitiesHydrated";
import { typography } from "../../../styles/typography";
import { useFirebase } from "../../../database/useFirebase";
import { TrackingParamList } from "../../../navigation/types";
import { checkIfCalibrated, start, status, stop } from "../../../models/device";

import { trainingMachine } from "./startState";
import { ChartData, LineChart } from "../../../components/LineChartChartKit";
import { Stopwatch } from "../../../components/Stopwatch";

type Props = StackScreenProps<TrackingParamList, "StartActivityScreen">;
export const StartActivityScreen: React.FC<Props> = ({ route }) => {
  const { data: idToken } = useFirebase();
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const [foundDevice, setFoundDevice] = React.useState(false);
  const [networkStatus] = useNetworkStatus();
  const [currentState, send] = useMachine(trainingMachine);
  const [localData, setLocalData] = useLocalData();
  useKeepAwake();

  React.useEffect(() => {
    if (currentState.matches("unCalibrated")) {
      const timer = setInterval(() => {
        checkIfCalibrated().then((result) => {
          if (result) {
            send("NEXT");
            clearInterval(timer);
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [networkStatus, currentState]);

  React.useEffect(() => {
    if (networkStatus === NetworkState.hasNothing) {
      send("ERROR");
    }

    if (currentState.matches("noDevice")) {
      status()
        .then(() => {
          console.log("currentState", currentState);
          setFoundDevice(true);
          if (currentState.matches("noDevice")) {
            send("NEXT");
          }
        })
        .catch(() => {
          send("ERROR");
          setFoundDevice(false);
        });
    }
  }, [networkStatus, currentState]);

  // const { data } = useActivity({ idToken, id: route.params.id });
  const data = useActivityHydrated({
    idToken: idToken || "",
    id: route.params.id,
  });

  if (data.length !== 1) {
    return <ErrorDisplay error="Error fetching data" />;
  }

  const currentActivity = data[0];
  console.log("currentActivity", currentActivity);
  console.log("localData", localData);
  console.log("networkStatus", networkStatus);

  const title = currentActivity.movementName.toLocaleUpperCase();

  // get from state
  const selectedExercise = currentActivity.movement;
  const selectedWeight = currentActivity.weight;

  const chartData: ChartData = [
    { x: 1, y: 1 },
    { x: 2, y: 2 },
    { x: 3, y: 3 },
  ];

  const handleClick = () => {
    // if (networkStatus !== NetworkState.hasDevice) {
    //   setErrorMessage("Error, device not connected.");
    //   return;
    // }
    start();
    send("NEXT");
    setErrorMessage("");
  };

  const handleClickStop = async () => {
    const result = await stop();
    if (result.error) {
      setErrorMessage(result.errorMessage);
      send("ERROR");
    } else {
      setLocalData([
        ...localData,
        {
          user: currentActivity.user,
          data: result.data,
          movement: selectedExercise,
          weight: selectedWeight,
          created_at: +new Date(),
        },
      ]);
      send("NEXT");
      setErrorMessage("");
    }
  };

  const handleClickReset = () => {
    send("NEXT");
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <View style={styles.errorBox}>
          <Text style={styles.errorBanner}>{errorMessage}</Text>
        </View>
        <Text style={titleStyle}>{title}</Text>
      </View>
      <View style={styles.mainContainer}>
        {chartData ? (
          <LineChart data={chartData} dotSize={2} disableXAxis />
        ) : (
          <Text>Results will appear here when available</Text>
        )}
      </View>
      <View style={styles.footerContainer}>
        {currentState.matches("noDevice") && <Text>No device found.</Text>}
        {currentState.matches("unCalibrated") && (
          <Text>Waiting for calibration.</Text>
        )}
        {currentState.matches("ready") && (
          <ButtonNormal handleClick={handleClick}>Start</ButtonNormal>
        )}
        {currentState.matches("running") && (
          <ButtonNormal handleClick={handleClickStop}>Stop</ButtonNormal>
        )}
        {currentState.matches("hasRun") && (
          <>
            <ButtonNormal handleClick={handleClickReset}>Reset</ButtonNormal>
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
  title: {
    borderBottomWidth: 1,
  },
  errorBox: {
    backgroundColor: Colors[CurrentTheme].background,
    border: 2,
    padding: 20,
    borderColor: "#fe5523",
  },
  titleContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 4,
    width: "100%",
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
const titleStyle = StyleSheet.flatten([typography.large, styles.title]);
