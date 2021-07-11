import React from "react";
import { atom, useRecoilState } from "recoil";
import { Picker } from "@react-native-picker/picker";

import { Text } from "../../../components/Themed";
import { styles } from "../../elements";

const selectedWeightState = atom({
  key: "selectWeight", // unique ID (with respect to other atoms/selectors)
  default: 16 as number,
});

export const SelectWeight: React.FC = () => {
  const [selectWeight, setSelectWeight] = useSelectedWeight();

  return (
    <>
      <Text style={styles.pickerTitle}>Implement weight:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectWeight}
        onValueChange={(itemValue, itemIndex) => setSelectWeight(itemValue)}
      >
        <Picker.Item label="6 kg" value={6} style={styles.pickerItem} />
        <Picker.Item label="16 kg" value={16} style={styles.pickerItem} />
        <Picker.Item label="24 kg" value={24} style={styles.pickerItem} />
      </Picker>
    </>
  );
};

export const useSelectedWeight = () => useRecoilState(selectedWeightState);
