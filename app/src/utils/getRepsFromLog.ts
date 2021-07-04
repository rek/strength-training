import {
  // detectDescendingBeforePoint,
  detectPeaks,
} from "detect-pullups";
import { take, forEachRight, max, mean } from "lodash-es";

import { Log, Rep } from "../types/types";

export const getRepsFromLog = async (log: Log): Promise<Rep[]> => {
  // console.log("log.rawData", log.rawData);

  /*
   * Stage 1: detect peaks
   *
   */
  const peakList = await detectPeaks(log.rawData, { minPeakDistance: 100 });
  // flatThenSpike(log.rawData, { bodyWeight: 5, flatLineallowedDeviation: 2 })
  // console.log("Peaks found:", peakList.length);

  const results = peakList.map((result) => {
    // console.log("result", result);

    // const spike = detectDescendingBeforePoint(log.rawData, result.x, {
    //   deviation: 1,
    // });

    /*
     * Stage 2: find left half of peak area
     *
     */
    let spike = -1;
    const fromPoint = take(log.rawData, result.x);
    forEachRight(fromPoint, (point, index) => {
      if (spike !== -1) {
        return;
      }
      if (point < 1) {
        spike = index;
      }
    });
    // console.log("Spike position:", spike);

    const points = log.rawData.slice(spike, result.x);
    // console.log("Peaks points:", points);

    // trim any negatives from the start (since start of movement should always go up)
    // let foundStartOfAccel = false;
    // const ascendingPoints = points.filter((point) => {
    //   if (foundStartOfAccel) {
    //     return true;
    //   }

    //   if (point > 0) {
    //     foundStartOfAccel = true;
    //   }

    //   if (point < 0) {
    //     return false;
    //   }

    //   return true;
    // });
    // console.log("ascendingPoints", ascendingPoints);

    return {
      averageAccel: Number(mean(points).toFixed(2)),
      peakAccel: max(points) || 0,
      durationMillis: points.length,
    };
  });

  // console.log("results", results);
  return results;
};
