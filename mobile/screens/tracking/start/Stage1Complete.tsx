import * as React from "react";
import { StyleSheet } from "react-native";

import { Icons, View, Text } from "../../../components";
import { borders } from "../../../styles/borders";
import { typography } from "../../../styles/typography";
import { Stage } from "./Stage";

export const Stage1Complete: React.FC = () => {
  return (
    <Stage stage={1} renderIcon={() => <Icons.Wifi size={256} />}>
      <View>
        <Text style={typography.xlarge}>Connected</Text>
      </View>
      <View style={styles.tickContainer}>
        <Text style={tickStyle}>
          <Icons.Tick size={100} />
        </Text>
      </View>
      <View style={styles.separator} />
    </Stage>
  );
};

const styles = StyleSheet.create({
  tick: {
    width: 130,
    paddingLeft: 15,
  },
  tickContainer: {
    alignItems: "flex-start",
  },
  separator: {
    width: "80%",
    backgroundColor: "white",
    height: 1,
    margin: 15,
  },
});
const tickStyle = StyleSheet.flatten([styles.tick, borders.round]);
