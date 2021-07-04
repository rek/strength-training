import takeRight from "lodash/takeRight";
import sum from "lodash/sum";

import type { Line } from "../types";

export const getAverageOfLast = (list: Line, windowSize = 3) => {
  const finalWindow = takeRight(list, windowSize);

  return sum(finalWindow) / windowSize;
};
