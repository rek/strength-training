import one from "../__fixtures__/1";

import { generateScore } from "../score1";

test("generates score", () => {
  expect(
    generateScore({
      rawData: one,
      bodyWeight: 100,
      timestamp: 123,
      durationMillis: 1000,
    })
  ).toEqual({
    total: 100,
  });
});
