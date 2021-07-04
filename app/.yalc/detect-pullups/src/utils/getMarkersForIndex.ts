import compact from "lodash/compact";
import type { Marker } from "../types";

// first round takes 3 points
// second and all next rounds use the previous peak marker as the first one
export const getMarkersForIndex = (
  peakMarkers: Marker[],
  dipMarkers: Marker[],
  index: number
): Marker[] => {
  const indexMarkers = [
    peakMarkers[index],
    dipMarkers[index],
    peakMarkers[index + 1],
  ];

  const checkForMissingEntries = compact(indexMarkers);
  if (checkForMissingEntries.length === 3) {
    return checkForMissingEntries;
  }

  return [];
};
