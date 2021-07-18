import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { BottomTabParamList, UsersParamList } from "./types";

import { UsersScreen } from "../screens";
import { TrackingIcon, TrackingNavigator } from "./tracking/TrackingStack";
import { LogsIcon, LogsNavigator } from "./logs/LogsStack";
import { TabBarIcon } from "./TabBarIcon";

const BottomTab = createBottomTabNavigator<BottomTabParamList>();

export default function BottomTabNavigator() {
  const colorScheme = useColorScheme();

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
        component={TabTwoNavigator}
        options={{
          tabBarIcon: ({ color }) => <TabBarIcon name="people" color={color} />,
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

const TabTwoStack = createStackNavigator<UsersParamList>();

function TabTwoNavigator() {
  return (
    <TabTwoStack.Navigator>
      <TabTwoStack.Screen
        name="UsersScreen"
        component={UsersScreen}
        options={{ headerTitle: "Users" }}
      />
    </TabTwoStack.Navigator>
  );
}
