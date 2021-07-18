import * as React from "react";

import {
  createStackNavigator,
  HeaderBackButton,
  StackScreenProps,
} from "@react-navigation/stack";

import { TrackingParamList } from "../types";
import { RightHeaderStatus } from "../RightHeaderStatus";

import { TrackingScreen, CreateActivityScreen } from "../../screens/tracking";
import { StartActivityScreen } from "../../screens/tracking/list/Start";
import { TabBarIcon } from "../TabBarIcon";

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
export const TrackingStack = createStackNavigator<TrackingParamList>();

type Props = StackScreenProps<TrackingParamList, "TrackingScreen">;
export const TrackingNavigator: React.FC<Props> = ({ navigation }) => {
  const handleBack = () => {
    navigation.navigate("TrackingScreen");
  };
  return (
    <TrackingStack.Navigator>
      <TrackingStack.Screen
        name="TrackingScreen"
        options={{ headerTitle: "Tracking", headerRight: RightHeaderStatus }}
        component={TrackingScreen}
      />
      <TrackingStack.Screen
        name="StartActivityScreen"
        component={StartActivityScreen}
        options={{
          headerTitle: "Start",
          headerLeft: () => <HeaderBackButton onPress={handleBack} />,
          headerRight: RightHeaderStatus,
        }}
      />
      <TrackingStack.Screen
        name="CreateActivityScreen"
        component={CreateActivityScreen}
        options={{
          headerTitle: "Create Activity",
          headerRight: RightHeaderStatus,
        }}
      />
    </TrackingStack.Navigator>
  );
};

export const TrackingIcon = ({ color }: { color: string }) => (
  <TabBarIcon name="fitness" color={color} />
);
