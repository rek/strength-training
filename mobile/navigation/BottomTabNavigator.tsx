import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { BottomTabParamList } from "./types";

import { TrackingIcon, TrackingNavigator } from "./tracking/TrackingStack";
import { LogsIcon, LogsNavigator } from "./logs/LogsStack";
import { UsersIcon } from "./users/icon";
import { UsersNavigator } from "./users/UsersStack";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();
  // console.log("colorScheme", colorScheme);

  return (
    <BottomTab.Navigator
      initialRouteName="Tracking"
      tabBarOptions={{
        activeTintColor: Colors[colorScheme].tabIconSelected,
        inactiveTintColor: Colors[colorScheme].tabIconDefault,
        // inactiveBackgroundColor: "#444",

        // both light:
        // activeBackgroundColor: "#fff",
        // inactiveBackgroundColor: "#fff",

        // both dark:
        // activeBackgroundColor: Colors[colorScheme].background,
        // inactiveBackgroundColor: Colors[colorScheme].background,

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
