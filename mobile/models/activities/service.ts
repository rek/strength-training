import { FirebaseClient } from "../../database/useFirebase";

import { convertRawToNormal } from "./normalize";
import { Activity } from "./types";

export const fetchActivities = async ({
  idToken,
}: {
  idToken?: string;
}): Promise<Activity[]> => {
  if (!idToken) {
    return [];
  }

  const activities = await FirebaseClient.getData({
    idToken,
    key: "activities",
  });

  return convertRawToNormal(activities);
};
