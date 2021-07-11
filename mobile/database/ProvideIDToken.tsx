import * as React from "react";

import { useFirebase } from "./useFirebase";

import { Loading } from "../components/Loading";
import { View, Text } from "../components/Themed";

export const ProvideIDToken: React.FC = ({ children }) => {
  const { data } = useFirebase();

  if (!data) {
    return <Loading />;
  }

  if (!children) {
    return <Loading />;
  }

  if (React.isValidElement(children)) {
    return React.cloneElement(children, { token: data });
  }

  return (
    <View>
      <Text>Error, bad children!</Text>
    </View>
  );
};

export interface WithToken {
  token?: string;
}
