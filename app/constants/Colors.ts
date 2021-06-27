const tintColorLight = "#eee";
const tintColorDark = "#fff";

const lighterGrey = "#eee";
const lightGrey = "#ccc";
const darkGrey = "#333";
const orange = "#ffa726";

// internet status lights
const green = "#5dbb63";
const blue = "#3944bc";

export default {
  light: {
    hasNet: green,
    hasDevice: blue,
    hasUnsaved: orange,
    text: lightGrey,
    background: darkGrey,
    tint: darkGrey,
    tabIconDefault: lightGrey,
    tabIconSelected: darkGrey,
  },
  dark: {
    hasNet: green,
    hasDevice: blue,
    hasUnsaved: orange,
    text: "#fff",
    background: "#000",
    tint: tintColorDark,
    tabIconDefault: lightGrey,
    tabIconSelected: tintColorDark,
  },
};
