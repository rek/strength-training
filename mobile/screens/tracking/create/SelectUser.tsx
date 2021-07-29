import React from "react";
import { Picker } from "@react-native-picker/picker";

import { Text } from "../../../components/Themed";
import { useCurrentUserState, useUsers } from "../../../models/user";

import { styles } from "../../elements";

export const SelectUser: React.FC<{ idToken: string }> = ({ idToken }) => {
  const [selectedUser, setSelectedUser] = useCurrentUserState();
  const { data: allUsers } = useUsers({ idToken });
  // console.log("selectedUser", selectedUser);

  return (
    <>
      {/* <Text style={styles.pickerTitle}>User:</Text> */}
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={selectedUser}
        onValueChange={(itemValue, itemIndex) => {
          if (itemValue) setSelectedUser(itemValue);
        }}
      >
        {selectedUser === undefined && (
          <Picker.Item label={"Select a user..."} value={""} />
        )}

        {allUsers?.map((user) => (
          <Picker.Item
            label={user.name}
            value={user.id}
            key={user.id}
            style={styles.pickerItem}
          />
        ))}
      </Picker>
    </>
  );
};
