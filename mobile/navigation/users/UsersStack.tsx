import * as React from "react";
import {
  createStackNavigator,
  HeaderBackButton,
  StackScreenProps,
} from "@react-navigation/stack";

import { CreateUserScreen, UsersScreen, ShowUserScreen } from "../../screens";

import { UsersParamList } from "../types";

const UsersStack = createStackNavigator<UsersParamList>();

type Props = StackScreenProps<UsersParamList, "UsersScreen">;
export const UsersNavigator: React.FC<Props> = ({ navigation }) => {
  const handleBack = () => {
    navigation.navigate("UsersScreen");
  };
  return (
    <UsersStack.Navigator>
      <UsersStack.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={{ headerTitle: "Users" }}
      />
      <UsersStack.Screen
        name="CreateUserScreen"
        component={CreateUserScreen}
        options={{
          headerTitle: "Add User",
          headerLeft: () => <HeaderBackButton onPress={handleBack} />,
        }}
      />
      <UsersStack.Screen
        name="ShowUserScreen"
        component={ShowUserScreen}
        options={{
          headerLeft: () => <HeaderBackButton onPress={handleBack} />,
        }}
      />
    </UsersStack.Navigator>
  );
};
