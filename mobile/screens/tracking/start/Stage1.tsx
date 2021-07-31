import * as React from "react";
import { StyleSheet } from "react-native";

import { Buttons, Icons, Text, View } from "../../../components";
import { typography } from "../../../styles/typography";

import { Stage } from "./Stage";

interface Props {
  handleDetectDevice: () => void;
}
export const Stage1: React.FC<Props> = ({ handleDetectDevice }) => {
  return (
    <Stage stage={1} renderIcon={() => <Icons.Wifi size={256} />}>
      <Buttons.Button handleClick={handleDetectDevice}>
        <Text style={titleStyle}>
          Connect to sensor WIFI, and then click here to trigger a re-check.
        </Text>
      </Buttons.Button>
    </Stage>
  );
};

const styles = StyleSheet.create({
  title: {},
});
const titleStyle = StyleSheet.flatten([typography.large, styles.title]);
