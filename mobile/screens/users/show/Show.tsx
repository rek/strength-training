import * as React from "react";
import capitalize from "lodash/capitalize";
import { HeaderTitle, StackScreenProps } from "@react-navigation/stack";

import { UsersParamList } from "../../../navigation/types";
import { Buttons, Layouts, View, Text, Loading } from "../../../components";
import { useFirebase } from "../../../database/useFirebase";
import { useUsers } from "../../../models/user";

type Props = StackScreenProps<UsersParamList, "ShowUserScreen">;
export const ShowUserScreen: React.FC<Props> = ({ route, navigation }) => {
  const { data: idToken } = useFirebase();
  const { data: allUsers } = useUsers({ idToken });

  if (!idToken || !allUsers) {
    return <Loading />;
  }

  const user = allUsers.find((user) => user.id === route.params.id);

  navigation.setOptions({ title: user?.name.toLocaleUpperCase() });

  return (
    <Layouts.TopMiddle
      renderTop={() => (
        <Buttons.Edit
          handleClick={() => navigation.navigate("CreateUserScreen")}
        />
      )}
    >
      <View>
        <HeaderTitle>Details:</HeaderTitle>
        <Text>Name: {capitalize(user?.name)}</Text>
        <Text>Weight: {user?.weight}</Text>
        <Text>Age: {user?.age || "Unknown"}</Text>
      </View>
    </Layouts.TopMiddle>
  );
};
