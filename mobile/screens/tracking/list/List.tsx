import * as React from "react";
import { StyleSheet } from "react-native";

import { View } from "../../../components";
import { ActivityHydrayed } from "../../../models/activities";

import { Activity } from "./Activity";

type Props = {
  activities: ActivityHydrayed[];
  handleClick: (activity: ActivityHydrayed) => void;
};
export const ListScreen: React.FC<Props> = ({ activities, handleClick }) => {
  return (
    <View style={styles.container}>
      {activities.map((activity) => {
        return (
          <Activity
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
    paddingTop: 100,
  },
});
