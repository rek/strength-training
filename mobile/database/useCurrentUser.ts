import { useQuery } from "react-query";

import { FirebaseClient } from "./useFirebase";

export const useCurrentUser = () => {
  return useQuery<{ email: string; displayName?: string }>(
    "current-user",
    async () => {
      const result = await FirebaseClient.getCurrentUser();

      return result;
    }
  );
};
