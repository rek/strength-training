import * as React from "react";
import { StyleSheet, ViewStyle } from "react-native";
import capitalize from "lodash/capitalize";

import { View, Text, Icons, Buttons } from "../../../components";
import { SIZES } from "../../../constants/Colors";
import { borders } from "../../../styles/borders";
import { ActivityIcon } from "./ActivityIcon";
import { Alerts } from "../../../components/alerts";
import { ActivityHydrayed } from "../../../models/activities";
import { CardStyles } from "../../../styles/card";

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
    <Buttons.Button
      handleClick={proxyHandleClick}
      handleLongPress={handleLongPress}
      extraStyles={CardStyles.container}
    >
      <View style={CardStyles.textContainer}>
        <Text>
          {capitalize(activity.userName)}
          <ActivityIcon name={activity.implementName} />
          {activity.weightName}
        </Text>
        <Text style={styles.movementStyle}>
          {activity.movementName.toLocaleUpperCase()}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Icons.Right />
      </View>
    </Buttons.Button>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {},
  movementStyle: {
    fontSize: SIZES.large,
  },
});
