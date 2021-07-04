import slayer from "slayer";

import type { Line, XY } from "../types";
import { invertLine } from "./invertLine";

export const detectDips = async (line: Line): Promise<XY[]> => {
  const invertedLine = invertLine(line);
  // console.log("invertedLine", invertedLine);

  const invertedPeaks: XY[] = await slayer({
    minPeakDistance: 10,
  }).fromArray(invertedLine);
  // console.log("inverted peaks", invertedPeaks);

  // convert the dip back to the real number
  const dipsOnLine = invertedPeaks.map((dip) => ({ x: dip.x, y: line[dip.x] }));
  // console.log("dipsOnLine", dipsOnLine);

  return dipsOnLine;
};
