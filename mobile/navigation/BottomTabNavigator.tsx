import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";
import * as React from "react";

import Colors from "../constants/Colors";
import useColorScheme from "../hooks/useColorScheme";
import { BottomTabParamList, LogsParamList, UsersParamList } from "../types";

import { LogsScreen, Settings, UsersScreen } from "../screens";
import { TrackingNavigator } from "./tracking/TrackingStack";

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
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="fitness" color={color} />
          ),
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
        component={TabThreeNavigator}
        options={{
          tabBarIcon: ({ color }) => (
            <TabBarIcon name="bar-chart" color={color} />
          ),
        }}
      />
    </BottomTab.Navigator>
  );
}

// You can explore the built-in icon families and icons on the web at:
// https://icons.expo.fyi/
function TabBarIcon(props: {
  name: React.ComponentProps<typeof Ionicons>["name"];
  color: string;
}) {
  return <Ionicons size={30} style={{ marginBottom: -4 }} {...props} />;
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

const TabThreeStack = createStackNavigator<LogsParamList>();
function TabThreeNavigator() {
  return (
    <TabThreeStack.Navigator initialRouteName="LogsScreen">
      <TabThreeStack.Screen
        name="SettingsScreen"
        options={{ title: "Settings" }}
        component={Settings}
      />
      <TabThreeStack.Screen
        name="LogsScreen"
        component={LogsScreen}
        options={{ headerTitle: "Logs" }}
      />
    </TabThreeStack.Navigator>
  );
}
