import React from "react";
import { StatusBar } from "expo-status-bar";
import { StyleSheet } from "react-native";
import { Text, View } from "./components/Themed";
import { Button } from "./components/Button";
import axios from "axios";
import Colors from "./constants/Colors";

export default function App() {
  const [data, setData] = React.useState<number[]>([]);

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
        try {
          // have some trouble making this nice in the hardware
          // so easier to fix the hack here:
          const cleanData = response.data.replace(",]}", "]}");
          const result = JSON.parse(cleanData);
          if (result) {
            setData(result.data);
          }
        } catch (e) {
          console.log("e", e);
        }
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

  console.log("data", data);

  return (
    <View style={styles.container}>
      <Button handleClick={handleClick}>Start</Button>
      <Button handleClick={handleClickStop}>Stop</Button>
      {/* <Button handleClick={handleClickResult}>Last result</Button> */}
      <View>
        {data.length > 0 && (
          <Text>
            {data.map((item, index) => {
              return <p key={`result-${index}`}>{item}</p>;
            })}
          </Text>
        )}
      </View>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
    alignItems: "center",
    justifyContent: "center",
  },
});
