import max from "lodash/max";
import min from "lodash/min";

import type { Line } from "../types";

export const isLineInRange = (line: Line = [], allowedDeviation = 1) => {
  if ((max(line) || 0) - (min(line) || 0) > allowedDeviation) {
    return false;
  }

  return true;
};
