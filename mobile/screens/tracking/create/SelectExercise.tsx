import React from "react";
import { atom, useRecoilState } from "recoil";
import { Picker } from "@react-native-picker/picker";

import { Text } from "../../../components/Themed";
import { styles } from "../../elements";

const selectedExerciseState = atom({
  key: "selectExercise", // unique ID (with respect to other atoms/selectors)
  default: 1 as number,
});

export const SelectExercise: React.FC = () => {
  const [selectExercise, setSelectExercise] = useSelectedExercise();

  return (
    <>
      <Text style={styles.pickerTitle}>Movement:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectExercise}
        onValueChange={(itemValue, itemIndex) => setSelectExercise(itemValue)}
      >
        <Picker.Item
          label="Kettlebell thrust"
          value={1}
          style={styles.pickerItem}
        />
        <Picker.Item
          label="Kettlebell GSquat"
          value={2}
          style={styles.pickerItem}
        />
        <Picker.Item label="Pullup" value={3} style={styles.pickerItem} />
      </Picker>
    </>
  );
};

export const useSelectedExercise = () => useRecoilState(selectedExerciseState);
