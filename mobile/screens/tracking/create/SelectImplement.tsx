import React from "react";
import { atom, useRecoilState } from "recoil";
import capitalize from "lodash/capitalize";
import { Picker } from "@react-native-picker/picker";

import { Text } from "../../../components/Themed";
import { styles } from "../../elements";
import { useImplements } from "../../../hooks";

const selectedImplementState = atom({
  key: "selectImplement", // unique ID (with respect to other atoms/selectors)
  default: "1" as string,
});

export const SelectImplement: React.FC<{ idToken: string }> = ({ idToken }) => {
  const [selectImplement, setSelectImplement] = useSelectedImplement();
  const { data: items } = useImplements({ idToken });
  const name = "implement";

  return (
    <>
      <Text style={styles.pickerTitle}>Implement:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectImplement}
        onValueChange={(itemValue, itemIndex) => setSelectImplement(itemValue)}
      >
        {items?.map((item) => {
          return (
            <Picker.Item
              label={capitalize(item.name)}
              key={`${name}-${item.id}`}
              value={item.id}
              style={styles.pickerItem}
            />
          );
        })}
      </Picker>
    </>
  );
};

export const useSelectedImplement = () =>
  useRecoilState(selectedImplementState);
