import { StatusBar } from "expo-status-bar";
import React from "react";
import { RecoilRoot } from "recoil";
import { QueryClient, QueryClientProvider } from "react-query";
import { LogBox } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

import useCachedResources from "./hooks/useCachedResources";
import useColorScheme from "./hooks/useColorScheme";
import Navigation from "./navigation";

import { useFirebase } from "./hooks/useFirebase";

const queryClient = new QueryClient();

if (LogBox) {
  LogBox.ignoreLogs(["Setting a timer"]);
}

export default function App() {
  const isCacheLoaded = useCachedResources();
  const colorScheme = useColorScheme();

  if (!isCacheLoaded) {
    return null;
  }

  return (
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
  );
}

const AuthProvider: React.FC = ({ children }) => {
  const { isLoading } = useFirebase();

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};
