import { Alert } from "react-native";

export const deleteAlert = ({ handleOk }: { handleOk: () => void }) =>
  Alert.alert(
    "Delete",
    "Are you sure you want to delete?",
    [
      {
        text: "Cancel",
        // onPress: () => console.log("Cancel Pressed"),
        style: "cancel",
      },
      { text: "OK", onPress: handleOk },
    ],
    { cancelable: false }
  );
