import { useMutation, useQueryClient } from "react-query";

import { deleteActivity } from "../service";
import { activityKeys, invalidateActivities } from "./useActivities";

export const useDeleteActivity = () => {
  const queryClient = useQueryClient();

  const { mutate } = useMutation(deleteActivity, {
    onSuccess: (data, variables, context) => {
      console.log("onSuccess", data);
      queryClient.invalidateQueries(activityKeys.all);
      // invalidateActivities();
    },
    onError: (error, variables, context) => {
      console.log("onError", error);
    },
  });

  return mutate;
};
