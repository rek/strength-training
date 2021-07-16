import React from "react";
import { StyleSheet } from "react-native";

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

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  topBar: {
    flexFlow: "row wrap",
    justifyContent: "flex-end",
  },
  middleContent: {
    alignItems: "center",
    justifyContent: "center",
  },
});
