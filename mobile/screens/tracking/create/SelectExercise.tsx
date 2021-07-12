import React from "react";
import { atom, useRecoilState } from "recoil";
import capitalize from "lodash/capitalize";
import { Picker } from "@react-native-picker/picker";

import { Text } from "../../../components/Themed";
import { styles } from "../../elements";
import { useMovements } from "../../../hooks";

const selectedExerciseState = atom({
  key: "selectExercise", // unique ID (with respect to other atoms/selectors)
  default: "1" as string,
});

export const SelectExercise: React.FC<{ idToken: string }> = ({ idToken }) => {
  const [selectExercise, setSelectExercise] = useSelectedExercise();
  const { data: items } = useMovements({ idToken });
  const name = "Movement";

  return (
    <>
      <Text style={styles.pickerTitle}>Movement:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectExercise}
        onValueChange={(itemValue, itemIndex) => setSelectExercise(itemValue)}
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

export const useSelectedExercise = () => useRecoilState(selectedExerciseState);
