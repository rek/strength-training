import type { Line } from "./types";

import { detectWeight } from "./detectWeight";
import { flatThenSpike, peakDipGroups } from "./algorithms";
// import {logDebug} from "../utils";

/*
 * Algorithm
 *
 * - detect up after flat
 * - is it close to body weight (10%) <- this stops random fluctuations
 *
 */
export const detectPullup = async (line: Line, weight?: number) => {
  const bodyWeight = weight || detectWeight(line);
  console.log("Body weight found:", bodyWeight);

  const flatThenSpikeData = flatThenSpike(line, { bodyWeight, minLength: 4 });
  const algo1 = { count: flatThenSpikeData.length, data: flatThenSpikeData };
  // logDebug("algo1", algo1);

  const peakDipGroupsData = await peakDipGroups(line, { bodyWeight, devation: 0.8 });
  const algo2 = {
    count: peakDipGroupsData.dips.length,
    data: peakDipGroupsData,
  };
  // logDebug("algo2", algo2);

  return { algo1, algo2 };
};
