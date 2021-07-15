import { useQueryClient, useQuery, useMutation } from "react-query";

import { FirebaseClient } from "../../../database/useFirebase";
import { Activity, convertToRaw, fetchActivities } from "..";

export const activityKeys = {
  all: ["activity"] as const,
  lists: () => [...activityKeys.all, "list"] as const,
  list: (filters: string) => [...activityKeys.lists(), { filters }] as const,
  details: () => [...activityKeys.all, "detail"] as const,
  detail: (id: number) => [...activityKeys.details(), id] as const,
};

export const useActivity = ({
  id,
  idToken,
}: {
  id?: string;
  idToken?: string;
}) => {
  return useActivities({
    idToken,
    select: (data) => data.filter((item) => item.id === id),
  });
};

export const useActivities = ({
  idToken,
  select,
}: {
  idToken?: string;
  select?: (x: Activity[]) => Activity[];
}) => {
  const activityFetcher = () => fetchActivities({ idToken });

  return useQuery<Activity[]>(activityKeys.all, activityFetcher, {
    select,
  });
};

export const createActivity = (idToken: string) => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(
    async (value: Activity) => {
      const newActivity = await FirebaseClient.writeData({
        idToken,
        key: "activities",
        value: convertToRaw(value),
      });

      // console.log("newActivity", newActivity);
      return newActivity;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(activityKeys.all);
      },
    }
  );

  return mutate;
};

export const invalidateActivities = () => {
  const queryClient = useQueryClient();

  queryClient.invalidateQueries(activityKeys.all);
};
