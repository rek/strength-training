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
      <View style={styles.content}>
        {renderIcon && <View style={styles.icon}>{renderIcon()}</View>}
        {children}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 10,
  },
  numberContainer: {
    alignItems: "flex-start",
  },
  stageNumber: {
    width: 38,
    paddingLeft: 14,
  },
  icon: {
    minHeight: 250,
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
});
const numberStyle = StyleSheet.flatten([styles.stageNumber, borders.round]);
