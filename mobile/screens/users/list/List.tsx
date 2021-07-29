import capitalize from "lodash/capitalize";
import * as React from "react";
import { StyleSheet } from "react-native";

import { Buttons, Icons, RefreshView, Text, View } from "../../../components";
import { SIZES } from "../../../constants/Colors";
import { useFirebase } from "../../../database/useFirebase";
import { useUsers, User } from "../../../models/user";
import { CardStyles } from "../../../styles/card";

type Props = {
  handleShowUser: (id: User["id"]) => void;
};
// type Props = StackScreenProps<UsersParamList, "UsersScreen">;
export const ListUsersScreen: React.FC<Props> = ({ handleShowUser }) => {
  const { data: idToken } = useFirebase();
  const { data: allUsers } = useUsers({ idToken });

  const refreshAction = () => {
    return Promise.resolve();
  };

  const handleClickUser = (id: string) => () => {
    handleShowUser(id);
  };

  return (
    <RefreshView refreshAction={refreshAction}>
      {allUsers?.map((user) => {
        if (!user.id) {
          return null;
        }
        return (
          <Buttons.Button
            key={user.id}
            handleClick={handleClickUser(user.id)}
            extraStyles={CardStyles.container}
          >
            <View style={CardStyles.textContainer}>
              <Text style={styles.title}>{capitalize(user.name)}</Text>
              <Text>Max avg: N/A</Text>
              <Text>Max peak: N/A</Text>
            </View>
            <View>
              <Icons.Right />
            </View>
          </Buttons.Button>
        );
      })}
    </RefreshView>
  );
};

const styles = StyleSheet.create({
  title: {
    fontSize: SIZES.large,
  },
  // separator: {
  //   marginBottom: 20,
  //   marginTop: 10,
  //   height: 1,
  //   width: "80%",
  // },
});
