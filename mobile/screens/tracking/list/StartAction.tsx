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
          title="No device found. Check again?"
        />
      )}
      {currentState.matches("unCalibrated") && (
        <Text>Waiting for calibration.</Text>
      )}
      {currentState.matches("ready") && (
        <Buttons.ButtonNormal handleClick={handleClick} title="Start" />
      )}
      {currentState.matches("running") && (
        <Buttons.ButtonNormal handleClick={handleClickStop} title="Stop" />
      )}
      {currentState.matches("hasRun") && (
        <Buttons.Button
          handleClick={handleClickReset}
          title="Log recorded and added, click to reset."
        />
      )}
    </View>
  );
};
