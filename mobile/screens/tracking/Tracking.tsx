import React from "react";
import { StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { AddButtonSmall, View } from "../../components";

import { ListScreen, EmptyScreen } from "./list";
import { TrackingParamList } from "../../types";
import { useFirebase } from "../../database/useFirebase";
import {
  ActivityHydrayed,
  useActivitiesHydrated,
} from "../../hooks/useActivitiesHydrated";
import { Loading } from "../../components";

type Props = StackScreenProps<TrackingParamList, "TrackingScreen">;
export const TrackingScreen: React.FC<Props> = ({ navigation }) => {
  const { data: token, isLoading } = useFirebase();
  const activities = useActivitiesHydrated(token || "");

  const handleClick = (activity: ActivityHydrayed) => {
    console.log("activity", activity);
    if (activity.id) {
      navigation.navigate("StartActivityScreen", { id: activity.id });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <AddButtonSmall
          text="Add"
          handleClick={() => navigation.navigate("CreateActivityScreen")}
        />
      </View>
      <View style={styles.middleContent}>
        {activities && activities.length > 0 ? (
          <ListScreen activities={activities} handleClick={handleClick} />
        ) : (
          <EmptyScreen />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  middleContent: {
    display: "flex",
    paddingTop: 100,
    alignItems: "center",
    justifyContent: "center",
  },
  topBar: {
    display: "flex",
    flexFlow: "row wrap",
    justifyContent: "flex-end",
  },
});
