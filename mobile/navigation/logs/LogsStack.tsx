import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { LogsParamList } from "../types";
// import { RightHeaderStatus } from "../RightHeaderStatus";
import { LogsScreen, Settings } from "../../screens";
import { TabBarIcon } from "../TabBarIcon";

const LogsStack = createStackNavigator<LogsParamList>();
export const LogsNavigator = () => {
  return (
    <LogsStack.Navigator initialRouteName="LogsScreen">
      <LogsStack.Screen
        name="SettingsScreen"
        component={Settings}
        options={{ title: "Settings" }}
      />
      <LogsStack.Screen
        name="LogsScreen"
        component={LogsScreen}
        options={{ headerTitle: "Logs" }}
      />
    </LogsStack.Navigator>
  );
};

export const LogsIcon = ({ color }: { color: string }) => (
  <TabBarIcon name="bar-chart" color={color} />
);
