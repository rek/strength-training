import * as React from "react";

import { useFirebase } from "./useFirebase";

export const AuthProvider: React.FC = ({ children }) => {
  const { isLoading } = useFirebase();

  if (isLoading) {
    return null;
  }

  return <>{children}</>;
};
