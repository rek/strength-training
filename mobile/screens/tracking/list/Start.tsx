import React from "react";
import { StyleSheet } from "react-native";
import { useMachine } from "@xstate/react";
import { StackScreenProps } from "@react-navigation/stack";
import { useKeepAwake } from "expo-keep-awake";

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

import TEMP_DATA from "../../../__fixtures__/y_2";
import { trainingMachine } from "./startState";
import { Stopwatch } from "../../../components/Stopwatch";
import { StartAction } from "./StartAction";
import {
  useActivityHydrated,
  useDeleteActivity,
} from "../../../models/activities/queries";
import { showToast } from "../../../components/Toast";
import { ActivityChart } from "./ActivityChart";

type Props = StackScreenProps<TrackingParamList, "StartActivityScreen">;
export const StartActivityScreen: React.FC<Props> = ({ route, navigation }) => {
  const { data: idToken } = useFirebase();
  const [errorMessage, setErrorMessage] = React.useState<string | undefined>();
  const [foundDevice, setFoundDevice] = React.useState(false);
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
  const data = useActivityHydrated({
    idToken: idToken || "",
    id: route.params.id,
  });

  const handleGoHome = () => {
    navigation.navigate("TrackingScreen");
  };

  if (data.length !== 1) {
    return (
      <ErrorDisplay error="Error fetching data">
        <Buttons.Button
          title="Click here to go home"
          handleClick={handleGoHome}
        ></Buttons.Button>
      </ErrorDisplay>
    );
  }

  const currentActivity = data[0];
  // console.log("currentActivity", currentActivity);
  // console.log("localData", localData);
  console.log("networkStatus", networkStatus);
  console.log("currentState", currentState.value);

  const title = currentActivity.movementName.toLocaleUpperCase();

  // get from state
  const selectedExercise = currentActivity.movement;
  const selectedWeight = currentActivity.weight;

  if (!currentState) {
    return <Loading />;
  }

  let count = 0;
  const chartData: ChartData = TEMP_DATA.map((item: number) => ({
    x: count++,
    y: item,
  }));

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

  const handleDelete = () => {
    if (currentActivity.id) {
      deleteActivity({ idToken, id: currentActivity.id });
      showToast({ text: "Activity deleted." });
      navigation.navigate("TrackingScreen");
    }
  };

  return (
    <Layouts.TopMiddle
      renderTop={() => <Buttons.Delete handleDelete={handleDelete} />}
    >
      <View style={styles.container}>
        <View style={styles.titleContainer}>
          <View style={styles.errorBox}>
            <Text style={styles.errorBanner}>{errorMessage}</Text>
          </View>
          <Text style={titleStyle}>{title}</Text>
        </View>
        <View style={styles.mainContainer}>
          {chartData ? (
            <ActivityChart data={chartData} />
          ) : (
            <Text>Results will appear here when available</Text>
          )}
        </View>
        <View style={styles.footerContainer}>
          <StartAction
            currentState={currentState}
            handleDetectDevice={checkDeviceStatus}
            handleClick={handleClick}
            handleClickStop={handleClickStop}
            handleClickReset={handleClickReset}
          />
        </View>
      </View>
    </Layouts.TopMiddle>
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
