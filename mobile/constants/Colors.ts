const tintColorLight = "#eee";
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

enum theme {
  "light" = "light",
  "dark" = "dark",
}

type Styles = Record<theme, Record<string, string>>;

export const CurrentTheme = "dark";

// current: "light",
export default {
  current: "dark",
  light: {
    icons: "black",
    error: red,
    hasNet: green,
    hasDevice: blue,
    hasUnsaved: orange,
    text: "#fff",
    border: darkGrey,
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: lightGrey,
    tabIconSelected: tintColorDark,
  },
  dark: {
    icons: "white",
    error: red,
    hasNet: green,
    hasDevice: blue,
    hasUnsaved: orange,
    text: lightGrey,
    background: darkGrey,
    border: lightGrey,
    tint: darkGrey,
    tabIconDefault: lightGrey,
    tabIconSelected: tintColorDark,
  },
} as Styles;

export const SIZES = {
  small: 14,
  normal: 20,
  large: 24,
};
