import * as React from "react";
import { StackScreenProps } from "@react-navigation/stack";

import { Buttons, Layouts } from "../../components";
import { UsersParamList } from "../../navigation/types";
import { ListUsersScreen } from "./list";
import { User } from "../../models/user";

type Props = StackScreenProps<UsersParamList, "UsersScreen">;
export const UsersScreen: React.FC<Props> = ({ navigation }) => {
  const handleClick = (id: User["id"]) => {
    if (id) {
      navigation.navigate("ShowUserScreen", { id });
    }
  };

  return (
    <Layouts.TopMiddle
      renderTop={() => (
        <Buttons.Add
          handleClick={() => navigation.navigate("CreateUserScreen")}
        />
      )}
    >
      <ListUsersScreen handleShowUser={handleClick} />
    </Layouts.TopMiddle>
  );
};
