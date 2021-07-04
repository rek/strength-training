import one from "../__fixtures__/1";

import { getRepsFromLog } from "../getRepsFromLog";

test("generates score", async () => {
  // console.log("one", one);

  const result = await getRepsFromLog({
    rawData: one,
    bodyWeight: 5,
    timestamp: 0,
    durationMillis: 0,
  });

  expect(result).toEqual([
    { averageAccel: 6.26, peakAccel: 13.32, durationMillis: 10 },
    { averageAccel: 7.62, peakAccel: 21.06, durationMillis: 20 },
  ]);
});
