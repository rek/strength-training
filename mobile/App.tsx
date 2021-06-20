import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Text, View } from "./components/Themed";
import { Button } from "./components/Button";
import axios from "axios";

export default function App() {
  const handleClick = () => {
    axios
      .get("http://192.168.1.1:80/start")
      .then((response) => {
        console.log("Start response", response);
      })
      .catch((response) => {
        console.log("Error response", response);
      });
  };
  const handleClickStop = () => {
    axios
      .get("http://192.168.1.1:80/stop")
      .then((response) => {
        console.log("Stop response", response);
      })
      .catch((response) => {
        console.log("Error response", response);
      });
  };

  const handleClickResult = () => {
    axios
      .get("http://192.168.1.1:80/get")
      .then((response) => {
        console.log("Get response", response);
      })
      .catch((response) => {
        console.log("Error response", response);
      });
  };
  return (
    <View style={styles.container}>
      <Button handleClick={handleClick}>Start</Button>
      <Button handleClick={handleClickStop}>Stop</Button>
      <Button handleClick={handleClickResult}>Last result</Button>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
