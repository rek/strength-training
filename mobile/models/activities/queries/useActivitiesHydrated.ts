import { useImplements } from "../../../hooks/useImplements";
import { useWeights } from "../../../hooks/useWeight";
import { useMovements } from "../../../hooks/useMovement";
import { useUsers } from "../../user/queries/useUsers";

import { Activities } from "..";
import { useActivities, useActivity } from "./useActivities";
import { ActivityHydrayed } from "../types";

const getThing = (id: string, list: any[]) => {
  return list?.find((item) => item.id === id);
};
const getThingByName = (id: string, list: any[]) => {
  return getThing(id, list)?.name || "";
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
}) => {
  const { data, ...rest } = useActivity({ idToken, id });
  return {
    ...rest,
    data: useActivitiesHydratedRaw({ idToken, activities: data }),
  };
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
  const { data: users } = useUsers({ idToken });

  if (
    !activities ||
    !implementNames ||
    !weightNames ||
    !movementNames ||
    !users
  ) {
    return [];
  }

  return activities.map((activity) => {
    const user = getThing(activity.user, users);

    return {
      ...activity,
      implementName: getThingByName(activity.implement, implementNames),
      weightName: getThingByName(activity.weight, weightNames),
      movementName: getThingByName(activity.movement, movementNames),
      userName: user.name,
      userWeight: user.weight,
    };
  });
};
