import React from "react";
import { State } from "xstate";

import { Buttons, Text, View } from "../../../components";

interface Props {
  currentState: State<any>;
  handleClick: () => void;
  handleClickStop: () => void;
  handleClickReset: () => void;
  handleDetectDevice: () => void;
}
export const StartAction: React.FC<Props> = ({
  currentState,
  handleDetectDevice,
  handleClickReset,
  handleClick,
  handleClickStop,
}) => {
  return (
    <View>
      {currentState.matches("noDevice") && (
        <Buttons.Button
          handleClick={handleDetectDevice}
          text="No device found. Please connect to device WIFI, and then click here to trigger a re-check."
        />
      )}
      {currentState.matches("unCalibrated") && (
        <Text>Waiting for calibration. Please rotate device.</Text>
      )}
      {currentState.matches("ready") && (
        <Buttons.ButtonNormal handleClick={handleClick} text="Start" />
      )}
      {currentState.matches("running") && (
        <Buttons.ButtonNormal handleClick={handleClickStop} text="Stop" />
      )}
      {currentState.matches("hasRun") && (
        <Buttons.Button
          handleClick={handleClickReset}
          text="Log recorded and added, click to reset."
        />
      )}
    </View>
  );
};
