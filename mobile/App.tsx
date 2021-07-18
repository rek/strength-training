import { StatusBar } from "expo-status-bar";
import React from "react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import { CachedResources } from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { AuthProvider } from "./database/AuthProvider";

const queryClient = new QueryClient();

if (LogBox) {
  LogBox.ignoreLogs(["Setting a timer"]);
}

export default function App() {
  const colorScheme = useColorScheme();

  return (
    // <CachedResources>
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <SafeAreaProvider>
          <AuthProvider>
            <Navigation colorScheme={colorScheme} />
            <StatusBar />
          </AuthProvider>
        </SafeAreaProvider>
      </RecoilRoot>
    </QueryClientProvider>
    // </CachedResources>
  );
}
