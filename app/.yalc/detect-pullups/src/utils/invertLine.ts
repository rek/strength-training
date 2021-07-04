import max from "lodash/max";

import type { Line } from "../types";

export const invertLine = (line: Line): Line => {
  const lineMax = max(line) || 0;

  // invert the graph and then transpose it back upto positive values
  const invertedLine = line.map((point) => point * -1 + lineMax);

  return invertedLine;
};
