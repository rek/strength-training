import { RawUser, User } from "./types";

export const convertToRaw = (item: User): RawUser => {
  return {
    fields: {
      name: {
        stringValue: item.name,
      },
      weight: {
        integerValue: item.weight,
      },
    },
  };
};
