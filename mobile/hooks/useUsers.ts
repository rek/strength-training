import { atom, useRecoilState } from "recoil";

export interface User {
  id: string;
  display: string;
  weight: number;
}

// export const allUsers: User[] = [
//   { id: "adam", display: "adam", weight: 95 },
//   { id: "anette", display: "anette", weight: 67 },
//   { id: "crystal", display: "crystal", weight: 61 },
//   { id: "sam", display: "sam", weight: 80 },
// ];

const currentUserState = atom<User["id"] | undefined>({
  key: "currentUserState", // unique ID (with respect to other atoms/selectors)
  default: undefined,
  // get: ({ get }) => {
  //   return {
  //     getAll: allUsers,
  //     getCurrent: get(),
  //   };
  // },
});

export const useCurrentUserState = () => useRecoilState(currentUserState);

import lodash from "lodash";
import { useQuery } from "react-query";

import { FirebaseClient } from "../database/useFirebase";

const QUERY_KEY = "users";

export interface Users {
  id: string;
  name: string;
  weight: string;
}
interface RawUsers {
  name?: string;
  fields?: {
    name?: {
      stringValue: string;
    };
    weight?: {
      integerValue: string;
    };
  };
}

export const useUsers = ({ idToken }: { idToken?: string }) => {
  return useQuery<Users[]>(
    QUERY_KEY,
    async () => {
      if (!idToken) {
        return [];
      }
      const items = await FirebaseClient.getData({
        idToken,
        key: "users",
      });

      const processed: Users[] = items.map((item: RawUsers) => {
        // name is id
        const id = item.name ? lodash.last(item.name?.split("/")) : "unknown";

        return {
          id,
          name: item.fields?.name?.stringValue,
          weight: item.fields?.weight?.integerValue,
        };
      });

      return processed;
    },
    {
      staleTime: Infinity,
    }
  );
};
