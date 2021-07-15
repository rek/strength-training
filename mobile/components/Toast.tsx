import { Platform, ToastAndroid } from "react-native";

interface Props {
  text: string;
}
export const showToast = ({ text }: Props) => {
  if (Platform.OS === "android") {
    ToastAndroid.show(text, ToastAndroid.SHORT);
  }
  if (Platform.OS === "web") {
    console.log("----------------------------");
    console.log("Toast message:", text);
    console.log("----------------------------");
  }
};
