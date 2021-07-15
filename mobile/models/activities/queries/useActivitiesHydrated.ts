import { useImplements } from "../../../hooks/useImplements";
import { useWeights } from "../../../hooks/useWeight";
import { useMovements } from "../../../hooks/useMovement";

import { Activities } from "..";
import { useActivities, useActivity } from "./useActivities";
import { ActivityHydrayed } from "../types";

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
