import { detectDips, detectPeaks } from "../utils";

import type { Line, XY} from "../types";
import { isValidBodyWeight } from "../utils/isValidBodyWeight";
import { isAmountWithinDeviation } from "../utils/isAmountWithinDeviation";

export interface Result {
  dips: XY[];
  peaks: XY[];
}
interface Options {
  bodyWeight: number;
  devation?: number;
}
export const peakDipGroups = async (
  line: Line,
  { bodyWeight, devation }: Options
) => {
  const peaks = await detectPeaks(line);

  /*
   * need to remove the first and last in a clean graph
   * because those are the weight on and weight off the bar dips
   *
   * we are pretty safe to say that there will always be a weight off
   * (because that is also how we end the recording)
   * but not always to sure about a weight on
   * (perhaps it started recording late)
   */
  const dips = await detectDips(line);

  // console.log("Raw peaks", peaks);
  // console.log("Raw dips", dips);

  let cleanDips = [...dips];

  // do we need to handle this case:
  // assume late start timing,
  // eg: this starts with weight already on bar
  //     so no initial weight 'ramp up' (eg: from dip)

  // if the first item starts at 0
  // remove it, since it is the 'getting on the bar' entry
  if (cleanDips[0].x === 0) {
    // console.log("Removing first");
    cleanDips.shift();
  }

  // if the last item in the dips is also the last data point
  // remove it, since it is the 'letting go of the bar' entry
  if (cleanDips[cleanDips.length - 1].x === line.length - 1) {
    // console.log("Removing last");
    cleanDips.pop();
  }

  // remove any other dips that are within deviation of bodyweight
  // since we only really want the noticaable ones
  if (isValidBodyWeight(bodyWeight)) {
    cleanDips = cleanDips.filter((dip) => {
      const dipIsTooCloseToBodyWeight = isAmountWithinDeviation(
        bodyWeight,
        dip.y || 0,
        devation
      );

      if (dipIsTooCloseToBodyWeight) {
        return false;
        console.log("Removing bad dip:", dip);
      }

      return true;
    });
  }

  // console.log("Final peaks", peaks);
  // console.log("Final dips", cleanDips);

  return { dips: cleanDips, peaks } as Result;
};
