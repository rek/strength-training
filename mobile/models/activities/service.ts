import { FirebaseClient } from "../../database/useFirebase";

import { convertRawToNormal } from "./normalize";
import { Activity, RawActivity } from "./types";

export const fetchActivities = async ({
  idToken,
}: {
  idToken?: string;
}): Promise<Activity[]> => {
  if (!idToken) {
    return [];
  }

  const activities = await FirebaseClient.getData<RawActivity[]>({
    idToken,
    key: "activities",
  });

  return convertRawToNormal(activities);
};

export const deleteActivity = async ({
  id,
  idToken,
}: {
  id: string;
  idToken?: string;
}): Promise<boolean | Error> => {
  if (!idToken) {
    return false;
  }

  const result = await FirebaseClient.deleteData({
    idToken,
    key: `activities/${id}`,
  });

  return result;
};
