import { useQuery, useQueryClient } from "react-query";

import { FirebaseClient } from "../database/useFirebase";

export const QUERY_USERS_KEY = "users";

export interface User {
  active: boolean;
  id: number;
  weight: number;
  weightLastUpdated: number;
  name: string;
  displayName: string;
}

interface RawUser {
  name: string;
  fields?: {
    displayName?: {
      stringValue: string;
    };
    active?: {
      booleanValue: boolean;
    };
    weight?: {
      doubleValue: number;
    };
    weightLastUpdated?: {
      integerValue: number;
    };
  };
}
export const useUsers = ({ idToken }: { idToken?: string }) => {
  const { isLoading, error, data } = useQuery<User[]>(
    QUERY_USERS_KEY,
    async () => {
      if (!idToken) {
        return [];
      }
      const users = await FirebaseClient.getData({ idToken, key: "users" });

      const processedUsers: User[] = users.map((user: RawUser) => {
        // console.log("user", user);
        const userPath = user.name.split("/");

        return {
          name: userPath[userPath.length - 1],
          active: user.fields?.active?.booleanValue || false,
          displayName: user.fields?.displayName?.stringValue,
          weight: user.fields?.weight?.doubleValue.toFixed(2),
        };
      });

      return processedUsers.filter((user) => user.active);
    }
  );

  return { isLoading, error, data };
};

export const useResetUsers = (): (() => void) => {
  const queryClient = useQueryClient();

  return () => {
    queryClient.invalidateQueries(QUERY_USERS_KEY);
  };
};
