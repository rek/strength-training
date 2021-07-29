import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../../../components";
import { typography } from "../../../styles/typography";

import { Stage } from "./Stage";

interface Props {}
export const Stage2: React.FC<Props> = ({}) => {
  return (
    <Stage stage={2}>
      <View style={styles.container}>
        <Text style={titleStyle}>
          Waiting for calibration. Please rotate device.
        </Text>
      </View>
    </Stage>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  title: {},
});

const titleStyle = StyleSheet.flatten([typography.large, styles.title]);
