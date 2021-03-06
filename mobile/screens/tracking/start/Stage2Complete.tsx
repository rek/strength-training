import * as React from "react";
import { StyleSheet } from "react-native";

import { Buttons, Icons, View, Text } from "../../../components";
import { borders } from "../../../styles/borders";
import { typography } from "../../../styles/typography";
import { Stage } from "./Stage";

interface Props {
  handleClick: () => void;
}
export const Stage2Complete: React.FC<Props> = ({ handleClick }) => {
  return (
    <Stage stage={2} renderIcon={() => <Icons.Wifi size={256} />}>
      <View>
        <Text style={typography.xlarge}>Calibrated</Text>
      </View>
      <View style={styles.tickContainer}>
        <Text style={tickStyle}>
          <Icons.Tick size={100} />
        </Text>
      </View>
      <Buttons.ButtonNormal handleClick={handleClick} text="Track now" />;
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
});
const tickStyle = StyleSheet.flatten([styles.tick, borders.round]);
