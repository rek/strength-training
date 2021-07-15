import React from "react";
import { useMachine } from "@xstate/react";

import { Buttons, Text, View } from "../../../components";

import { trainingMachine } from "./startState";

interface Props {
  handleClick: () => void;
  handleClickStop: () => void;
  handleClickReset: () => void;
}
export const StartAction: React.FC<Props> = ({
  handleClickReset,
  handleClick,
  handleClickStop,
}) => {
  const [currentState, send] = useMachine(trainingMachine);

  return (
    <View>
      {currentState.matches("noDevice") && <Text>No device found.</Text>}
      {currentState.matches("unCalibrated") && (
        <Text>Waiting for calibration.</Text>
      )}
      {currentState.matches("ready") && (
        <Buttons.ButtonNormal handleClick={handleClick}>
          Start
        </Buttons.ButtonNormal>
      )}
      {currentState.matches("running") && (
        <Buttons.ButtonNormal handleClick={handleClickStop}>
          Stop
        </Buttons.ButtonNormal>
      )}
      {currentState.matches("hasRun") && (
        <>
          <Buttons.ButtonNormal handleClick={handleClickReset}>
            Reset
          </Buttons.ButtonNormal>
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
  );
};
