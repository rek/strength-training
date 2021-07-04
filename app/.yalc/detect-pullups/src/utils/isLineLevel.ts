import mean from "lodash/mean";

import type { Line } from "../types";

// algo: is any number +- the average?
export const isLineLevel = (line: Line = [], allowedDeviation = 1) => {
  const lineMean = mean(line);

  const hasPointPastDeviation = line.some((point) => {
    // find distance from average
    const distanceFromMean = lineMean - point;

    // make sure we handle points below and above the average the same
    const isAbove = distanceFromMean >= 0;
    let correctedDistance = distanceFromMean;
    if (!isAbove) {
      correctedDistance = distanceFromMean * -1;
    }

    // check if any point is outside the allowed deviation
    const isTooFarAway = correctedDistance > allowedDeviation;

    // console.log('{isAbove', {isAbove, correctedDistance, point, isTooFarAway})

    return isTooFarAway;
  });

  // console.log('hasPointPastDeviation', {line, hasPointPastDeviation})

  // if we don't have any points past the deviation,
  // then this line is good.
  return !hasPointPastDeviation;
};
