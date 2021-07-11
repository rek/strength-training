import React from "react";
import { atom, useRecoilState } from "recoil";
import { Picker } from "@react-native-picker/picker";

import { Text } from "../../../components/Themed";
import { allUsers, useCurrentUserState } from "../../../hooks/useUsers";

import { styles } from "../../elements";

export const SelectUser: React.FC = () => {
  const [selectedUser, setSelectedUser] = useCurrentUserState();
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

        {allUsers.map((user) => (
          <Picker.Item
            label={user.display}
            value={user.id}
            key={user.id}
            style={styles.pickerItem}
          />
        ))}
      </Picker>
    </>
  );
};
