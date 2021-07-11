import React from "react";
import { atom, useRecoilState } from "recoil";
import { Picker } from "@react-native-picker/picker";

import { Text } from "../../../components/Themed";
import { styles } from "../../elements";

const selectedImplementState = atom({
  key: "selectImplement", // unique ID (with respect to other atoms/selectors)
  default: 1 as number,
});

export const SelectImplement: React.FC = () => {
  const [selectImplement, setSelectImplement] = useSelectedImplement();

  return (
    <>
      <Text style={styles.pickerTitle}>Implement:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectImplement}
        onValueChange={(itemValue, itemIndex) => setSelectImplement(itemValue)}
      >
        <Picker.Item label="Kettlebell" value={1} style={styles.pickerItem} />
        <Picker.Item label="Dumbbell" value={2} style={styles.pickerItem} />
        <Picker.Item label="Barbell" value={3} style={styles.pickerItem} />
        <Picker.Item label="Human Body" value={4} style={styles.pickerItem} />
      </Picker>
    </>
  );
};

export const useSelectedImplement = () =>
  useRecoilState(selectedImplementState);
