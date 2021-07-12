import * as React from "react";
import { StyleSheet } from "react-native";
import capitalize from "lodash/capitalize";

import { View, Text, Icons, Button } from "../../../components";
import { ActivityHydrayed } from "../../../hooks/useActivitiesHydrated";
import Colors, { SIZES } from "../../../constants/Colors";
import { borders } from "../../../styles/borders";

// can make this enum and type the values from the db
export const Icon: React.FC<{ name: string }> = ({ name }) => {
  if (name === "Kettlebell") {
    return <Icons.Kettlebell />;
  }

  if (name === "Dumbbell") {
    return <Icons.Dumbbell />;
  }

  return null;
};

export const ShowActivity: React.FC<{
  activity: ActivityHydrayed;
  handleClick: (activity: ActivityHydrayed) => void;
}> = ({ activity, handleClick }) => {
  const proxyHandleClick = () => {
    handleClick(activity);
  };

  return (
    <View style={containerStyles}>
      <View style={styles.textContainer}>
        <Text>
          {capitalize(activity.user)}
          <Icon name={activity.implementName} />
          {activity.weightName}
        </Text>
        <Text style={styles.movementStyle}>
          {activity.movementName.toLocaleUpperCase()}
        </Text>
      </View>
      <View style={styles.buttonContainer}>
        <Button handleClick={proxyHandleClick}>
          <Icons.Right />
        </Button>
      </View>
    </View>
  );
};

type Props = {
  activities: ActivityHydrayed[];
  handleClick: (activity: ActivityHydrayed) => void;
};
export const ListScreen: React.FC<Props> = ({ activities, handleClick }) => {
  return (
    <View style={styles.container}>
      {activities.map((activity) => {
        return (
          <ShowActivity
            key={activity.id}
            activity={activity}
            handleClick={handleClick}
          />
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "60%",
  },
  row: {
    width: "100%",
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    paddingTop: 1,
    paddingBottom: 1,
  },
  textContainer: {
    width: "79%",
  },
  buttonContainer: {},
  movementStyle: {
    fontSize: SIZES.large,
  },
});

const containerStyles = StyleSheet.flatten([styles.row, borders.normal]);
