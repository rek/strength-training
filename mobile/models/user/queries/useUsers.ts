import lodash from "lodash";
import { useMutation, useQuery, useQueryClient } from "react-query";
import { atom, useRecoilState } from "recoil";

import { FirebaseClient } from "../../../database/useFirebase";
import { convertToRaw } from "../normalize";
import { RawUser, User } from "../types";

const key = "users";

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

export const userKeys = {
  all: ["user"] as const,
};

export const useUsers = ({ idToken }: { idToken?: string }) => {
  return useQuery<User[]>(
    userKeys.all,
    async () => {
      if (!idToken) {
        return [];
      }
      const items = await FirebaseClient.getData({
        idToken,
        key,
      });

      const processed: User[] = items.map((item: RawUser) => {
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

export const createUser = (idToken: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (value: User) => {
      const newUser = await FirebaseClient.writeData({
        idToken,
        key,
        value: convertToRaw(value),
      });

      // console.log("newUser", newUser);
      return newUser;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(userKeys.all);
      },
    }
  );

  return mutate;
};
