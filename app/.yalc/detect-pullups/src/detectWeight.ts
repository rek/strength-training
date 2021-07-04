import mean from "lodash/mean";
import sortBy from "lodash/sortBy";

import type { Line } from "./types";
import {
  detectFlatSections,
  // FlatSectionResult,
} from "./utils/detectFlatSections";

/*
 * Detect the weight of a person from a 'hanglog'
 */
export const detectWeight = (data: Line) => {
  // console.log("Sending data:", data);
  const flats = detectFlatSections([...data], 5);
  const totalLogAverage = mean(data);
  // console.log("[Detect weight]", { totalLogAverage, flats });

  if (flats.length > 0) {
    if (flats.length === 1) {
      const firstFlatSection = flats[0];

      const average = mean(firstFlatSection.data);

      return average;
    } else {
      let finalChosenWeight = 0;

      // sort by ones with the most points first:
      const sortArrayByLength = sortBy(flats, [(item) => -item.data.length]);
      // console.log("sortArrayByLength", sortArrayByLength);

      // 1. first test, take the highest ?
      // const averages = flats.map((item) => mean(item.data))

      // 2. start checking from the longest down
      // take the first that is close to the total average
      const detectedWeight2 = sortArrayByLength.find((item) => {
        if (mean(item.data) > totalLogAverage * 0.9) {
          // console.log("Choosing:", item);
          return true;
        }
        return false;
      });

      if (detectedWeight2) {
        finalChosenWeight = mean(detectedWeight2.data);
      }

      // 3. take the most common?
      // const averages = flats.map((item) => mean(item.data))

      return finalChosenWeight;
    }
  } else {
    return 0;
  }
};
