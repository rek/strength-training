import * as React from "react";
import { StyleSheet } from "react-native";

import { Buttons, Icons, View, Text } from "../../../components";
import { typography } from "../../../styles/typography";

interface Props {
  handleClick: () => void;
}
export const Stage3: React.FC<Props> = ({ handleClick }) => {
  return (
    <View>
      <View>
        <Text style={typography.xlarge}>Tracking...</Text>
      </View>
      <Icons.Dumbbell size={100} />
      <Buttons.ButtonNormal handleClick={handleClick} text="Stop" />;
    </View>
  );
};

const styles = StyleSheet.create({});
