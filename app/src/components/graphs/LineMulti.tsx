import dayjs from "dayjs";
import React from "react";
import styled from "styled-components";
import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryTheme,
  VictoryAxis,
} from "victory";

import { Loading } from "../common";

const ChartContainer = styled.div`
  margin-bottom: 40px;
`;
export interface LineMultiDataItem {
  x: number | Date;
  y: number;
}
export interface LineOnGraph {
  data: LineMultiDataItem[];
  name: string;
  color?: string;
}
export interface LineMultiProps {
  config: LineOnGraph[];
  labelX?: string;
  labelY?: string;
}
export const LineMulti: React.FC<LineMultiProps> = ({
  config,
  labelX,
  labelY,
}) => {
  if (!config) {
    return <Loading />;
  }

  const theme = {
    ...VictoryTheme.grayscale,
  };

  return (
    <div style={{ padding: "20px", backgroundColor: "#777" }}>
      <ChartContainer>
        <VictoryChart
          theme={theme}
          height={200}
          width={1000}
          scale={{ x: "time" }}
          padding={{ top: 5, bottom: 24, left: 100, right: 40 }}
          containerComponent={<VictoryVoronoiContainer responsive={false} />}
        >
          {config.map(({ data, color }, index) => {
            return (
              <VictoryLine
                key={`line-${index}`}
                style={{ data: { stroke: color || "red" } }}
                data={data}
              />
            );
          })}

          <VictoryAxis
            tickCount={4}
            tickFormat={(date) => dayjs(date).format("D MMM YY")}
            style={{
              tickLabels: {
                fontSize: 13,
              },
            }}
          />
          <VictoryAxis
            dependentAxis
            label={labelY || ""}
            tickFormat={(count) => count.toFixed(2)}
            style={{
              tickLabels: {
                fontSize: 13,
              },
              axisLabel: {
                padding: 59,
                fontSize: 13,
                fontStyle: "italic",
              },
            }}
          />
        </VictoryChart>
      </ChartContainer>
    </div>
  );
};
