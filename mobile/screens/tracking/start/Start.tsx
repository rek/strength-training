import React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import { useMachine } from "@xstate/react";
import { StackScreenProps } from "@react-navigation/stack";
import { useKeepAwake } from "expo-keep-awake";
import last from "lodash/last";

import {
  ErrorDisplay,
  Buttons,
  Layouts,
  Text,
  View,
  ChartData,
  Loading,
} from "../../../components";
import Colors, { CurrentTheme } from "../../../constants/Colors";
import { useLocalData } from "../../../hooks/useLocalData";
import {
  NetworkState,
  useNetworkStatus,
} from "../../../hooks/useNetworkStatus";
import { typography } from "../../../styles/typography";
import { useFirebase } from "../../../database/useFirebase";
import { TrackingParamList } from "../../../navigation/types";
import { checkIfCalibrated, start, status, stop } from "../../../models/device";

import { trainingMachine } from "./startState";
import { Stopwatch } from "../../../components/Stopwatch";
import { StartAction } from "./StartAction";
import {
  useActivityHydrated,
  useDeleteActivity,
} from "../../../models/activities/queries";
import { showToast } from "../../../components/Toast";
import { ActivityChart } from "../list/ActivityChart";
import { getRepsFromLog } from "../../../models/log/getRepsFromLog";
import { ActivityStats } from "../list/ActivityStats";

type Props = StackScreenProps<TrackingParamList, "StartActivityScreen">;
export const StartActivityScreen: React.FC<Props> = ({ route, navigation }) => {
  const { data: idToken } = useFirebase();
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const [foundDevice, setFoundDevice] = React.useState(false);
  const [chartData, setChartData] = React.useState<ChartData | undefined>();
  const [networkStatus] = useNetworkStatus();
  const deleteActivity = useDeleteActivity();
  const [currentState, send] = useMachine(trainingMachine);
  const [localData, setLocalData] = useLocalData();
  useKeepAwake();

  React.useEffect(() => {
    if (currentState.matches("unCalibrated")) {
      const timer = setInterval(() => {
        console.log("Calibration timer running!");
        checkIfCalibrated().then((result) => {
          if (result) {
            send("NEXT");
            clearInterval(timer);
          }
        });
      }, 1000);

      return () => clearInterval(timer);
    }
  }, [networkStatus, currentState.value]);

  const checkDeviceStatus = () => {
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
  };

  React.useEffect(() => {
    if (networkStatus === NetworkState.hasNothing) {
      send("ERROR");
    }

    checkDeviceStatus();
  }, [networkStatus, currentState.value]);

  // const { data } = useActivity({ idToken, id: route.params.id });
  const { data, isLoading } = useActivityHydrated({
    idToken: idToken || "",
    id: route.params.id,
  });

  const handleGoHome = () => {
    navigation.navigate("TrackingScreen");
  };

  if (isLoading) {
    return <Loading />;
  }

  if (data.length !== 1) {
    return (
      <ErrorDisplay error="Error fetching data">
        <Buttons.Button
          text="Click here to go home"
          handleClick={handleGoHome}
        ></Buttons.Button>
      </ErrorDisplay>
    );
  }

  const currentActivity = data[0];
  console.log("currentActivity", currentActivity);
  console.log("localData", localData);
  console.log("networkStatus", networkStatus);
  console.log("currentState", currentState.value);

  const title = currentActivity.movementName.toLocaleUpperCase();

  // get from state
  const selectedExercise = currentActivity.movement;
  const selectedWeight = currentActivity.weight;

  if (!currentState) {
    return <Loading />;
  }

  const handleClick = () => {
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
      const reps = await getRepsFromLog({
        rawData: result.data,
        bodyWeight: currentActivity.userWeight,
        timestamp: 0,
        durationMillis: result.data.length * 10,
      });

      let count = 0;
      setChartData(
        result.data.map((item: number) => ({
          x: count++,
          y: item,
        }))
      );

      setLocalData([
        ...localData,
        {
          user: currentActivity.user,
          data: result.data,
          movement: selectedExercise,
          weight: selectedWeight,
          created_at: +new Date(),
          reps,
        },
      ]);
      send("NEXT");
      setErrorMessage("");
    }
  };

  const handleClickReset = () => {
    send("NEXT");
  };

  const handleDelete = () => {
    if (currentActivity.id) {
      deleteActivity({ idToken, id: currentActivity.id });
      showToast({ text: "Activity deleted." });
      navigation.navigate("TrackingScreen");
    }
  };

  const lastLog = last(localData);

  // navigation.setOptions({ title: `${title} ${currentActivity.weightName}` });

  return (
    <Layouts.TopMiddle
      renderTop={() => <Buttons.Delete handleClick={handleDelete} />}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          {errorMessage && (
            <View style={styles.errorBox}>
              <Text style={styles.errorBanner}>{errorMessage}</Text>
            </View>
          )}
        </View>
        {/* <View style={styles.mainContainer}>
          {chartData && <ActivityChart data={chartData} />}
        </View> */}
        <View style={styles.footerContainer}>
          <StartAction
            currentState={currentState}
            handleDetectDevice={checkDeviceStatus}
            handleClick={handleClick}
            handleClickStop={handleClickStop}
            handleClickReset={handleClickReset}
          />
          {currentState.matches("hasRun") && (
            <ActivityStats reps={lastLog?.reps} />
          )}
        </View>
      </View>
    </Layouts.TopMiddle>
  );
};

const errorBox: ViewStyle = {
  backgroundColor: Colors[CurrentTheme].background,
  borderWidth: 2,
  padding: 20,
  borderColor: "#fe5523",
};

const styles = StyleSheet.create({
  errorBanner: {
    color: Colors[CurrentTheme].error,
  },
  errorBox,
  titleContainer: {
    flex: 1,
  },
  footerContainer: {
    flex: 1,
  },
  mainContainer: {
    flex: 4,
    width: "100%",
    minHeight: 200,
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
