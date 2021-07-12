import * as React from "react";

import { createStackNavigator } from "@react-navigation/stack";

import { TrackingParamList } from "../types";
import { RightHeaderStatus } from "../RightHeaderStatus";

import { TrackingScreen, CreateActivityScreen } from "../../screens/tracking";
import { StartActivityScreen } from "../../screens/tracking/list/Start";
import { TabBarIcon } from "../BottomTabNavigator";

// Each tab has its own navigation stack, you can read more about this pattern here:
// https://reactnavigation.org/docs/tab-based-navigation#a-stack-navigator-for-each-tab
export const TrackingStack = createStackNavigator<TrackingParamList>();

// export const ActivityStack = createStackNavigator<ActivityParamList>();
// export const ActivityNavigator = () => {
//   return (
//     <ActivityStack.Navigator initialRouteName="TrackingScreen">
//       <ActivityStack.Screen
//         name="TrackingScreen"
//         component={TrackingScreen}
//         />
//     </ActivityStack.Navigator>
//   );
// };

export const TrackingNavigator = () => {
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
        options={{ headerTitle: "Start", headerRight: RightHeaderStatus }}
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
