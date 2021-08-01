import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import { BottomTabParamList } from "./types";

import { TrackingIcon, TrackingNavigator } from "./tracking/TrackingStack";
import { LogsIcon, LogsNavigator } from "./logs/LogsStack";
import { UsersIcon } from "./users/icon";
import { UsersNavigator } from "./users/UsersStack";
import { useTheme } from "../hooks";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const theme = useTheme();

  return (
    <BottomTab.Navigator
      initialRouteName="Tracking"
      tabBarOptions={{
        activeTintColor: theme.tabIconSelected,
        inactiveTintColor: theme.tabIconDefault,
        // inactiveBackgroundColor: "#444",

        // both light:
        // activeBackgroundColor: "#fff",
        // inactiveBackgroundColor: "#fff",

        // both dark:
        // activeBackgroundColor: theme.background,
        // inactiveBackgroundColor: theme.background,

        style: {
          borderTopWidth: 0,
          height: 56,
          paddingBottom: 5,
        },
        // active:
        // border: 1px solid rgb(119, 119, 119);
      }}
    >
      <BottomTab.Screen
        name="Tracking"
        component={TrackingNavigator}
        options={{
          tabBarIcon: TrackingIcon,
        }}
      />
      <BottomTab.Screen
        name="Users"
        component={UsersNavigator}
        options={{
          tabBarIcon: UsersIcon,
        }}
      />
      <BottomTab.Screen
        name="Logs"
        component={LogsNavigator}
        options={{
          tabBarIcon: LogsIcon,
        }}
      />
    </BottomTab.Navigator>
  );
}
