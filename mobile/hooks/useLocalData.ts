import { atom, useRecoilState } from "recoil";

import { User } from "./useUsers";
export interface LocalData {
  user: User["id"];
  weight: number;
  movement: number;
  created_at: number;
  data: number[];
  is_synced?: boolean;
}

const localData = atom({
  key: "localData", // unique ID (with respect to other atoms/selectors)
  default: [] as LocalData[],
});

export const useLocalData = () => useRecoilState(localData);
