import { atom, useRecoilState } from "recoil";

import { Rep } from "../models/log/types";
import { User } from "../models/user";

export enum LocalDataStatus {
  "hasUnsaved" = "hasUnsaved",
  "hasNothing" = "hasNothing",
}
export interface LocalData {
  user: User["id"];
  weight: string;
  movement: string;
  created_at: number;
  data: number[];
  reps?: Rep[];
  is_synced?: boolean;
}

const localData = atom({
  key: "localData", // unique ID (with respect to other atoms/selectors)
  default: [] as LocalData[],
});

export const useLocalData = () => useRecoilState(localData);
