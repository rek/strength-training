import slayer from "slayer";
import type { Line, XY } from "../types";

export const detectPeaks = async (line: Line, otherOptions = {}): Promise<XY[]> => {
  const peaks = await slayer({
    minPeakDistance: 10,
    ...otherOptions
  }).fromArray(line);

  // console.log("peaks", peaks);

  return peaks;
};
