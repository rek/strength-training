import React from "react";

import { firebaseDoingAuth } from "./setup";

export const useFirebase = () => {
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    firebaseDoingAuth.then(() => {
      setLoading(false);
    });
  }, []);

  return [loading];
};
