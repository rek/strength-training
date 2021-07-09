import { LocalData } from "./useLocalData";

export const useSyncData = (data: LocalData[]) => {
  const notSyncedItems = data.filter((item) => item.is_synced === false);

  if (notSyncedItems.length > 0) {
    // send to firebase
  }
};
