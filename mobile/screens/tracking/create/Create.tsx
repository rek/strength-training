import * as React from "react";
import { StyleProp, StyleSheet, ViewStyle } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { Text, View, Button, AddButton, Loading } from "../../../components";
import Colors, { CurrentTheme } from "../../../constants/Colors";

import { useSelectedWeight, SelectWeight } from "./SelectWeight";
import { useSelectedExercise, SelectExercise } from "../create";
import { SelectUser } from "./SelectUser";
import { SelectImplement, useSelectedImplement } from "./SelectImplement";
import { useCurrentUserState } from "../../../hooks/useUsers";
import { createActivity } from "../../../hooks/useActivities";
import { useFirebase } from "../../../database/useFirebase";
import { TrackingParamList } from "../../../navigation/types";

type Props = StackScreenProps<TrackingParamList, "CreateActivityScreen">;
export const CreateActivityScreen: React.FC<Props> = ({ navigation }) => {
  const { data: idToken } = useFirebase();
  const [selectedExercise] = useSelectedExercise();
  const [selectedWeight] = useSelectedWeight();
  const [selectedImplement] = useSelectedImplement();
  const [selectedUser] = useCurrentUserState();

  const create = createActivity(idToken || "");

  const handleClick = async () => {
    // console.log("selectedExercise", selectedExercise);
    // console.log("selectedWeight", selectedWeight);
    // console.log("selectedImplement", selectedImplement);
    // console.log("selectedUser", selectedUser);

    if (!selectedUser) {
      console.log("Missing user");
      return;
    }

    await create({
      movement: selectedExercise,
      weight: selectedWeight,
      implement: selectedImplement,
      user: selectedUser,
    });

    navigation.navigate("TrackingScreen");
  };

  if (!idToken) {
    return <Loading />;
  }

  return (
    <View style={makePageStyle(styles.container)}>
      <View style={makePageStyle(styles.mainBox)}>
        <SelectUser />
      </View>
      <View style={makePageStyle(styles.mainBox)}>
        <SelectWeight idToken={idToken} />
      </View>
      <View style={makePageStyle(styles.mainBox)}>
        <SelectImplement idToken={idToken} />
      </View>
      <View style={makePageStyle(styles.mainBox)}>
        <SelectExercise idToken={idToken} />
      </View>
      <AddButton
        handleClick={handleClick}
        text="Create new"
        extraStyles={styles.pageStyle}
      />
    </View>
  );
};

const makePageStyle = (customStyle: StyleProp<ViewStyle>) => [
  customStyle,
  styles.pageStyle,
];

const styles = StyleSheet.create({
  pageStyle: {
    backgroundColor: Colors[CurrentTheme].background,
  },
  mainBox: {
    width: "80%",
    margin: 10,
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-start",
  },
});
