import { atom, useRecoilState } from "recoil";

interface LocalData {
  data: number[];
}

const localData = atom({
  key: "localData", // unique ID (with respect to other atoms/selectors)
  default: [] as LocalData[],
});

export const useLocalData = () => useRecoilState(localData);
