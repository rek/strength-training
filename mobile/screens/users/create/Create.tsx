import * as React from "react";
import { StyleProp, StyleSheet, TextInput, ViewStyle } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { View, Buttons, Loading } from "../../../components";
import Colors, { currentThemeMode } from "../../../constants/Colors";

import { useCurrentUserState, createUser } from "../../../models/user";
import { useFirebase } from "../../../database/useFirebase";
import { UsersParamList } from "../../../navigation/types";
import { showToast } from "../../../components/Toast";

type Props = StackScreenProps<UsersParamList, "CreateUserScreen">;
export const CreateUserScreen: React.FC<Props> = ({ navigation }) => {
  const { data: idToken } = useFirebase();
  const [userName, setUserName] = React.useState("Name");
  const [userAge, setUserAge] = React.useState("Age");
  const [userWeight, setUseWeight] = React.useState("Weight");

  const create = createUser(idToken || "");

  const handleClick = async () => {
    if (!userName) {
      showToast({ text: "Missing name." });
      return;
    }

    await create({
      name: userName,
      weight: userWeight,
      age: Number(userAge),
    });

    showToast({ text: "User created." });
    navigation.navigate("UsersScreen");
  };

  if (!idToken) {
    return <Loading />;
  }

  return (
    <View style={makePageStyle(styles.container)}>
      <View style={makePageStyle(styles.mainBox)}>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setUserName(text)}
          value={userName}
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setUserAge(text)}
          value={userAge}
        />
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={(text) => setUseWeight(text)}
          value={userWeight}
        />
      </View>
      <Buttons.Add
        handleClick={handleClick}
        text="Save!"
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
    backgroundColor: Colors[currentThemeMode].colors.background,
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
