export const isAmountWithinDeviation = (
  value: number,
  compare: number,
  deviation: number = 0.9
) => {
  return compare > value * deviation;
};
