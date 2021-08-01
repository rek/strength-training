import { DefaultTheme, Theme } from "@react-navigation/native";
import { Appearance, ColorSchemeName } from "react-native";
import { LocalDataStatus } from "../hooks/useLocalData";
import { NetworkState } from "../hooks/useNetworkStatus";

const dark = "#000";
const light = "#fff";
const tintColorLight = "#888";
const tintColorDark = "#fff";

const lighterGrey = "#eee";
const lightGrey = "#ccc";
const darkGrey = "#333";
const orange = "#ffa726";

// internet status lights
const green = "#5dbb63";
const blue = "#3944bc";

const red = "#fc5060";
const red1 = "#fc5060";

// should use ColorSchemeName
enum themeModes {
  "light" = "light",
  "dark" = "dark",
}

type NetworkStatus = Record<NetworkState, string>;
type DataStatus = Record<LocalDataStatus, string>;

export type CustomTheme = {
  hasInternet: string;
  hasDevice: string;
  hasUnsaved: string;
  icons: string;
  error: string;
  tint: string;
  tabIconDefault: string;
  tabIconSelected: string;
} & Theme &
  NetworkStatus &
  DataStatus;

type Themes = Record<themeModes, CustomTheme>;

export const currentThemeMode = Appearance.getColorScheme() || "dark";
console.log("-- currentThemeMode --", currentThemeMode);

// current: "light",
export default {
  light: {
    dark: false,

    hasInternet: green,
    hasDevice: blue,
    hasUnsaved: orange,
    hasNothing: darkGrey,

    icons: "black",
    error: red,
    tint: tintColorDark,
    tabIconDefault: lightGrey,
    tabIconSelected: tintColorLight,

    colors: {
      ...DefaultTheme.colors,
      background: light,
      border: lightGrey,
      card: light,
      notification: "pink",
      primary: "rgb(255, 45, 85)",
      text: darkGrey,
    },
  },
  dark: {
    dark: true,

    hasInternet: green,
    hasDevice: blue,
    hasUnsaved: orange,
    hasNothing: lightGrey,

    icons: "white",
    error: red,
    tint: darkGrey,
    tabIconDefault: lightGrey,
    tabIconSelected: tintColorDark,

    colors: {
      ...DefaultTheme.colors,
      background: darkGrey,
      border: lightGrey,
      card: dark,
      notification: "blue",
      primary: "rgb(255, 45, 85)",
      text: lightGrey,
    },
  },
} as Themes;

export const SIZES = {
  small: 14,
  normal: 20,
  large: 24,
};
