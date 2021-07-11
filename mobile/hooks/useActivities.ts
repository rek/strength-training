import last from "lodash/last";
import { useQuery, useQueryClient, useMutation } from "react-query";

import { FirebaseClient } from "../database/useFirebase";

export const QUERY_ACCTIVITY_KEY = "activity";

export interface Activity {
  id?: string; // no id before create
  user: string;
  weight: string;
  movement: string;
  implement: string;
}
interface RawActivity {
  name?: string;
  fields?: {
    user?: {
      stringValue: string;
    };
    movement?: {
      stringValue: string;
    };
    implement?: {
      stringValue: string;
    };
    weight?: {
      stringValue: string;
    };
  };
}

const convertToRaw = (item: Activity): RawActivity => {
  return {
    fields: {
      user: {
        stringValue: item.user,
      },
      movement: {
        stringValue: item.movement,
      },
      implement: {
        stringValue: item.implement,
      },
      weight: {
        stringValue: item.weight,
      },
    },
  };
};

export const useActivities = ({ idToken }: { idToken?: string }) => {
  return useQuery<Activity[]>(QUERY_ACCTIVITY_KEY, async () => {
    if (!idToken) {
      return [];
    }
    const activities = await FirebaseClient.getData({
      idToken,
      key: "activities",
    });

    const processed: Activity[] = activities.map((item: RawActivity) => {
      const id = item.name ? last(item.name.split("/")) : "unknown";

      return {
        id,
        user: item.fields?.user?.stringValue,

        // all id strings:
        movement: item.fields?.movement?.stringValue,
        implement: item.fields?.implement?.stringValue,
        weight: item.fields?.weight?.stringValue,
      };
    });

    return processed;
  });
};

export const createActivity = (idToken: string) => {
  const { mutate } = useMutation(async (value: Activity) => {
    const newActivity = await FirebaseClient.writeData({
      idToken,
      key: "activities",
      value: convertToRaw(value),
    });

    console.log("newActivity", newActivity);
  });

  return mutate;
};
