import { StatusBar } from "expo-status-bar";
import React from "react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { AppearanceProvider } from "react-native-appearance";

// import { CachedResources } from "./hooks/useCachedResources";
import Navigation from "./navigation";

import { AuthProvider } from "./database/AuthProvider";

const queryClient = new QueryClient();

if (LogBox) {
  LogBox.ignoreLogs(["Setting a timer"]);
}

export default function App() {
  return (
    // <CachedResources>
    <QueryClientProvider client={queryClient}>
      <AppearanceProvider>
        <RecoilRoot>
          <SafeAreaProvider>
            <AuthProvider>
              <Navigation />
              <StatusBar style="auto" />
            </AuthProvider>
          </SafeAreaProvider>
        </RecoilRoot>
      </AppearanceProvider>
    </QueryClientProvider>
    // </CachedResources>
  );
}
