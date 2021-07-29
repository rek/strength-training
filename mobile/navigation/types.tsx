export type RootStackParamList = {
  Root: undefined;
  NotFound: undefined;
};

export type BottomTabParamList = {
  Tracking: undefined;
  Users: undefined;
  Logs: undefined;
};

export type TrackingParamList = {
  TrackingScreen: undefined;
  CreateActivityScreen: undefined;
  StartActivityScreen: { id: string };
};

export type UsersParamList = {
  UsersScreen: undefined;
  CreateUserScreen: undefined;
  ShowUserScreen: { id: string };
};

export type LogsParamList = {
  LogsScreen: undefined;
  SettingsScreen: undefined;
};

export type IDToken = { idToken: string };
