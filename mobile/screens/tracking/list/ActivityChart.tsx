import * as React from "react";

import { ChartData, LineChart } from "../../../components";

interface Props {
  data: ChartData;
}
export const ActivityChart: React.FC<Props> = ({ data }) => {
  return <LineChart data={data} dotSize={2} disableXAxis />;
};
