import type { Line } from "../types";

export const detectFirstAscendingFromPoint = (
  data: Line,
  position: number,
  deviation = 0
) => {
  const ascendingSequence: number[] = [];

  data.slice(position).some((point, index) => {
    const upperBound = point + deviation > data[position + index - 1];
    if (upperBound) {
      ascendingSequence.push(point);
      return false;
    }
    return true;
  });

  return ascendingSequence;
};
