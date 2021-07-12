import React from "react";
import { atom, useRecoilState } from "recoil";
import capitalize from "lodash/capitalize";
import { Picker } from "@react-native-picker/picker";

import { Text } from "../../../components/Themed";
import { styles } from "../../elements";
import { useWeights } from "../../../hooks";

const selectedWeightState = atom({
  key: "selectWeight", // unique ID (with respect to other atoms/selectors)
  default: "1" as string,
});

export const SelectWeight: React.FC<{ idToken: string }> = ({ idToken }) => {
  const [selectWeight, setSelectWeight] = useSelectedWeight();
  const { data: items } = useWeights({ idToken });
  const name = "weight";

  return (
    <>
      <Text style={styles.pickerTitle}>Implement weight:</Text>
      <Picker
        style={styles.picker}
        selectedValue={selectWeight}
        onValueChange={(itemValue, itemIndex) => setSelectWeight(itemValue)}
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

export const useSelectedWeight = () => useRecoilState(selectedWeightState);
