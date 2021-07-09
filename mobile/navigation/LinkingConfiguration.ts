import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
          SettingsScreen: "SettingsScreen",
          Tracking: {
            screens: {
              TrackingScreen: "Tracking",
            },
          },
          Users: {
            screens: {
              UsersScreen: "Users",
            },
          },
          Logs: {
            screens: {
              LogsScreen: "LogsScreen",
            },
          },
        },
      },
      NotFound: "*",
    },
  },
};
