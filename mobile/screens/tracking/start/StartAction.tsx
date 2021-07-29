import React from "react";
import { State } from "xstate";

import { Buttons, Text, View } from "../../../components";
import { ScrollContainer } from "../../../components/ScrollContainer";
import { Stage1 } from "./Stage1";
import { Stage1Complete } from "./Stage1Complete";
import { Stage2Complete } from "./Stage2Complete";
import { Stage2 } from "./Stage2";

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
        <>
          <Stage1 handleDetectDevice={handleDetectDevice} />
          {/* <Stage1Complete /> */}
          {/* <Stage2 /> */}
        </>
      )}
      {currentState.matches("unCalibrated") && (
        <>
          <Stage1Complete />
          <Stage2 />
        </>
      )}
      {currentState.matches("ready") && (
        <>
          <Stage1Complete />
          <Stage2Complete />
          <Buttons.ButtonNormal handleClick={handleClick} text="Track now" />
        </>
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
