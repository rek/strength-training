import React from "react";

import {
  VictoryChart,
  VictoryVoronoiContainer,
  VictoryLine,
  VictoryTheme,
  VictoryTooltip,
} from "victory";
import { Loading } from "../common";
import { colours } from "../../styles/colours";

export type XY = {
  x: number;
  y?: number;
};
export interface Marker extends XY {
  stroke?: string;
}
export interface Props {
  data: XY[];
  markers?: Marker[];
  medianLine?: number;
  maxDomain?: number;
}
export const Line: React.FC<Props> = ({
  data,
  medianLine,
  maxDomain,
  markers,
}) => {
  if (!data) {
    return <Loading />;
  }

  // interpolation
  //  "basis", "bundle", "cardinal", "catmullRom", "linear", "monotoneX", "monotoneY", "natural", "step", "stepAfter", "stepBefore"

  // console.log('VictoryTheme.material.line', VictoryTheme.material)
  const theme = {
    ...VictoryTheme.grayscale,

    // line: {
    //   ...VictoryTheme.grayscale.line,
    //   style: {
    //     ...VictoryTheme.grayscale.line.style,
    //     data: {
    //       ...VictoryTheme.grayscale.line.style.data,
    //       // fill: "transparent",
    //       // stroke: charcoal,
    //       // strokeWidth: 2
    //     },
    //     labels: {
    //       ...VictoryTheme.grayscale.line.style.labels,
    //       // fill: '#f00'
    //     }
    //   }
    // }
  };

  // console.log("data", data);
  // console.log("markers", markers);

  const start = 1;
  const end = data.length;
  const showMedian = !!(medianLine && end > 0);
  // console.log("medianLine", medianLine, { showMedian, start, end });

  return (
    <div style={{ padding: "20px", backgroundColor: "#777" }}>
      <VictoryChart
        theme={theme}
        height={200}
        width={1000}
        padding={{ top: 5, bottom: 0, left: 100, right: 40 }}
        containerComponent={<VictoryVoronoiContainer responsive={false} />}
      >
        {markers &&
          markers.map((marker, index) => (
            <VictoryLine
              key={`group-line-${index}`}
              style={{
                data: { stroke: marker.stroke || colours.grey },
                parent: { border: "1px dotted #ccc" },
              }}
              data={[
                { x: marker.x, y: 0 },
                { x: marker.x, y: maxDomain },
              ]}
            />
          ))}
        <VictoryLine
          data={data}
          interpolation="natural"
          domain={{ y: [0, maxDomain || 1] }}
          labels={({ datum }) => `${datum.y} (${datum.x})`}
          labelComponent={<VictoryTooltip />}
        />
        {showMedian && (
          <VictoryLine
            style={{
              data: { stroke: "#c43a31" },
              parent: { border: "1px dotted #ccc" },
            }}
            data={[
              { x: start, y: medianLine },
              { x: end, y: medianLine },
            ]}
          />
        )}
      </VictoryChart>
    </div>
  );
};
