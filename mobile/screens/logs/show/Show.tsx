import * as React from "react";
import { StyleSheet } from "react-native";
import { StackScreenProps } from "@react-navigation/stack";

import { LogsParamList } from "../../../navigation/types";
import { Buttons, Layouts, View, Text, Loading } from "../../../components";
import { useFirebase } from "../../../database/useFirebase";
import Colors, { CurrentTheme } from "../../../constants/Colors";
import { ActivityChart } from "../../tracking/list/ActivityChart";

type Props = StackScreenProps<LogsParamList, "ShowLogScreen">;
export const ShowLogScreen: React.FC<Props> = ({ route, navigation }) => {
  const { data: idToken } = useFirebase();

  if (!idToken) {
    return <Loading />;
  }

  return (
    <Layouts.TopMiddle>
      <View style={styles.mainContainer}>
        <Text>Coming soon...</Text>
        {/* {chartData && <ActivityChart data={chartData} />} */}
      </View>
    </Layouts.TopMiddle>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 4,
    width: "100%",
    minHeight: 200,
    backgroundColor: Colors[CurrentTheme].background,
    marginBottom: 10,
  },
});
