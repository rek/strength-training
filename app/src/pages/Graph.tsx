import * as React from "react";

import { SimpleTimeSeries } from "../components";
import { displayDate } from "../utils/date";
import data from "../utils/__fixtures__/1";

export const Graph: React.FC = () => {
  let schema = [
    {
      name: "Date",
      type: "date",
      // format: "%Y/%m/%d %H:%M:%S:%L", // 2018/11/11 23:34:26:123
      // format: "%b %d, %Y %H:%M:%S:%L", // Jan 01, 2018 23:34:26:123
      // format: "%-d/%-m/%Y %H:%M:%S:%L",
    },
    {
      name: "Value",
      type: "number",
    },
  ];

  let initial = +new Date();
  let increment = 0;
  const processData = data.map((item) => {
    increment += 100000;
    const time = initial + increment;
    return [displayDate(time), item];
    // return [new Date(time), item];
  });
  // console.log("processData", processData[0], processData[1], processData[2]);

  return (
    <SimpleTimeSeries
      title="Strength Tracking"
      schema={schema}
      data={processData}
    />
  );
};
