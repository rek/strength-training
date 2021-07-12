import last from "lodash/last";

import { Activity, RawActivity } from "./types";

export const convertToRaw = (item: Activity): RawActivity => {
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

export const convertRawToNormal = (activities: RawActivity[]): Activity[] =>
  activities.map((item: RawActivity) => {
    const id = item.name ? last(item.name.split("/")) : "unknown";

    return {
      id,
      user: item.fields?.user?.stringValue || "",

      // all id strings:
      movement: item.fields?.movement?.stringValue || "",
      implement: item.fields?.implement?.stringValue || "",
      weight: item.fields?.weight?.stringValue || "",
    };
  });
