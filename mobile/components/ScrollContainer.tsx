import React from "react";
import { StyleSheet, SafeAreaView, ScrollView } from "react-native";
import Constants from "expo-constants";

export const ScrollContainer: React.FC = ({ children }) => {
  return (
    <SafeAreaView style={styles.container}>
      <ScrollView style={styles.scrollView}>{children}</ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: Constants.statusBarHeight,
  },
  scrollView: {
    backgroundColor: "pink",
    marginHorizontal: 20,
  },
});
