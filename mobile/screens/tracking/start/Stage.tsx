import * as React from "react";
import { StyleSheet } from "react-native";

import { Text, View } from "../../../components";
import { borders } from "../../../styles/borders";

interface Props {
  stage: number;
  renderIcon?: () => React.ReactElement;
}
export const Stage: React.FC<Props> = ({ stage, children, renderIcon }) => {
  return (
    <View style={styles.container}>
      <View style={styles.numberContainer}>
        <Text style={numberStyle}>{stage}</Text>
      </View>
      {renderIcon && <View style={styles.icon}>{renderIcon()}</View>}
      <View style={styles.content}>{children}</View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  numberContainer: {
    // height: 100,
    alignItems: "flex-start",
  },
  stageNumber: {
    width: 38,
    paddingLeft: 14,
  },
  icon: {
    alignItems: "center",
    // height: 100,
  },
  content: {
    // height: 100,
    alignItems: "center",
  },
});
const numberStyle = StyleSheet.flatten([styles.stageNumber, borders.round]);
