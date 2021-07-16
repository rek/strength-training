import capitalize from "lodash/capitalize";
import * as React from "react";
import { StyleSheet } from "react-native";

import { Buttons, View, RefreshView } from "../components";
import { useFirebase } from "../database/useFirebase";
import { useCurrentUserState } from "../hooks/useUsers";
import { useUsers } from "../hooks/useUsers";

export const UsersScreen = () => {
  const [currentUser, setCurrentUser] = useCurrentUserState();
  const { data: idToken } = useFirebase();
  const { data: allUsers } = useUsers({ idToken });

  const refreshAction = () => {
    return Promise.resolve();
  };

  const handleClickUser = (id: string) => () => {
    setCurrentUser(id);
  };

  // const users = useUsers({ idToken: token });

  return (
    // <RefreshView refreshAction={refreshAction}>
    <View style={styles.container}>
      {allUsers?.map((user) => {
        return (
          <Buttons.Button
            key={user.id}
            handleClick={handleClickUser(user.id)}
            extraStyles={user.id === currentUser ? styles.selected : undefined}
          >
            {capitalize(user.name)}
          </Buttons.Button>
        );
      })}
    </View>
    // </RefreshView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingTop: 7,
  },
  selected: {
    borderWidth: 1,
    borderColor: "#333",
    borderRadius: 48,
    // padding: 18,
  },
  title: {
    fontSize: 14,
    // fontWeight: "bold",
  },
  separator: {
    marginBottom: 20,
    marginTop: 10,
    height: 1,
    width: "80%",
  },
});
