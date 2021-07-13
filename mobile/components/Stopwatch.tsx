import * as React from "react";
import { ViewStyle, StyleProp } from "react-native";

import { View, Text } from "./Themed";

interface Props {
  styles?: StyleProp<ViewStyle>;
}
export const Stopwatch: React.FC<Props> = ({ styles }) => {
  const [secondsPassed, setSecondsPassed] = React.useState(0);

  React.useEffect(() => {
    let count = secondsPassed;
    const timer = setInterval(() => {
      const newCount = (count += 1);
      setSecondsPassed(newCount);
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles}>
      <Text>{secondsPassed}</Text>
    </View>
  );
};

export const Countdown: React.FC<{ from: number }> = ({ from }) => {
  const [secondsLeft, setSecondsLeft] = React.useState(25);
  const [started, setStarted] = React.useState(false);

  React.useEffect(() => {
    const stopTime = Date.now() + from * 1000;
    setStarted(true);
    setSecondsLeft(from);
    const timer = setInterval(() => {
      const left = Math.round((stopTime - Date.now()) / 1000);
      if (left <= 0) {
        clearInterval(timer);
        setStarted(false);
      } else {
        setSecondsLeft(left);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View>
      <Text>{secondsLeft}</Text>
    </View>
  );
};
