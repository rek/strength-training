import * as Linking from "expo-linking";

export default {
  prefixes: [Linking.makeUrl("/")],
  config: {
    screens: {
      Root: {
        screens: {
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
        },
      },
      NotFound: "*",
    },
  },
};
