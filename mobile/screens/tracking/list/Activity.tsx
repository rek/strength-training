import * as React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import capitalize from "lodash/capitalize";

import { View, Text, Icons, Buttons } from "../../../components";
import { SIZES } from "../../../constants/Colors";
import { borders } from "../../../styles/borders";
import { ActivityIcon } from "./ActivityIcon";
import { Alerts } from "../../../components/alerts";
import { ActivityHydrayed } from "../../../models/activities";

export const Activity: React.FC<{
  activity: ActivityHydrayed;
  handleClick: (activity: ActivityHydrayed) => void;
}> = ({ activity, handleClick }) => {
  const handleDelete = (id: string) => () => {
    console.log("handleDelete", id);
  };

  const handleLongPress = (id: string) => {
    console.log("handleLongPress", id);
    Alerts.deleteAlert({ handleOk: handleDelete(id) });
  };

  const proxyHandleClick = () => {
    handleClick(activity);
  };

  return (
    <View style={containerStyles}>
      <Buttons.Button
        handleClick={proxyHandleClick}
        handleLongPress={handleLongPress}
        extraStyles={styles.textContainer}
      >
        <Text>
          {capitalize(activity.userName)}
          <ActivityIcon name={activity.implementName} />
          {activity.weightName}
        </Text>
        <Text style={styles.movementStyle}>
          {activity.movementName.toLocaleUpperCase()}
        </Text>
      </Buttons.Button>
      <View style={styles.buttonContainer}>
        <Icons.Right />
      </View>
    </View>
  );
};

const textContainer: ViewStyle = {
  flexGrow: 1,
};
const row: ViewStyle = {
  flexDirection: "row",
  marginBottom: 10,
  paddingTop: 1,
  paddingBottom: 1,
};
const styles = StyleSheet.create({
  row,
  textContainer,
  buttonContainer: {},
  movementStyle: {
    fontSize: SIZES.large,
  },
});

const containerStyles = StyleSheet.flatten([styles.row, borders.normal]);
