import { useImplements } from "./useImplements";
import { Activity, useActivities } from "./useActivities";
import { useWeights } from "./useWeight";
import { useMovements } from "./useMovement";

export interface ActivityHydrayed extends Activity {
  implementName: string;
  weightName: string;
  movementName: string;
}

const getThingByName = (id: string, list: any[]) => {
  return list?.find((item) => item.id === id)?.name || "";
};

export const useActivitiesHydrated = (token: string): ActivityHydrayed[] => {
  const { data: implementNames } = useImplements({ idToken: token || "" });
  const { data: weightNames } = useWeights({ idToken: token || "" });
  const { data: movementNames } = useMovements({ idToken: token || "" });
  const { data: activities } = useActivities({ idToken: token || "" });

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
