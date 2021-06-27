import { atom, useRecoilState } from "recoil";

export interface User {
  id: string;
  display: string;
  weight: number;
}

export const allUsers: User[] = [
  { id: "adam", display: "adam", weight: 0 },
  { id: "anette", display: "anette", weight: 0 },
  { id: "crystal", display: "crystal", weight: 0 },
  { id: "sam", display: "sam", weight: 0 },
];

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
