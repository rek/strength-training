import React from "react";
import { StyleSheet, ViewStyle } from "react-native";

import { View } from "../Themed";

interface Props {
  renderTop?: () => React.ReactElement;
}
export const TopMiddle: React.FC<Props> = ({ renderTop, children }) => {
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>{renderTop && renderTop()}</View>
      <View style={styles.middleContent}>{children}</View>
    </View>
  );
};

const container: ViewStyle = {
  flex: 1,
};
const topBar: ViewStyle = {
  flexDirection: "row",
  alignItems: "flex-end",
  justifyContent: "flex-end",
};
const middleContent: ViewStyle = {
  alignItems: "center",
  // justifyContent: "center",
};

const styles = StyleSheet.create({
  container,
  topBar,
  middleContent,
});
