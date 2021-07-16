import * as React from "react";

import { ChartData, LineChart } from "../../../components";

interface Props {
  data: ChartData;
}
export const ActivityChart: React.FC<Props> = ({ data }) => {
  return (
    <LineChart
      simpleData={data}
      dotSize={1}
      disableXAxis={false}
      withInnerLines={false}
      bezier={false}
    />
  );
};
