import * as React from "react";
import { StyleSheet } from "react-native";

import { View, Text } from "../../../components";
import { Rep } from "../../../models/log/types";

interface Props {
  reps?: Rep[];
}

export const ActivityStats: React.FC<Props> = ({ reps }) => {
  if (!reps) {
    return null;
  }

  return (
    <View style={styles.container}>
      <Text>Rep stats:</Text>
      {reps.map((rep, index) => (
        <ActivityStat
          key={`rep-result-${index}`}
          index={index + 1}
          average={rep.averageAccel}
          peak={rep.peakAccel}
        />
      ))}
    </View>
  );
};

export const ActivityStat: React.FC<{
  peak: number;
  average: number;
  index: number;
}> = ({ average, peak, index }) => {
  return (
    <View style={styles.row}>
      <Text style={styles.rowData}>
        {index}. Average Accel: {average}
      </Text>
      <Text style={styles.rowData}>Peak Accel: {peak}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  rowData: {
    margin: 1,
  },
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  row: {
    flexDirection: "row",
    marginBottom: 1,
    paddingTop: 1,
    paddingBottom: 1,
  },
});
