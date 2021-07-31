import * as React from "react";
import { StyleSheet } from "react-native";

import { Buttons, Icons, View, Text } from "../../../components";
import { borders } from "../../../styles/borders";
import { typography } from "../../../styles/typography";

interface Props {
  handleClick: () => void;
}
export const Stage3Complete: React.FC<Props> = ({ handleClick }) => {
  return (
    <View>
      <View>
        <Text style={typography.xlarge}>Activity Tracked</Text>
      </View>
      <View style={styles.tickContainer}>
        <Text style={tickStyle}>
          <Icons.Tick size={100} />
        </Text>
      </View>
      <Buttons.ButtonNormal handleClick={handleClick} text="View" />;
      <View>
        <Text style={typography.xlarge}>New activity:</Text>
        <Buttons.ButtonNormal handleClick={handleClick} text="Track activity" />
      </View>
    </View>
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
