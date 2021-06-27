import * as React from "react";
import { StyleSheet } from "react-native";

import { Button, View, RefreshView } from "../components";
import { useUserState } from "../hooks/useUsers";

export default function UsersScreen() {
  const [currentUser, setCurrentUser] = useUserState();

  const refreshAction = () => {
    return Promise.resolve();
  };

  const allUsers = [
    { id: "adam", display: "adam", weight: 0 },
    { id: "anette", display: "anette", weight: 0 },
    { id: "crystal", display: "crystal", weight: 0 },
    { id: "sam", display: "sam", weight: 0 },
  ];

  const handleClickUser = (id: string) => () => {
    setCurrentUser(id);
  };

  return (
    // <RefreshView refreshAction={refreshAction}>
    <View style={styles.container}>
      {allUsers.map((user) => {
        return (
          <Button
            key={user.id}
            handleClick={handleClickUser(user.id)}
            extraStyles={user.id === currentUser ? styles.selected : undefined}
          >
            {user.display}
          </Button>
        );
      })}
    </View>
    // </RefreshView>
  );
}

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
