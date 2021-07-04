import { isLineInRange } from "./isLineInRange";
import { isLineLevel } from "./isLineLevel";

import type { Line } from "../types";

export type FlatSectionResult = {
  start: number;
  end: number;
  data: Line;
};
type FlatSectionResults = FlatSectionResult[];

export const detectFlatSections = (
  data: Line,
  windowSize = 3,
  allowedDeviation?: number
): FlatSectionResults => {
  const result: FlatSectionResults = [];
  let currentSection: Line = [];

  // const total = data.length;
  const slidingWindow: Line = [];

  let recordingRange = false;

  // console.log("[Detect flat] Working on data:", data);
  data.forEach((item, index) => {
    slidingWindow.push(item);

    // make sure window is full before starting
    if (slidingWindow.length < windowSize) {
      return;
    }

    // DEBUG:
    // console.log('Checking window:', slidingWindow, {level: isLineLevel(slidingWindow), range: isLineInRange(slidingWindow)})

    // check if window is level
    // and if all is still good,
    // do a check of the line range,
    // to make sure they are not drifting too far apart
    if (isLineLevel(slidingWindow, allowedDeviation) && isLineInRange(slidingWindow)) {
      // console.log('ok, adding item:', item)

      if (recordingRange) {
        // add last item in this window
        currentSection.push(slidingWindow[windowSize - 1]);
      } else {
        // add whole window when we first find one:
        currentSection = currentSection.concat(slidingWindow);

        recordingRange = true;
      }
    } else {
      // range has just finished
      if (recordingRange) {
        result.push({
          start: index - currentSection.length,
          end: index - 1,
          data: [...currentSection],
        });
        recordingRange = false;
      }

      currentSection = [];
    }

    // remove the first element in the window, to keep it sliding
    slidingWindow.shift();
  });

  return result;
};
