import { useImplements } from "./useImplements";
import { useActivities, useActivity } from "./useActivities";
import { useWeights } from "./useWeight";
import { useMovements } from "./useMovement";
import { Activities, Activity } from "../models/activities";

export interface ActivityHydrayed extends Activity {
  implementName: string;
  weightName: string;
  movementName: string;
}

const getThingByName = (id: string, list: any[]) => {
  return list?.find((item) => item.id === id)?.name || "";
};

export const useActivitiesHydrated = (
  idToken: string = ""
): ActivityHydrayed[] => {
  const { data } = useActivities({ idToken });
  return useActivitiesHydratedRaw({ idToken, activities: data });
};

export const useActivityHydrated = ({
  id,
  idToken = "",
}: {
  id: string;
  idToken: string;
}): ActivityHydrayed[] => {
  const { data } = useActivity({ idToken, id });
  return useActivitiesHydratedRaw({ idToken, activities: data });
};

export const useActivitiesHydratedRaw = ({
  idToken = "",
  activities,
}: {
  idToken: string;
  activities?: Activities;
}): ActivityHydrayed[] => {
  const { data: implementNames } = useImplements({ idToken });
  const { data: weightNames } = useWeights({ idToken });
  const { data: movementNames } = useMovements({ idToken });

  if (!activities || !implementNames || !weightNames || !movementNames) {
    return [];
  }

  return activities.map((activity) => {
    return {
      ...activity,
      implementName: getThingByName(activity.implement, implementNames),
      weightName: getThingByName(activity.weight, weightNames),
      movementName: getThingByName(activity.movement, movementNames),
    };
  });
};
