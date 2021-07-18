import React from "react";
import { StackScreenProps } from "@react-navigation/stack";
import { Text as DefaultText, View as DefaultView } from "react-native";
import { Layouts, Loading, AddButtonSmall } from "../../components";

import { ListScreen, EmptyScreen } from "./list";
import { TrackingParamList } from "../../navigation/types";
import { useFirebase } from "../../database/useFirebase";
import { useActivitiesHydrated } from "../../models/activities/queries";
import { ActivityHydrayed } from "../../models/activities";

type Props = StackScreenProps<TrackingParamList, "TrackingScreen">;
export const TrackingScreen: React.FC<Props> = ({ navigation }) => {
  const { data: idToken, isLoading } = useFirebase();
  const activities = useActivitiesHydrated(idToken);

  const handleClick = (activity: ActivityHydrayed) => {
    if (activity.id) {
      navigation.navigate("StartActivityScreen", { id: activity.id });
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Layouts.TopMiddle
      renderTop={() => (
        <AddButtonSmall
          text="Add"
          handleClick={() => navigation.navigate("CreateActivityScreen")}
        />
      )}
    >
      {activities && activities.length > 0 ? (
        <ListScreen activities={activities} handleClick={handleClick} />
      ) : (
        <EmptyScreen />
      )}
    </Layouts.TopMiddle>
  );
};
