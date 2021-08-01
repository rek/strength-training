import React from "react";
import { State } from "xstate";
import { Dimensions } from "react-native";

import { View } from "../../../components";
import { ScrollContainer } from "../../../components/ScrollContainer";
import { Stage1 } from "./Stage1";
import { Stage1Complete } from "./Stage1Complete";
import { Stage2Complete } from "./Stage2Complete";
import { Stage2 } from "./Stage2";
import { Stage3Complete } from "./Stage3Complete";
import { Stage3 } from "./Stage3";

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
  const screenHeight = Dimensions.get("window").height;
  console.log("screenHeight", screenHeight);

  return (
    <>
      <View style={[{ height: screenHeight }]}>
        {currentState.matches("noDevice") && (
          <>
            <Stage1 handleDetectDevice={handleDetectDevice} />
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
            <Stage2Complete handleClick={handleClick} />
          </>
        )}
        {currentState.matches("running") && (
          <Stage3 handleClick={handleClickStop} />
        )}
        {currentState.matches("hasRun") && (
          <Stage3Complete handleClick={handleClickReset} />
        )}
      </View>
    </>
  );
};
