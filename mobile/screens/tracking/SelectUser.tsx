import React from "react";
import { atom, useRecoilState } from "recoil";
import { Picker } from "@react-native-picker/picker";

import { Text } from "../../components/Themed";
import { allUsers, useCurrentUserState } from "../../hooks/useUsers";

import { styles } from "./elements";

export const SelectUser: React.FC = () => {
  const [selectUser, setSelectUser] = useCurrentUserState();

  return (
    <>
      <Text style={styles.pickerTitle}>User:</Text>
      <Picker
        style={styles.picker}
        itemStyle={styles.pickerItem}
        selectedValue={selectUser}
        onValueChange={(itemValue, itemIndex) => setSelectUser(itemValue)}
      >
        <Picker.Item value={""} />
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
